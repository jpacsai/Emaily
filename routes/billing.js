const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 servey credit',
      source: req.body.id
    });

    req.user.credits += 5;
    const updatedUser = await req.user.save();
    console.log(updatedUser);
    res.send(updatedUser);
  });
};
