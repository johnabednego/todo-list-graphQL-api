const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getTodos: [Todo]
    getTodo(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!, description: String, completed: Boolean): Todo
    updateTodo(id: ID!, title: String, description: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Todo
  }
`;

module.exports = typeDefs;
