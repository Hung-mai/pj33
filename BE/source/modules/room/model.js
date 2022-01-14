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
        if (result.length < 0) return null;
        else return result[0];
    }

    static async addRoomToHospital(roomNumber, beds, hospitalId) {
        let query = `INSERT INTO Room (roomNumber, hospitalId, beds) VALUES (${roomNumber}, ${hospitalId}, ${beds})`;
        return await db.queryDB(query);
    }

    static async updateRoom(roomId, roomNumber, beds) {
        let query = `UPDATE Room SET roomNumber=${roomNumber}, beds=${beds} WHERE roomId=${roomId}`;
        return await db.queryDB(query);
    } 

    static async deleteRoom(roomId) {
        let query = `DELETE FROM Room WHERE roomId=${roomId}`;
        return await db.queryDB(query);
    }

    static async countPatients(roomId) {
        let query = `SELECT Count(PatientId) AS PatientCount FROM Patient WHERE RoomId=${roomId}`;
        let result = await db.queryDB(query);
        if (result.length == 0) throw new Error("Không tìm thấy phòng");
        else return result[0].PatientCount;
    }
}

module.exports = Room;