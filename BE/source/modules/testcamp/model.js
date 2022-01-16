const db = require("../../models/db");

class Testcamp {
    name;
    address;

    static async getAll() {
        let query = `SELECT * FROM hospital WHERE type = 2`;
        return await db.queryDB(query);
    }

    static async getById(id) {
        let query = `SELECT * FROM hospital WHERE hospitalId = ${id} AND type=2`;
        return await db.queryDB(query);
    }

    static async update(name, address, id) {
        let query = `UPDATE hospital SET address = '${address}', name = '${name}' WHERE (hospitalId = ${id} AND type=2)`;
        return await db.queryDB(query);
    }

    static async insert(name, address) {
        let query = `INSERT INTO hospital (name, address, type) VALUES ('${name}', '${address}', 2);`
        return await db.queryDB(query);
    }

    static async delete(id) {
        let query = `DELETE FROM hospital WHERE hospitalId=${id} AND type=2`;
        return await db.queryDB(query);
    }
}

module.exports = Testcamp;