var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cassandra = require('cassandra-driver');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var displayUser = require('./routes/displayUser');
var addUser = require('./routes/addUser');
var editUser = require('./routes/editUser');
var shouts = require('./routes/shouts');

var app = express();

// Cassandra objects
var client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1'
});

// Connecting Cassandra
client.connect(
  function (err, result) {
    console.log('Cassandra is connected');
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/displayUser', displayUser);
app.use('/addUser', addUser);
app.use('/editUser', editUser);
app.use('/shouts', shouts);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
