const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

// Todo.remove()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//findByIdAndRemove
//findOneAndRemove
Todo.findByIdAndRemove("5c51bb3ac9ca4a28abb6e8ce")
  .then(todo => {
    console.log("Deleted todo", todo);
  })
  .catch(err => {
    console.log("Unable to delete todo", err);
  });
