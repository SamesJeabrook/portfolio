require('dotenv').config({path: __dirname+'/.env'});
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userModel = require('./models/user');
require('./api/passport');

const index = require('./routes/index');
const users = require('./routes/users');
const skills = require('./routes/skills');
const projects = require('./routes/projects');
const mail = require('./routes/mail');
// const cv = require('./routes/cv');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
mongoose.connect(process.env.MONGOURI);
app.set('superSecret', process.env.JWT_SECRET);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(morgan('dev'));

// define API url prefixes
app.use('/api/', index);
app.use('/api/user/', users);
app.use('/api/skills/', skills);
app.use('/api/projects/', projects);
app.use('/api/mail', mail);
// app.use('/api/cv', cv);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
