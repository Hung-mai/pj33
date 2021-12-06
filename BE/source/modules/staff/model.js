const db = require('../../models/db');

class Staff {
    /**
     * Lấy toàn bộ danh sách nhân viên y tế (Chỉ danh cho nhân viên Sở y tế)
     */
    static async getAll() {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff`;
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

    /**
     * Trả về danh sách nhân viên y tế của một cơ sở y tế
     * 
     * @param {String} hospitalId Id của bệnh viên
     */
    static async getByHospitalId(hospitalId) {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff WHERE hospitalId = ${hospitalId}`;
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

    /**
     * Lấy thông tin nhân viên y tế bằng id
     * 
     * @param {String} staffId Id của nhân viên y tế
     */
    static async getOneById(staffId) {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff WHERE staffId = ${staffId}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    /**
     * Thêm thông tin nhân viên y tế
     * 
     * @param {String} hospitalId Id bệnh viện
     * @param {String} staffName Tên nhân viên
     * @param {String} phone Số điện thoại
     * @param {Date} dob Ngày sinh
     * @param {String} address Địa chỉ 
     */
    static async storeStaff(hospitalId, staffName, phone, dob, address) {
        let query = `INSERT INTO ${process.env.DB_NAME || "project3"}.staff (hospitalId, staffName, phone, dob, address) VALUES (${hospitalId}, '${staffName}', '${phone}', '${dob}', '${address}');`
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    /**
     * 
     * @param {String} staffId Mã nhân viên y tế
     * @param {String} hospitalId Mã bệnh viện 
     * @param {String} staffName Tên nhân viên y tế
     * @param {String} phone Số điện thoại
     * @param {Date} dob Ngày sinh
     * @param {String} address Địa chỉ
     * @returns 
     */

    static async updateStaff(staffId, hospitalId, staffName, phone, dob, address) {
        let query = `UPDATE ${process.env.DB_NAME || "project3"}.staff SET hospitalId = ${hospitalId}, staffName = '${staffName}', phone = '${phone}', dob = '${toSQLDate(dob)}', address = '${address}' WHERE (staffId = ${staffId})`;
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

module.exports = Staff;