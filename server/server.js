const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();

app.use(bodyParser.json());

//POST /todos
app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

//GET /todos
app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(e);
    }
  );
});

//GET /todos/:id
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };

// const newTodo = new Todo({ text: "Cook dinner" });

// newTodo.save().then(
//   doc => {
//     console.log("Saved todo: ", doc);
//   },
//   e => {
//     console.log("Unable to save todo");
//   }
// );

// const newTodo = new Todo({
//   text: "Watch porn"
// });

// newTodo.save().then(
//   doc => {
//     console.log("Saved todo: ", doc);
//   },
//   e => {
//     console.log("Unable to save todo", e);
//   }
// );

// const newUser = new User({ email: "test@abc.com" });

// newUser.save().then(
//   doc => {
//     console.log("User saved succesfully: ", doc);
//   },
//   e => {
//     console.log("Unable to save user.", e);
//   }
// );
