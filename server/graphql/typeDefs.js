const { gql } = require('apollo-server');

module.exports = gql`
  type Quiz {
    id: ID!
    title: String!
    questions: [Question]!
  }
  type Question {
    id: ID!
    question: String!
    answerChoices: [String!]!
    answer: String!
  }
  type Query {
    getQuizzes: [Quiz]
    getQuiz(quizId: ID!): Quiz
  }
`;
