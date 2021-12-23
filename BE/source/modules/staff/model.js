const db = require('../../models/db');
const generateUsername = require('../../utils/generateUsername');

class Staff {
    /**
     * Lấy toàn bộ danh sách nhân viên y tế (Chỉ danh cho nhân viên Sở y tế)
     */
    static async getAll() {
        let query = `SELECT hospitalId, staffName, dob, phone, address, roleId FROM ${process.env.DB_NAME || "project3"}.staff`;
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
        let query = `SELECT hospitalId, staffName, dob, phone, address, roleId FROM ${process.env.DB_NAME || "project3"}.staff WHERE hospitalId = ${hospitalId}`;
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
        let query = `SELECT hospitalId, staffName, dob, phone, address, roleId, username FROM ${process.env.DB_NAME || "project3"}.staff WHERE staffId = ${staffId}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response[0]) };
            })
        })
    }

    static async getOneByUsername(username) {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff WHERE username = '${username}'`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                } else resolve(response[0]);
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
     * @param {String} roleId Mã chức vụ
     */
    static async storeStaff(hospitalId, staffName, phone, dob, address, roleId) {
        let username = generateUsername(staffName, phone);
        let password = phone;
        let query = `INSERT INTO ${process.env.DB_NAME || "project3"}.staff (hospitalId, staffName, username, password, phone, dob, address, roleId) VALUES (${hospitalId}, '${staffName}', '${username}', '${password}', '${phone}', '${dob}', '${address}', ${roleId});`
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
     * @param {String} roleId Mã chức vụ
     */

    static async updateStaff(staffId, hospitalId, staffName, phone, dob, address, roleId) {
        let query = `UPDATE ${process.env.DB_NAME || "project3"}.staff SET hospitalId = ${hospitalId}, staffName = '${staffName}', phone = '${phone}', dob = '${toSQLDate(dob)}', address = '${address}', roleId = ${roleId} WHERE (staffId = ${staffId})`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, response) => {
                if (error) {
                    reject(error);
                }
                else { resolve(response) };
            })
        })
    }

    static async authorize(username, password) {
        try {
            let user = await Staff.getOneByUsername(username);
            if (!user || user.password !== password) {
                return {
                    status: 400,
                    message: "Tài khoản hoặc mật khẩu không chính xác"
                }
            } else {
                return {
                    status: 200,
                    user: user
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: error
            }
        }
    }
}

module.exports = Staff;