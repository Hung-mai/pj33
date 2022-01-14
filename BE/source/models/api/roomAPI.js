const express = require('express');
const roomAPI = express.Router();
const roomController = require('../../modules/room/controller');

const roomInfoValidate = require('../../middlewares/room/roomInfoValidate');

roomAPI.use(roomInfoValidate.hospitalValidate)
    .get('/', roomController.getRoomsByHospitalId)
    .get('/:id', roomController.getRoomDetailsById)
    .post('/', roomInfoValidate.emptyBodyValidate, roomInfoValidate.duplicateRoomNumberValidate, roomController.addRoom)
    .put('/:id', roomInfoValidate.emptyBodyValidate, roomInfoValidate.duplicateRoomNumberValidate, roomInfoValidate.bedsValidate, roomController.updateRoom)
    .delete('/:id', roomInfoValidate.deleteRoomValidate, roomController.deleteRoom)
module.exports = roomAPI;