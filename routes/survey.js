const surveyTemplate = require('../services/email/surveyTemplates');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/email/mailer');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
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
}