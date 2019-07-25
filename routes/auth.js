const passport = require('passport');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const requireLogin = require('../middleware/requireLogin');

const User = mongoose.model('users');
const Survey = mongoose.model('surveys');


module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.delete('/api/current_user', requireLogin, async (req, res) => {
    if (!req.user) return;

    const userID = new ObjectId(req.user.id);

    const { deletedCount: deletedSurveys } = await Survey.deleteMany({ _belongs_to: userID }).exec();
    if (!!deletedSurveys) console.log(`Deleted surveys number: ${deletedSurveys}`);

    const { deletedCount: deletedUser } = await User.deleteOne({ _id: userID }).exec();
    if (!!deletedUser) console.log(`Deleted user: ${userID}`);

    res.status(!!deletedUser ? 200 : 404).send();
  });
};
