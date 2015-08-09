// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var db = require('../../database');
var Threads = db.threads;
var Posts = db.posts;
var Sentences = db.sentences;
var Stats = db.stats;

// Setup the Route
router.get('/', function (req, res) {

  Threads.find({}).
    limit(7).
    sort({'numberOfPosts':-1}).
    exec( function (err, threads) {
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


router.get('/posts', function (req, res) {
  var regex = req.param('threadID');
  var query = { threadID: regex };
  Posts.find(query)
    .limit(5)
    .exec(function (err, posts) {
    // If there's an error, log it and return to user
    console.log("find posts");
    if (err) {
      console.log(err);
      // send the error
      res.status(500).json({
        'message': 'Internal server error from getting thread. Please contact support@yourproject.com.'
      });
    } else {
      res.json(posts);
    }
  });
});

router.get('/sentences', function (req, res) {
  var regex = req.param('threadID');
  var query = { threadID: regex };

  Sentences.find(query, function (err,sentences) {
    // If there's an error, log it and return to user
    console.log("find sentence");
    if (err) {
      console.log(err);
      // send the error
      res.status(500).json({
        'message': 'Internal server error from getting thread. Please contact support@yourproject.com.'
      });
    } else {
      res.json(sentences);
    }
  });
});

router.get('/stats', function (req, res) {
  var regex = req.param('threadID');
  var query = { threadID: regex };

  Stats.find(query, function (err,Stats) {
    // If there's an error, log it and return to user
    console.log("find sentence");
    if (err) {
      console.log(err);
      // send the error
      res.status(500).json({
        'message': 'Internal server error from getting thread. Please contact support@yourproject.com.'
      });
    } else {
      res.json(Stats);
    }
  });
});


router.get('/threadName', function (req, res) {
  var regex = req.param('threadID');
  var query = { threadID: regex };
  Threads.findOne(query)
    .exec( function (err, thread) {
      // If there's an error, log it and return to user
      if (err) {
        console.log(err);
        // send the error
        res.status(500).json({
          'message': 'Internal server error from getting thread. Please contact support@yourproject.com.'
        });
      } else {
        res.send(thread);
      }
    });
});



// Expose the module
module.exports = router;
