/**
 * Created by simonjare on 16/06/15.
 */

/**
 * Our Schema for List
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the User Schema
var threadsSchema = new Schema({
  threadID: { type: String, required: false },
  threadTitle: { type: String, required: false },
  numberOfUsers: { type: Number, required: false },
  numberOfPosts: { type: Number, required: false },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false },
  duration: { type: Number, required: false },
  totalWordCount: { type: Number, required: false },
  totalSentenceCount: { type: Number, required: false }
});

// The primary Threads model
var Threads = mongoose.model('Threads', threadsSchema);

module.exports = Threads;
