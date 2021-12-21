const { Level } = require("../../public/enum");
const getAge = require("../../utils/getAge");
const MedicalService = require("./service");
const db = require('../../models/db');
const Patient = require("../patients/model");

class MedicalRecord {
    static async getAll() {
        let query = `SELECT * FROM medicalrecord`;
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

    static async getByPatientId(patientId) {
        let query = `SELECT * FROM medicalrecord WHERE patientId = ${patientId}`;
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
        let query = `SELECT * FROM medicalrecord WHERE recordId = ${id}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async createRecord(body) {
        let query = `INSERT INTO medicalrecord (staffId, patientId, treatmentTime, bodyTemperature, vaccinesAdministered, spO2, backgroundDisease, breathingFrequency, heartbeat, bloodPresure, isFever, isCough, isSoreThroat, isOxygenSupport, isHardBreath, isMusclePain, isLossOfTaste) 
            VALUES 
            (${body.staffId}, '${body.patientId}', '${body.treatmentTime}', '${body.bodyTemperature}', '${body.vaccinesAdministered}', '${body.spO2}', '${body.backgroundDisease}','${body.breathingFrequency}', '${body.heartbeat}', '${body.bloodPresure}', '${body.isFever}', '${body.isCough}', '${body.isSoreThroat}', '${body.isOxygenSupport}', '${body.isHardBreath}', '${body.isMusclePain}', '${body.isLossOfTaste}');`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async updateRecord(id, body) {
        let query = `UPDATE medicalrecord SET staffId = ${body.staffId}, patientId = '${body.patientId}', treatmentTime = '${body.treatmentTime}', bodyTemperature = '${body.bodyTemperature}', vaccinesAdministered = '${body.vaccinesAdministered}', spO2 = '${body.spO2}', backgroundDisease = '${body.backgroundDisease}', breathingFrequency = '${body.breathingFrequency}', heartbeat = '${body.heartbeat}', bloodPresure = '${body.bloodPresure}', isFever = '${body.isFever}', isCough = '${body.isCough}', isSoreThroat = '${body.isSoreThroat}', isOxygenSupport = '${body.isOxygenSupport}', isHardBreath = '${body.isHardBreath}', isMusclePain = '${body.isMusclePain}', isLossOfTaste = '${body.isLossOfTaste}' WHERE (recordId = ${id})`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async classify(record) {
        if(MedicalService.isEmergency(record)) {
            return Level.VERY_HIGHT;
        }

        let patient = await Patient.getOneById(record.patientId);
        const age = getAge(patient.dob);
        const hasSymptom = MedicalService.hasSymptom(record);
        let level;
        let levelByAge, levelBySpO2;

        if(record.spO2 >= 97) {
            levelBySpO2 = Level.LOW;
        } else if(record.spO2 >= 96 && record.spO2 < 97) {
            levelBySpO2 = Level.MEDIUM;
        } else if (record.spO2 >= 94 && record.spO2 < 96) {
            levelBySpO2 = Level.HIGH;
        } else {
            levelBySpO2 = Level.VERY_HIGHT;
        }


        if(age < 50) {
            if(!record.backgroundDisease && record.vaccinesAdministered >= 2 && !hasSymptom && levelBySpO2 === Level.LOW) {
                levelByAge = Level.LOW;
            } else if(record.vaccinesAdministered < 2 && hasSymptom && levelBySpO2 === Level.LOW) {
                levelByAge = Level.MEDIUM;
            } else if(record.backgroundDisease !== '') {
                levelByAge = Level.HIGH;
            } else {
                levelByAge = Level.UNKNOW;
            }
        } else if(age >= 50 && age < 64) {
            if(!record.backgroundDisease && record.vaccinesAdministered >= 2) {
                levelByAge = Level.MEDIUM;
            } else if(!record.backgroundDisease && record.vaccinesAdministered < 2) {
                levelByAge = Level.HIGH
            }
            else {
                levelByAge = Level.UNKNOW;
            }
        } else {
            if(record.vaccinesAdministered >= 2) {
                levelByAge = Level.HIGH;
            } else {
                levelByAge = Level.VERY_HIGHT;
            }
        }

        level = levelByAge > levelBySpO2 ? levelByAge : levelBySpO2;
        return level
    }
}

module.exports = MedicalRecord;