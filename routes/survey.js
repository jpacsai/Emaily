const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const surveyTemplate = require('../services/email/surveyTemplates');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/email/mailer');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _belongs_to: req.user.id }).select({ recipients: false });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
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

    uniqueEvents.forEach(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: new ObjectId(surveyId),
          recipients: {
            $elemMatch: { email: email, responded: { $ne: true } }
          }
        }, 
        {
          $inc: { [choice]: 1},
          $set: { 'recipients.$.responded': true },
          last_responded: new Date()
        }
      ).exec();
    });

    console.log(uniqueEvents);
  });
}