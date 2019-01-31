const mongoose = require("mongoose");

// const url = process.env.PORT ? "mongodb://jeff:test123@ds139534.mlab.com:39534/todoapp" : "mongodb://localhost:27017/TodoApp";

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

module.exports = { mongoose };
