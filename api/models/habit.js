const db = require("../dbConfig/init");

class Habit {
  constructor(data, user) {
    this.id = data.id;
    this.name = data.name;
    this.repetitions = data.repetitions;
    this.frequency = data.frequency;
    this.completed = data.completed;
    this.streak = data.streak;
    this.user = {
        username: user.username,
        path: `./users/${user.id}`
    }

  }

  
  static async getAll(){
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(`SELECT * FROM habit;`);
        const habits = result.rows.map((h) => new Habit(h));
        resolve(habits);
      } catch (err) {
        reject(err);
      }
    });
  }

  static async getOneById(id){
    return new Promise(async (resolve, reject) => {
        try {
          let habitData = await db.query(
            `SELECT habit.*, user.id as user_id FROM habit JOIN userAccount ON user.id = habit.user_id WHERE habit.id = $1;`,
            [id]         
          );
          let habit = new Habit(habitData.rows[0]);
          console.log(habit);
          resolve(habit);
        } catch (err) {
          reject("Habit not found");
        }
      });
  }

  static async create(data){
    return new Promise(async (resolve, reject) => {
      try {
        const { name, repetitions, frequency, completed, streak } = data;

        const newHabit = await db.query(
          `INSERT INTO habit (name, repetitions, frequency, completed, streak) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
          [name, repetitions, frequency, completed, streak]
        );
        let habit = new Habit(newHabit.rows[0]);
        resolve(habit);
      } catch (err) {
        console.log(err);
        reject("Unable to create habit!");
      }

    });
  }

  update(name, repetitions, frequency, completed, streak) {
    return new Promise (async (resolve, reject) => {
        try {
            name = name || this.name;
            repetitions = repetitions || this.repetitions;
            frequency = frequency || this.frequency;
            completed = completed || this.completed;
            streak = streak || this.streak
            const updateHabitData = await db.query(`UPDATE habit SET name =  $2, repetitions = $3, frequency = $4, completed = $5, streak = $6 WHERE id = $1 RETURNING *;`, [ this.id, name, repetitions, frequency, completed, streak]);
            let updatedHabit = new Habit(updateHabitData.rows[0]);
            resolve(updatedHabit);
        } catch(err) {
            reject("Error updating habit")
        }
    })
}

  delete() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(`DELETE FROM habit WHERE id = $1 RETURNING id;`,[this.id]);
        resolve(`Habit has been deleted!`);
      } catch (err) {
      reject(err);
    }
      });
  }
}

module.exports = Habit
