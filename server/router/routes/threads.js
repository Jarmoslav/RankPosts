// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var db = require('../../database');
var Threads = db.threads;

// Setup the Route
router.get('/', function (req, res) {

  console.log('/threads');
  Threads.find({}, function (err, threads) {
    // If there's an error, log it and return to user
    if (err) {

      console.log(err);
      // send the error
      res.status(500).json({
        'message': 'Internal server error from getting thread. Please contact support@yourproject.com.'
      });
    } else {
      res.send(threads);
    }
  });
});

router.get('/search', function (req, res) {

  var regex = new RegExp(req.param('searchQuery'), 'i');
  var query = { threadTitle: regex };

  Threads.find(query, function (err, threads) {
    // If there's an error, log it and return to user
    if (err) {
      console.log(err);
      // send the error
      res.status(500).json({
        'message': 'Internal server error from getting thread. Please contact support@yourproject.com.'
      });
    } else {
      console.log(threads);
      res.json(threads);
    }
  });
});



// Expose the module
module.exports = router;
