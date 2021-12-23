const db = require('../../models/db');
const generateUsername = require('../../utils/generateUsername');

class Staff {
    /**
     * Lấy toàn bộ danh sách nhân viên y tế (Chỉ danh cho nhân viên Sở y tế)
     */
    static async getAll() {
        let query = `SELECT staffId, hospitalId, staffName, dob, phone, address, roleId FROM ${process.env.DB_NAME || "project3"}.staff`;
        return await db.queryDB(query);
    }

    /**
     * Trả về danh sách nhân viên y tế của một cơ sở y tế
     * 
     * @param {String} hospitalId Id của bệnh viên
     */
    static async getByHospitalId(hospitalId) {
        let query = `SELECT staffId, hospitalId, staffName, dob, phone, address, roleId FROM ${process.env.DB_NAME || "project3"}.staff WHERE hospitalId = ${hospitalId}`;
        return await db.queryDB(query);
    }

    /**
     * Lấy thông tin nhân viên y tế bằng id
     * 
     * @param {String} staffId Id của nhân viên y tế
     */
    static async getOneById(staffId) {
        let query = `SELECT staffId, hospitalId, staffName, dob, phone, address, roleId, username FROM ${process.env.DB_NAME || "project3"}.staff WHERE staffId = ${staffId}`;
        return await db.queryDB(query);
    }

    static async getOneByUsername(username) {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff WHERE username = '${username}'`;
        return await db.queryDB(query);
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
        return await db.queryDB(query);
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
        return await db.queryDB(query);
    }

    static async authorize(username, password) {
        try {
            let users = await Staff.getOneByUsername(username);
            let user = users[0];
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