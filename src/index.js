require('dotenv').config();
const connectDB = require('./utils/db');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/todoResolvers');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Connect to the database
connectDB();


const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start server and apply middleware
async function startServer() {
  await server.start();  // Start the Apollo server
  server.applyMiddleware({ app }); // Apply the Apollo GraphQL middleware and set the path to /graphql

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();


// // Conditional loading based on environment
// const isOffline = process.env.IS_OFFLINE;  // You set this in your .env file for local development

// let server;
// if (isOffline) {
//     const { ApolloServer } = require('apollo-server');
//     server = new ApolloServer({
//         typeDefs,
//         resolvers,
//     });

//     server.listen({ port: 4000 }).then(({ url }) => {
//         console.log(`🚀 Server ready at ${url}`);
//     });

// } else {
//     const { ApolloServer } = require('apollo-server-lambda');
//     server = new ApolloServer({
//         typeDefs,
//         resolvers,
//         context: ({ event, context }) => {
//             context.callbackWaitsForEmptyEventLoop = false;
//             return { event, context };
//         },
//     });

//     exports.handler = server.createHandler({
//         cors: {
//             origin: '*',
//             credentials: true,
//         },
//     });
// }
