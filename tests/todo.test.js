require('dotenv').config();
const { gql } = require('apollo-server-lambda');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('../src/schemas/typeDefs');
const resolvers = require('../src/resolvers/todoResolvers');
const connectDB = require('../src/utils/db');
const mongoose = require('mongoose');

jest.mock('../src/models/todo', () => ({
  find: jest.fn().mockResolvedValue([
    {
      id: '1',
      title: 'Test Todo 1',
      description: 'Description 1',
      completed: false,
    },
    {
      id: '2',
      title: 'Test Todo 2',
      description: 'Description 2',
      completed: false,
    },
  ]),
}));

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Queries', () => {
  it('fetches list of todos', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { query } = createTestClient(server);
    const GET_TODOS = gql`
      query GetTodos {
        getTodos {
          id
          title
          description
          completed
        }
      }
    `;

    const response = await query({ query: GET_TODOS });
    expect(response).toMatchSnapshot();
    expect(response.data.getTodos).toHaveLength(2);
  });
});
