require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// GET /
app.get("/", (req, res) => {
  res.send("<h1>Todo App API</h1>");
});

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

//DELETE /todos/:id
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
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

//PATCH /todos/:id
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
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

//POST /users
app.post("/users", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  const user = new User(body);

  user
    .save()
    .then(user => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(err => res.status(400).send(err));
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
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
