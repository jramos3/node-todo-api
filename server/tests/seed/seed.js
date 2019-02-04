const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { Todo } = require("../../models/todo");
const { User } = require("../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: "jeff@test.com",
    password: "userOnePass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign(
          { _id: userOneId.toHexString(), access: "auth" },
          process.env.JWT_SECRET
        )
      }
    ]
  },
  {
    _id: userTwoId,
    email: "kina@test.com",
    password: "userTwoPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign(
          { _id: userTwoId.toHexString(), access: "auth" },
          process.env.JWT_SECRET
        )
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo",
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 69,
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
