/**
 * Created by simonjare on 16/06/15.
 */

/**
 * Our Schema for how the stats object
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the User Schema
var statsSchema = new Schema({
  threadTitle: { type: String, required: false },
  threadID:  { type: String, required: false },
  url: { type: String, required: false },
  numberOfUsers: { type: Number, required: false },
  numberOfPosts: { type: Number, required: false },
  totalWordCount: { type: Number, required: false },
  totalSentenceCount: { type: Number, required: false },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false },
  duration: { type: Number, required: false },
  minPostsPerDay: { type: Number, required: false },
  maxPostsPerDay: { type: Number, required: false },
  avgPostsPerDay: { type: Number, required: false },
  avgPostsPerDay2: { type: Number, required: false },
  medPostsPerDay: { type: Number, required: false },
  medPostsPerDay2: { type: Number, required: false },
  minPostsPerWeek: { type: Number, required: false },
  maxPostsPerWeek: { type: Number, required: false },
  avgPostsPerWeek: { type: Number, required: false },
  medPostsPerWeek: { type: Number, required: false },
  postsPerWeek: [],
  postsPerWeekDates: [String],
  minPostsPerUser: { type: Number, required: false },
  maxPostsPerUser: { type: Number, required: false },
  avgPostsPerUser: { type: Number, required: false },
  medPostsPerUser: { type: Number, required: false },
  topTenActiveUserIDs: [Number],
  topTenActiveUserPostCount: [],
  topTenActiveUserSentRank: [],
  topTenActiveUserSentScore: [],
  topTenActiveUserPostRank: [],
  topTenActiveUserPostScore: [],
  topTenImportantSentUserNames: [],
  topTenImportantSentUserIDs: [],
  topTenImportantSentUserPostCount: [],
  topTenImportantSentUserRank: [],
  topTenImportantSentUserScore: [],
  topTenImportantPostUserNames: [],
  topTenImportantPostUserIDs: [],
  topTenImportantPostUserPostCount: [],
  topTenImportantPostUserRank: [],
  topTenImportantPostUserScore: [],
  keyTerms:[]


});

// The primary Threads model
var Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;

