const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.MONGO_URI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));

  const root = require('path').join(__dirname, 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
  });
}

const port = process.env.PORT || 5000;

const server = app.listen(port);

if (process.env.NODE_ENV !== 'production') {
  let io = require('socket.io')(server);

  app.io = io;

  io.sockets.on('connection', function(socket) {
    console.log('socket connecting');

    socket.on('disconnect', function() {
      console.log('...socket disconnected');
    });
  });
}

// ------- ROUTES -------
require('./routes/auth')(app);
require('./routes/billing')(app);
require('./routes/survey')(app);
