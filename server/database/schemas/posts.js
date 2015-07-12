/**
 * Created by simonjare on 01/07/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the User Schema
var postsSchema = new Schema({

  threadID: { type: String, required: true },
  postIndex:  { type: Number, required: false },
  postNumber:  { type: Number, required: false },
  rankGlobal: { type: Number, required: false },
  scoreGlobal:  { type: Number, required: false },
  userRank: { type: Number, required: false },
  userScore:  { type: Number, required: false },
  postUserName: { type: String, required: false },
  postUserID: { type: String, required: false },
  postUserUrl: { type: String, required: false },
  postDateTime: { type: String, required: false },
  postUrlInThread: { type: String, required: false },
  postUrlUniq: { type: String, required: false },
  sentence: { type: String, required: false }

});

// The primary Threads model
var Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
