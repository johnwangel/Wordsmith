/*jshint esversion: 6*/
require('./passport')();

const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

let app = express();

const db = require('./models');
const Users = db.users;

require('./passport')(); // passport strategy and serialization;

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(
  session({
    store: new RedisStore(),
    secret: 'run with the devil',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

const api = require('./api');
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

module.exports = app;
