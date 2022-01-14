const db = require('../../models/db');
const {hospitalType} = require('../../public/enum');
class Hospital {
    static async getAll() {
        let query = `SELECT * FROM hospital`;
        return await db.queryDB(query);
    }

    static async getById(id) {
        let query = `SELECT * FROM hospital WHERE hospitalId=${id}`;
        return await db.queryDB(query);
    }

    static async insert(name, address) {
        let query = `INSERT INTO hospital (name, address, type) VALUES ("${name}", "${address}", ${hospitalType.hospital})`;
        return await db.queryDB(query);
    }

    static async update(id, name, address) {
        let query = `UPDATE hospital SET name='${name}', address='${address}' WHERE hospitalId=${id}`;
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

    static async countNurses(id) {
        let query = `SELECT Count(StaffId) as nurses FROM staff WHERE staffId=2 AND hospitalId=${id}`;
        let result = await db.queryDB(query);
        return result[0].nurses;
    }

    static async countDoctors(id) {
        let query = `SELECT Count(StaffId) as doctors FROM staff WHERE staffId=3 AND hospitalId=${id}`;
        let result = await db.queryDB(query);
        return result[0].doctors;
    }

    static async countPatients(id) {
        let query = `SELECT Count(PatientId) as patients FROM patient WHERE hospitalId=${id}`;
        let result = await db.queryDB(query);
        return result[0].patients;
    };
}

module.exports = Hospital;