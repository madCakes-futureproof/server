const db = require("../dbConfig/init");
const bcrypt = require("bcrypt");


class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
  }
  
  static getOneByUsername (username) {
    return new Promise (async (resolve, reject) => {
        try {
            const userData = await db.query(`SELECT * FROM userAccount WHERE username = $1;`, [ username ]);
            const user = new User(userData.rows[0]);
            resolve (user);
        } catch (err) {
            console.log(err);
            reject('Unable to locate user.');
        }
    });
}

  static getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(`SELECT * FROM userAccount;`);
        const users = result.rows.map((u) => new User(u));
        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }

  
  static async getOneById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query(
          `SELECT * FROM userAccount WHERE id = $1;`,
          [id]
        );
        console.log(userData)
        const user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        console.log(err);
        reject("Unable to locate user.");
      }
    });
  }

  async getHabits () {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(`SELECT * FROM habit WHERE user.id = $1;`,
        [this.id]);
        const habits = result.rows.map(h => ({username: h.username, path: `/habits/${h.id}`}));

        resolve(habits)
      } catch (err) {
        reject(err);
      }
    });
  }


  static async register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await db.query(
          `INSERT INTO userAccount (username, password) VALUES ($1, $2) RETURNING *;`,
          [username, hashedPassword]
        );
        let user = new User(newUser.rows[0]);
        resolve(user);
      } catch (err) {
        console.log(err);
        reject("Unable to register!");
      }
    });
  }

  static async showOne(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query(
          `SELECT * FROM userAccount WHERE username = $1;`,
          [username]
        );
        const user = userData.rows[0];
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  delete() {
    return new Promise(async (resolve, reject) => {
        try {
            // Query database to delete user
          const result = await db.query(`DELETE FROM userAccount WHERE id = $1 RETURNING id;`,[this.id]);
            // delete habits
            // call a new class with delete from habit
            resolve(`User has been deleted!`);
          } catch (err) {
          reject(err);
        }
      });
  }
};

module.exports = User;
