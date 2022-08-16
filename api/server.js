// imports
const express = require("express");
const cors = require("cors");

const userRouter = require('./routes/user')

const server = express();

// middleware
server.use(cors());
server.use(express.json());

// routes
server.get("/", (req, res) =>
  res.send("Welcome to the Hacker Health Tracker API!")
);

server.use('/users', userRouter);

module.exports = server;
