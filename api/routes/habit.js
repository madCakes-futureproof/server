const { Router } = require("express");
const habitController = require("../controllers/habit");

const habitRouter = Router();

habitRouter.get("/", habitController.index);
habitRouter.get("/:id", habitController.showOne);
habitRouter.post("/", habitController.createHabit);
habitRouter.post("/:id", habitController.updateHabit);
habitRouter.delete("/:id", habitController.deleteHabit);

module.exports = habitRouter;
