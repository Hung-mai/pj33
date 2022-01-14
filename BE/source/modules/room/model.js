const db = require('../../models/db');

class Room {
    roomId;
    hospitalId;
    roomNumber;
    beds;
    patients;

    static async getAll() {
        let query = `SELECT * FROM Room`;
        return await db.queryDB(query);
    }

    static async getRoomsByHospitalId(hospitalId) {
        let query = `SELECT * FROM Room WHERE hospitalId=${hospitalId}`;
        return await db.queryDB(query);
    }

    static async getRoomDetailsById(roomId, hospitalId) {
        let query = `SELECT * FROM Room WHERE roomId=${roomId} AND hospitalId=${hospitalId}`;
        let result = await db.queryDB(query);
        let patients = await Room.countPatients(roomId);
        if (result.length < 0) return null;
        else {
            let finalResult = result[0];
            finalResult.patients = patients;
            return finalResult;
        }
    }

    static async checkDuplicateRoomNumber(roomNumber, hospitalId) {
        let query = `SELECT * FROM Room WHERE roomNumber=${roomNumber} AND hospitalId=${hospitalId}`;
        let result = await db.queryDB(query);
        if (result.length > 0) return true;
        else return false;
    }

    static async addRoomToHospital(roomNumber, beds, hospitalId) {
        let query = `INSERT INTO Room (roomNumber, hospitalId, beds) VALUES (${roomNumber}, ${hospitalId}, ${beds})`;
        return await db.queryDB(query);
    }

    static async updateRoom(roomId, roomNumber, beds, hospitalId) {
        let query = `UPDATE Room SET roomNumber=${roomNumber}, beds=${beds} WHERE roomId=${roomId} AND hospitalId=${hospitalId}`;
        return await db.queryDB(query);
    } 

    static async deleteRoom(roomId) {
        let query = `DELETE FROM Room WHERE roomId=${roomId}`;
        // Delete all relationship with staff
        let queryDeleteRoomFromRoomMaster = `DELETE FROM RoomMaster WHERE roomId=${roomId}`;
        await db.queryDB(queryDeleteRoomFromRoomMaster);
        return await db.queryDB(query);
    }

    static async countPatients(roomId) {
        let query = `SELECT Count(PatientId) AS PatientCount FROM Patient WHERE RoomId=${roomId}`;
        let result = await db.queryDB(query);
        if (result.length == 0) throw new Error("Không tìm thấy phòng");
        else return result[0].PatientCount;
    }

    static async countBeds(roomId) {
        let query = `SELECT * FROM Room WHERE RoomId=${roomId}`;
        let result = await db.queryDB(query);
        if (result.length == 0) throw new Error("Không tìm thấy phòng");
        else return result[0].beds;
    }

    static async checkFull(roomId) {
        let [beds, patients] = await Promise.all([Room.countBeds(roomId), Room.countPatients(roomId)]);
        if (beds >= patients) return true;
        else return false;
    }
}

module.exports = Room;