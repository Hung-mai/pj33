const express = require('express');
const roomAPI = express.Router();
const roomController = require('../../modules/room/controller');
// const roomInfoValidate = require('../../middlewares/room/roomInfoValidate');

roomAPI.get('/', roomController.getRoomsByHospitalId)
    // .get('/userInfo', roomController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    // .get('/:id', roomController.getStaffInfoById)
    // .post('/', roomInfoValidate, roomController.store)
    // .put('/:id', roomInfoValidate, roomController.update)
    // .delete('/:id', roomController.delete)

module.exports = roomAPI;