const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

// const id = "5c4c59b46740cc07105c8a54";

// if (!ObjectID.isValid(id)) {
//   console.log("Invalid Object ID");
// }

// Todo.find({ _id: id }).then(todos => {
//   console.log("Todos", todos);
// });

// Todo.findOne({ _id: id }).then(todo => {
//   console.log("Todo", todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("ID not found");
//     }
//     console.log("Todo By ID", todo);
//   })
//   .catch(e => console.log(e));

const id = "5c4c5fefc9ca4a28abb6d67c";

User.findById(id)
  .then(user => {
    if (!user) {
      return console.log("User not found");
    }

    console.log("User by ID", user);
  })
  .catch(err => console.log(err));
