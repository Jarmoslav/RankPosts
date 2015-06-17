/**
 * The Index of Routes
 */

module.exports = function (app) {
  // The threads route
  app.use('/threads', require('./routes/threads'));
}
