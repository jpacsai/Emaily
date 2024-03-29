const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const surveyTemplate = require('../services/email/surveyTemplates');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/email/mailer');

const parseSurvey = require('../utils/models');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _belongs_to: req.user.id })
    const parsed = surveys.map(survey => parseSurvey(survey));
    res.send(parsed);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.delete('/api/surveys/:surveyId', requireLogin, async (req, res) => {
    try {
      const p = new Path('/api/surveys/:surveyId');
      const { surveyId } = p.test(req.url);
      const id = new ObjectId(surveyId);

      const { deletedCount } = await Survey.deleteOne({ _id: id }).exec();

      if (!!deletedCount) console.log(`Deleted survey: ${surveyId}`);

      res.status(!!deletedCount ? 200 : 404).send();
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const parsedRecipients = recipients.split(',').map(email => ({ email: email.trim() }));

    const newSurvey = new Survey({
      title,
      subject,
      body,
      recipients: parsedRecipients,
      _belongs_to: req.user.id,
      date_sent: Date.now()
    });

    const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

    try {
      await mailer.send();
      await newSurvey.save();

      req.user.credits -= 1;
      const updatedUser = await req.user.save();

      res.send(updatedUser);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = req.body.reduce((total, { url, email }) => {
      if (!url) return;
      const { pathname } = new URL(url);
      const match = p.test(pathname);
      return match ? [...total, { email, surveyId: match.surveyId, choice: match.choice }] : total;
    }, []);

    if (!events) return;

    const uniqueEvents = _.uniqBy(events, 'email', 'surveyId');

    if (!uniqueEvents) return;

    uniqueEvents.forEach(async ({ surveyId, email, choice }) => {
      const id = new ObjectId(surveyId);

      const { nModified: updated } = await Survey.updateOne(
        {
          _id: id,
          recipients: {
            $elemMatch: { email: email, responded: { $ne: true } }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          last_responded: new Date()
        }
      ).exec();

      if (!!updated && process.env.NODE_ENV !== 'production') {
        console.log({ surveyId, email, choice });
        const updatedSurvey = await Survey.findOne({ _id: id });
        const parsed = parseSurvey(updatedSurvey);
        req.app.io.emit('update-survey', parsed);
      }
    });
  });
};
