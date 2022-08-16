const db = require("../dbConfig/init");

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
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

  static getOneByUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query(
          `SELECT * FROM userAccount WHERE username = $1;`,
          [username]
        );
        const user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        console.log(err);
        reject("Unable to locate user.");
      }
    });
  }

  static register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password } = data;

        const newUser = await db.query(
          `INSERT INTO userAccount (username, password) VALUES ($1, $2) RETURNING *;`,
          [username, password]
        );
        let user = new User(newUser.rows[0]);
        resolve(user);
      } catch (err) {
        console.log(err);
        reject("Unable to register!");
      }
    });
  }

//  Join tables for habits and don't show password TODO
  static showOne(username) {
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
}

module.exports = User;
