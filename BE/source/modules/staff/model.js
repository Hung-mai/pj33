const db = require('../../models/db');
const { Role } = require('../../public/enum');
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
        let result = await db.queryDB(query);
        if (result.length == 0) return result;
        else {
            if (result[0].roleId == Role.nurse || result[0].roleId == Role.doctor) {
                let roomsQuery = `SELECT Room.roomId, Room.roomNumber FROM Room INNER JOIN RoomMaster ON Room.roomId=RoomMaster.roomId WHERE RoomMaster.staffId=${staffId}`;
                let rooms = await db.queryDB(roomsQuery);
                result[0].rooms = rooms;
            }
            return result;
        }
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
        let query = `UPDATE ${process.env.DB_NAME || "project3"}.staff SET hospitalId=${hospitalId}, staffName = '${staffName}', phone = '${phone}', dob = '${dob}', address = '${address}', roleId = ${roleId} WHERE (staffId = ${staffId})`;
        return await db.queryDB(query);
    }

    static async delete(staffId) {
        let query = `DELETE FROM staff WHERE staffId=${staffId}`;
        return await db.queryDB(query);
    }

    static async assignRoomToStaff(staffId, roomId) {
        let query = `INSERT INTO RoomMaster (staffId, roomId) VALUES (${staffId}, ${roomId})`;
        return await db.queryDB(query);
    }

    /**
     * Kiểm tra nhân viên, phòng bệnh và quản lý bệnh viện có thuộc cùng bệnh viện và nhân viên có phải bác sĩ hay y tá
     * @param {number} staffId 
     * @param {number} roomId 
     * @returns {Promise<Boolean>}
     */
    static async checkSameHospital(staffId, roomId, hospitalAdminId) {
        let queryStaff = `SELECT * FROM Staff WHERE staffId=${staffId}`;
        let queryHospitalAdmin = `SELECT * FROM Staff WHERE staffId=${hospitalAdminId}`;
        let queryRoom = `SELECT * FROM Room WHERE roomId=${roomId}`;
        let [staffResult, hospitalAdminResult, roomResult] = await Promise.all([db.queryDB(queryStaff), db.queryDB(queryHospitalAdmin), db.queryDB(queryRoom)]);
        if (staffResult.length == 0 || roomResult == 0 || hospitalAdminResult.length == 0) return false;
        else if (staffResult[0].roleId != Role.doctor && staffResult[0].roleId != Role.nurse) return false;
        else {
            if (staffResult[0].hospitalId != roomResult[0].hospitalId || staffResult[0].hospitalId != roomResult[0].hospitalId) return false;
            else return true;
        }
    }

    /**
     * Xóa liên hệ giữa nhân viên y tế và phòng bệnh
     * @param {*} staffId 
     * @param {*} roomId 
     * @returns {Promise<ResultObject>}
     */
    static async unassignRoom(staffId, roomId) {
        let query = `DELETE FROM RoomMaster WHERE staffId=${staffId} AND roomId=${roomId}`;
        return await db.queryDB(query);
    }
}

module.exports = Staff;