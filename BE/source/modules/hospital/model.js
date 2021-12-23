const db = require('../../models/db');

class Hospital {
    static async getAll() {
        try {
            let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.hospital`;
            let result = await Hospital.queryDB(query);
            return result;
        } catch (error) {
            return error;
        }
    }

    static queryDB(query) {
        return new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = Hospital;