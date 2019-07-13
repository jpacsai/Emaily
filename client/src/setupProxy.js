const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
    '/auth/google',
    '/api',
    '/api/current_user',
    '/api/stripe'
  ], { target: 'http://localhost:5000' }));
};
