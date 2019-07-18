const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./passport')();
const routes = require('../app/routes/index');
const config = require('./config');
const AppError = require('../app/helpers/AppError');

const app = express();

// authentication middleware
app.use(auth.initialize());

// attach routes
app.use('/', routes);

// handle ValidationError
app.use(((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const msg = Object.keys(err.errors).map(field => err.errors[field].message);
    return next(new AppError(msg[0], 400));
  }
  return next(err);
}));

// catch 404 and forward
app.use((req, res, next) => {
  // TODO
});

// error handler
app.use((err, req, res, next) => {
  // TODO
});

module.exports = app;
