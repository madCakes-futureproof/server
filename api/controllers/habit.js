const Habit = require("../models/Habit");

async function index(req, res) {
  try {
    const habits = await Habit.getAll();
    res.status(200).json(habits);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function showOne(req, res) {
  try {    
    const habit = await Habit.getOneById()

    console.log(habit)
    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function createHabit(req, res) {

  try {
    const { name, repetitions, frequency, completed } = req.body;

    const habit = await Habit.create({ name, repetitions, frequency, completed });
    
    res.status(200).json(habit);

  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateHabit(req, res) {

  try {
    const { name, repetitions, frequency, completed } = req.body;
    
    const habit = await Habit.update({ name, repetitions, frequency, completed });
    
    res.status(200).json(habit);

  } catch (err) {
    res.status(500).json({ err });
  }
}

async function deleteHabit(req, res) { 

  try {
    const habit = await Habit.getOneById(req.params.id);

    const resp = await habit.delete()
    res.status(204).end(resp);
    
  } catch (err) {
    res.status(404).json({});
  }
}

module.exports = {
  index,
  showOne,
  createHabit,
  updateHabit,
  deleteHabit,
};
