const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function createToken(userData) {
  const token = await jwt.sign({
    username: userData["username"],
    password: userData["password"],
  });
  //{ expiresIn: 60 * 60 }

  return token;
}

async function index(req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function login(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.getOneByUsername(username);

    // Check here if the password matches the hash
    const authenticated = await bcrypt.compare(password, user.password);

    if (authenticated) {
      res.json({
        success: true,
        token: "Bearer " + (await createToken(user)),
      });
    } else {
      throw "Credentials didn't match.";
    }
  } catch (err) {
    console.log(err);

    res.status(401).json({
      success: false,
      error: "Unable to authenticate user.",
    });
  }
}

async function register(req, res) {
  try {
    const username = await req.body.username;
    const password = await req.body.password;

    res.status(201).json({
      username,
      password,
    });
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function showOne(req, res) {
  try {
    const user = await User.getOneByUsername(req.params.username);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.delete(req.body.username);
    res.status(204).json({ message: "Success! User deleted!" });
  } catch (err) {
    res.status(404).json({});
  }
}

module.exports = {
  login,
  index,
  showOne,
  register,
  deleteUser,
};
