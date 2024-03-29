var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(app.get('env'));

if (app.get('env') === 'development') {
  // This will change in production since we'll be using the dist folder
  app.use(express.static(path.join(__dirname, '../client')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));
  // Error Handling
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


//(app.get('env') === 'production' ||  app.get('env') === 'development')

if (app.get('env') === 'production') {
  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '/dist')));
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

/**
* Routes
*/
var router = require('./router')(app);
// Error Handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});


module.exports = app;

app.listen(process.env.PORT || 5000, function(){
  console.log("");
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
