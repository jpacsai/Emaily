const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { ObjectId } = require('mongodb');

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

  app.delete('/api/current_user', async (req, res) => {
    if (!req.user) return;

    const id = new ObjectId(req.user.id);

    const { deletedCount } = await User.deleteOne({ _id: id }).exec();
    if (!!deletedCount) console.log(`Deleted user: ${id}`);

    res.status(!!deletedCount ? 200 : 404).send();
  });
};
