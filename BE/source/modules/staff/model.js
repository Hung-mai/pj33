const db = require('../../models/db');
const generateUsername = require('../../utils/generateUsername');

class Staff {
    /**
     * Lấy toàn bộ danh sách nhân viên y tế (Chỉ danh cho nhân viên Sở y tế)
     */
    static async getAll() {
        let query = `SELECT staff.staffId, staff.staffName, staff.dob, staff.phone, staff.address, hospital.name AS hospitalName, staff.hospitalId, staff.roleId, role.roleName AS roleName FROM staff INNER JOIN hospital ON hospital.hospitalId=staff.hospitalId INNER JOIN role ON role.roleId=staff.roleId`;
        return await db.queryDB(query);
    }

    /**
     * Trả về danh sách nhân viên y tế của một cơ sở y tế
     * 
     * @param {String} hospitalId Id của bệnh viên
     */
    static async getByHospitalId(hospitalId) {
        let query = `SELECT staff.staffId, staff.staffName, staff.dob, staff.phone, staff.address, hospital.name AS hospitalName, staff.hospitalId, staff.roleId, role.roleName AS roleName FROM staff INNER JOIN hospital ON hospital.hospitalId=staff.hospitalId INNER JOIN role ON role.roleId=staff.roleId WHERE staff.hospitalId = ${hospitalId}`;
        return await db.queryDB(query);
    }

    /**
     * Lấy thông tin nhân viên y tế bằng id
     * 
     * @param {String} staffId Id của nhân viên y tế
     */
    static async getOneById(staffId) {
        let query = `SELECT staff.staffId, staff.hospitalId, staff.staffName, staff.dob, staff.phone, staff.address, staff.roleId, staff.username, hospital.name as hospitalName, hospital.type as hospitalType FROM staff INNER JOIN hospital ON hospital.hospitalId = staff.hospitalId WHERE staffId = ${staffId}`;
        return await db.queryDB(query);
    }

    static async getOneByUsername(username) {
        let query = `SELECT staff.staffId, staff.hospitalId, staff.staffName, staff.dob, staff.phone, staff.address, staff.roleId, staff.username, staff.password, hospital.name as hospitalName, hospital.type as hospitalType FROM staff INNER JOIN hospital ON hospital.hospitalId = staff.hospitalId WHERE username = '${username}'`;
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
    static async insert(hospitalId, staffName, phone, dob, address, roleId) {
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

    static async update(staffId, hospitalId, staffName, phone, dob, address, roleId) {
        let query = `UPDATE ${process.env.DB_NAME || "project3"}.staff SET hospitalId = ${hospitalId}, staffName = '${staffName}', phone = '${phone}', dob = '${dob}', address = '${address}', roleId = ${roleId} WHERE (staffId = ${staffId})`;
        return await db.queryDB(query);
    }

    static async delete(staffId) {
        let query = `DELETE FROM staff WHERE staffId=${staffId}`;
        return await db.queryDB(query);
    }
}

module.exports = Staff;