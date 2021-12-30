const express = require('express');
const hosptialAPI = express.Router();
const hospitalController = require('../../modules/hospital/controller');
const hospitalInfoValidate = require('../../middlewares/hospital/hospitalInfoValidate');

hosptialAPI.get('/', hospitalController.getAll)
    // .get('/userInfo', hospitalController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    // .get('/:id', hospitalController.getStaffInfoById)
    .post('/', hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.emptyValidate, hospitalController.post)
    // .put('/:id', hospitalInfoValidate, hospitalController.update)
    .delete('/:id', hospitalInfoValidate.isBaseHospital, hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.unusedHospital, hospitalController.delete)

module.exports = hosptialAPI;