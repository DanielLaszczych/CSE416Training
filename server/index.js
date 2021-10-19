require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;
startApolloServer();

async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('../client/build'));
        app.get('*', (request, response) => {
            response.sendFile(
                path.join(__dirname, '../client/build', 'index.html')
            );
        });
    } else {
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
    }

    mongoose
        .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        .then(() => {
            console.log('MongoDB Connected');
            return app.listen({ port: PORT });
        })
        .then((res) => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
        .catch((err) => {
            console.error(err);
        });
}
