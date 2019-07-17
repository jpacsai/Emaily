const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const surveyTemplate = require('../services/email/surveyTemplates');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/email/mailer');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
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
      const { pathname } = new URL(url);
      const match = p.test(pathname);
      return match ? [...total, { email, surveyId: match.surveyId, choice: match.choice }] : total;
    }, []);
    
    const uniqeEvents = _.uniqBy(events, 'email', 'surveyId');
    console.log(uniqeEvents);
  });
}