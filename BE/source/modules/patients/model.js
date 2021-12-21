const db = require('../../models/db');

class Patient {
    static async getAll() {
        let query = `SELECT * FROM patient`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            })
        })
    }

    static async getByHospitalId(hospitalId) {
        let query = `SELECT * FROM patient WHERE hospitalId = ${hospitalId}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            })
        })
    }

    static async getOneById(id) {
        let query = `SELECT * FROM patient WHERE patientId = ${id}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async createPatient(body) {
        let query = `INSERT INTO patient (hospitalId, roomId, patientName, identifyNumber, healthInsuranceNumber, address, phone, dob, sex, startTime) VALUES (${body.hospitalId}, '${body.roomId}', '${body.patientName}', '${body.identifyNumber}', '${body.healthInsuranceNumber}', '${body.address}', '${body.phone}','${body.dob}', '${body.sex}', '${body.startTime}');`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async updatePatient(id, body) {
        let query = `UPDATE patient SET hospitalId = ${body.hospitalId}, roomId = '${body.roomId}', patientName = '${body.patientName}', identifyNumber = '${body.identifyNumber}', healthInsuranceNumber = '${body.healthInsuranceNumber}', address = '${body.address}', phone = '${body.phone}', dob = '${body.dob}', sex = '${body.sex}', startTime = '${body.startTime}', endTime = '${body.endTime}' WHERE (patientId = ${id})`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async updatePatientLevel(id, level) {
        let query = `UPDATE patient SET level = ${level} WHERE (patientId = ${id})`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }
}

module.exports = Patient;