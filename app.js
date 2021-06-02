var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser")
//const https = require('https')
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var homeRouter        = require('./routes/home');
var getRouter         = require('./routes/get');
var getvaccRouter     = require('./routes/getvacc');
var postRouter        = require('./routes/post');
var postvaccRouter    = require('./routes/postvacc');
var deleteRouter      = require('./routes/delete');
var deletevaccRouter  = require('./routes/deletevacc');

require('dotenv').config()

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// view engine setup
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use('/', homeRouter);
app.use('/get', getRouter);
app.use('/getvacc', getvaccRouter);
app.use('/post', postRouter);
app.use('/postvacc', postvaccRouter);
app.use('/delete', deleteRouter);
app.use('/deletevacc', deletevaccRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(port, () => console.log("Server listening on port " + port ));