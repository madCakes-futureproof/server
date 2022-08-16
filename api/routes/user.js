const { Router } = require('express');
const userController = require("../controllers/user");

const userRouter = Router();

userRouter.get("/", userController.index);
userRouter.post("/login", userController.login);

module.exports = userRouter;
