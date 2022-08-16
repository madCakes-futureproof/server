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

    });
  }

  static async update(data){
    return new Promise(async (resolve, reject) => {

    });
  }

  delete() {
    return new Promise(async (resolve, reject) => {
        
      });
  }
}

module.exports = Habit
