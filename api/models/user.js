const db = require('../dbConfig/init');

class User {

    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
    }

    static getAll () {
        return new Promise( async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM userAccount;`);
                const users = result.rows.map(u => new User(u));
                resolve(users);
            } catch (err) {
                reject(err);
            }
        })
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
        })
    }

}

module.exports = User;
