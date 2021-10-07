const quizzesResolvers = require('./quizzes');

module.exports = {
  Query: {
    ...quizzesResolvers.Query,
  },
};
