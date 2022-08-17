const Habit = require("../models/Habit");
// ✅
async function index(req, res) {
  try {
    const habits = await Habit.getAll();
    res.status(200).json(habits);
  } catch (err) {
    res.status(404).json({ err });
  }
}
// ✅
async function showOne(req, res) {
  try {    
    const habit = await Habit.getOneById(req.params.id)

    console.log(habit)
    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ err });
  }
}
// ✅
async function createHabit(req, res) {

  try {
    const { name, repetitions, frequency, completed, streak, user_id } = req.body;
    console.log(req.body)

    const habit = await Habit.create({ name, repetitions, frequency, completed, streak, user_id });
    console.log(habit.detail)

    res.status(200).json(habit);

  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateHabit(req, res) {

  try {
    const { name, repetitions, frequency, completed, streak, user_id } = req.body;
    console.log(req.body)

    const habit = await Habit.getOneById(req.params.id)
    console.log(habit)

    const updatedHabit = await habit.update(name, repetitions, frequency, completed, streak, user_id);
    console.log(updatedHabit)


    res.status(200).json(updatedHabit);

  } catch (err) {
    res.status(500).json( err.message );
  }
}
// ✅
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
