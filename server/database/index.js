/**
 * Our Database Interface
 */
var mongoose = require('mongoose');
var ThreadModel = require('./schemas/threads');
var PostModel = require('./schemas/posts');
var SentenceModel = require('./schemas/sentences');
var StatsModel = require('./schemas/stats');

// Connections
var developmentDb = 'mongodb://localhost/test';
var productionDb = 'mongodb://admin:mlomlomlo123@ds045252.mongolab.com:45252/rankposts';
var usedDb;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
  // set our database to the development one
  usedDb = developmentDb;
  // connect to it via mongoose
  mongoose.connect(usedDb);
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
  // set our database to the development one
  usedDb = productionDb;
  // connect to it via mongoose
  mongoose.connect(usedDb);
}

// get an instance of our connection to our database
var db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));
// Open the connection
db.once('open', function callback () {
  console.log('Database Connection Successfully Opened at ' + usedDb);
});

exports.threads = ThreadModel;
exports.posts= PostModel;
exports.sentences= SentenceModel;
exports.stats= StatsModel;
