require('dotenv').config();
const connectDB = require('./utils/db');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/todoResolvers');

// Connect to the database
connectDB();

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

const server = new ApolloServer({
    typeDefs,
    resolvers
});

exports.handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});
