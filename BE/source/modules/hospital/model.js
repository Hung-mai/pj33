const db = require('../../models/db');

class Hospital {
    static async getAll() {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.hospital`;
        return await db.queryDB(query);
    }

    static async getById(id) {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.hospital WHERE hospitalId=${id}`;
        return await db.queryDB(query);
    }

    static async insert(name, address, rooms) {
        let query = `INSERT INTO hospital (name, address, rooms) VALUES ("${name}", "${address}", ${rooms})`;
        return await db.queryDB(query);
    }

    static async isUnusedHospital(id) {
        let query = `SELECT * FROM staff WHERE staff.hospitalId=${id}`;
        let result = await db.queryDB(query);
        if (result.length == 0) return true;
        else return false;
    }
    
    static async delete(id) {
        let query = `DELETE FROM hospital WHERE hospital.hospitalId=${id}`;
        return await db.queryDB(query);
    }
}

module.exports = Hospital;