const express = require('express');
const staffAPI = express.Router();
const staffController = require('../../modules/staff/controller');
const staffInfoValidate = require('../../middlewares/staff/staffInfoValidate');
const sessionLogger = require('../../middlewares/global/sessionLogger');

staffAPI.get('/', staffController.getStaffList)
    .get('/userInfo', staffController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    .get('/:id', staffController.getStaffInfoById)
    .post('/', staffInfoValidate.emptyValidate,
                staffInfoValidate.manipulateStaffInfoValidate,
                staffInfoValidate.addStaffSameHospitalValidate,
                staffInfoValidate.baseHospitalStaffValidate,
                staffController.post)
    .put('/:id', staffInfoValidate.emptyValidate,
                staffInfoValidate.manipulateStaffInfoValidate,
                staffInfoValidate.addStaffSameHospitalValidate,
                staffInfoValidate.baseHospitalStaffValidate,
                staffController.put)
    .delete('/:id', staffInfoValidate.authorizeDeleteValidate,
                    staffInfoValidate.selfDeleteValidate,
                    staffController.delete)

module.exports = staffAPI;