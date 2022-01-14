const Room = require("./model");

module.exports = {
    getAll: async(req, res) => {
        try {
            let result = await Room.getAll();
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getRoomsByHospitalId: async (req, res) => {
        try {
            let result = await Room.getRoomsByHospitalId(req.session.hospitalId);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getRoomDetailsById: async (req, res) => {
        try {
            let result = await Room.getRoomDetailsById(req.params.id, req.session.hospitalId);
            res.status(200).send(result);
        } catch(error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    addRoom: async (req, res) => {
        try {
            let result = await Room.addRoomToHospital(req.body.roomNumber, req.body.beds, req.session.hospitalId);
            if (result.affecedRows < 1) {
                res.status(200).send("Thêm thất bại");
            } else {
                res.status(201).send("Thêm thành công");
            }
        } catch(error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    updateRoom: async (req, res) => {
        try {
            let result = await Room.updateRoom(req.params.id, req.params.roomNumber, req.params.beds);
            if (result.affecedRows < 1) {
                res.status(200).send("Sửa thất bại");
            } else {
                res.status(201).send("Sửa thành công");
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    deleteRoom: async (req, res) => {
        try {
            let result = await Room.deleteRoom(req.params.id);
            if (result.affecedRows < 1) {
                res.status(200).send("Xóa thất bại");
            } else {
                res.status(201).send("Xóa thành công");
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}