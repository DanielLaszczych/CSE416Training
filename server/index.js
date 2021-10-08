require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;
startApolloServer();

async function startApolloServer() {
  const app = express();
  app.use(express.static('public'));
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => {
      console.log('MongoDB Connected');
      return app.listen({ port: PORT });
    })
    .then((res) => {
      console.log(`Server running at ${res.port}`);
    })
    .catch((err) => {
      console.error(err);
    });
}
