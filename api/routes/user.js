const { Router } = require("express");
const userController = require("../controllers/user");

const userRouter = Router();

userRouter.get("/", userController.index);
userRouter.get("/:id", userController.showOne);
userRouter.post("/login", userController.login);
userRouter.post("/", userController.register);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
