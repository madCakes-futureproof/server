const { Router } = require("express");
const habitController = require("../controllers/habit");
// const verifyToken = require('../middleware/verifyToken');

const habitRouter = Router();

// habitRouter.use(verifyToken);
habitRouter.get("/", habitController.index);
habitRouter.get("/:id", habitController.showOne);
habitRouter.post("/", habitController.createHabit);
habitRouter.patch("/:id", habitController.updateHabit);
habitRouter.delete("/:id", habitController.deleteHabit);

module.exports = habitRouter;
