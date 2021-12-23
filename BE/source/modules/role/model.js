const db = require('../../models/db');

class Role {
    static async getAll() {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.role`;
        return await db.queryDB(query);
    }
}

module.exports = Role;