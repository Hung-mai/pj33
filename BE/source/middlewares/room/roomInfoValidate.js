const Room = require("../../modules/room/model");
const { hospitalType } = require("../../public/enum");

module.exports = {
    // Only with normal hospital
    hospitalValidate: (req, res, next) => {
        if (req.session.hospitalId > 1 && req.session.hospitalType == hospitalType.hospital) next(); 
        else res.status(400).send("Yêu cầu truy cập không hợp lệ");
    },
    
    emptyBodyValidate: (req, res, next) => {
        if (!req.body || !req.body.roomNumber || !req.body.beds || isNaN(req.body.roomNumber) || isNaN(req.body.beds) || req.body.beds <= 0) {
            res.status(400).send("Thông tin không hợp lệ");
        } else next();
    },

    duplicateRoomNumberValidate: async (req, res, next) => {
        let isDuplicate = await Room.checkDuplicateRoomNumber(req.body.roomNumber, req.session.hospitalId);
        if (isDuplicate) res.status(400).send("Số phòng đã tồn tại");
        else next();
    },

    bedsValidate: async (req, res, next) => {
        let patients = await Room.countPatients(req.params.id);
        if (req.body.beds < patients) {
            res.status(400).send(`Số giường bệnh mới không đủ cho ${patients} bệnh nhân`);
        } else next();
    },

    availableValidate: async (req, res, next) => {
        let [beds, patients] = await Promise.all([Room.countBeds(req.body.roomId), Room.countPatients(req.body.roomId)]);
        if (beds <= patients) {
            res.status(400).send(`Số giường bệnh không đủ, phòng hiện có ${beds} và ${patients} bệnh nhân`);
        } else next();
    },

    deleteRoomValidate: async (req, res, next) => {
        let patients = await Room.countPatients(req.params.id);
        if (patients > 0) {
            res.status(400).send(`Trong phòng còn ${patients} bệnh nhân`);
        } else next();
    }
}