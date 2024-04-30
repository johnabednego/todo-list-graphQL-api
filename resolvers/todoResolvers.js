const Todo = require('../models/todo');

const todoResolvers = {
  Query: {
    getTodos: async () => {
      return await Todo.find();
    },
    getTodo: async (_, { id }) => {
      return await Todo.findById(id);
    },
  },
  Mutation: {
    createTodo: async (_, { title, description, completed }) => {
      const newTodo = new Todo({
        title,
        description,
        completed,
      });
      return await newTodo.save();
    },
    updateTodo: async (_, { id, title, description, completed }) => {
      return await Todo.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
      );
    },
    deleteTodo: async (_, { id }) => {
      return await Todo.findByIdAndRemove(id);
    },
  },
};

module.exports = todoResolvers;
