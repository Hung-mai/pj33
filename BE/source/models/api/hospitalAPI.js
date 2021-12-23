const express = require('express');
const hosptialAPI = express.Router();
const hospitalController = require('../../modules/hospital/controller');
// const hospitalInfoValidate = require('../../middlewares/hospital/hospitalInfoValidate');

hosptialAPI.get('/', hospitalController.getAll)
    // .get('/userInfo', hospitalController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    // .get('/:id', hospitalController.getStaffInfoById)
    // .post('/', hospitalInfoValidate, hospitalController.store)
    // .put('/:id', hospitalInfoValidate, hospitalController.update)
    // .delete('/:id', hospitalController.delete)

module.exports = hosptialAPI;