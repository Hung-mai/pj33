const db = require('../../models/db');
const toSQLDate = require('../../utils/toSQLDate');

class Patient {
    static async getAll() {
        let query = `SELECT * FROM patient`;
        return await db.queryDB(query);
    }

    static async getByHospitalId(hospitalId) {
        let query = `SELECT * FROM patient WHERE hospitalId = ${hospitalId}`;
        return await db.queryDB(query);
    }

    static async getOneById(id) {
        let query = `SELECT * FROM patient WHERE patientId = ${id}`;
        return await db.queryDB(query);
    }

    static async createPatient(body) {
        let query = `INSERT INTO patient (hospitalId, roomId, patientName, identifyNumber, healthInsuranceNumber, address, phone, dob, sex, startTime) VALUES (${body.hospitalId}, '${body.roomId}', '${body.patientName}', '${body.identifyNumber}', '${body.healthInsuranceNumber}', '${body.address}', '${body.phone}','${body.dob}', '${body.sex}', '${body.startTime}');`;
        return await db.queryDB(query);
    }

    static async updatePatient(id, body) {
        let query = `UPDATE patient SET hospitalId = ${body.hospitalId}, roomId = '${body.roomId}', patientName = '${body.patientName}', identifyNumber = '${body.identifyNumber}', healthInsuranceNumber = '${body.healthInsuranceNumber}', address = '${body.address}', phone = '${body.phone}', dob = '${body.dob}', sex = '${body.sex}', startTime = '${toSQLDate(body.startTime)}', endTime = '${toSQLDate(body.endTime)}' WHERE (patientId = ${id})`;
        return await db.queryDB(query);
    }

    static async updatePatientLevel(id, level) {
        let query = `UPDATE patient SET level = ${level} WHERE (patientId = ${id})`;
        return await db.queryDB(query);
    }

    static async createTransfer(body) {
        let query = `INSERT INTO transfer (patientName, identifyNumber, healthInsuranceNumber, address, phone, dob, sex, leaveDate, status, beforeId, afterId) VALUES (${body.patientName}, '${body.identifyNumber}', '${body.healthInsuranceNumber}', '${body.address}', '${body.phone}', '${body.dob}', '${body.sex}','${body.leaveDate}', '${body.status}', '${body.beforeId}', '${body.afterId}');`;
        return await db.queryDB(query);
    }
 
    static async getTransfers() {
        let query = `SELECT * FROM transfer WHERE (status = 0)`;
        return await db.queryDB(query);
    }

    static async updateTransferStatus(id, status) {
        let query = `UPDATE transfer SET status = ${status} WHERE (id = ${id})`;
        return await db.queryDB(query);
    }
}

module.exports = Patient;