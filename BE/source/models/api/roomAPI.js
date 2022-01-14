const express = require('express');
const roomAPI = express.Router();
const roomController = require('../../modules/room/controller');
const {hospitalType, Role} = require('../../public/enum');

// const roomInfoValidate = require('../../middlewares/room/roomInfoValidate');

roomAPI.get('/', (req, res) => {
    if (req.session.hospitalType == hospitalType.hospital && req.session.roleId == Role['Quản lý cơ sở y tế']) {
        roomController.getRoomsByHospitalId(req, res);
    } else {
        res.status(400).send("Không được phép truy cập")
    }
})
    // .get('/userInfo', roomController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    // .get('/:id', roomController.getStaffInfoById)
    // .post('/', roomInfoValidate, roomController.store)
    // .put('/:id', roomInfoValidate, roomController.update)
    // .delete('/:id', roomController.delete)

module.exports = roomAPI;