const mongoose = require("mongoose");

const url = "mongodb://jeff:test123@ds139534.mlab.com:39534/todoapp";

mongoose.Promise = global.Promise;
mongoose.connect(
  url || "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true }
);

module.exports = { mongoose };
