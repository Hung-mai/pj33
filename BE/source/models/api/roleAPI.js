const express = require('express');
const roleAPI = express.Router();
const roleController = require('../../modules/role/controller');
// const roleInfoValidate = require('../../middlewares/role/roleInfoValidate');

roleAPI.get('/', roleController.getAll)
    // .get('/userInfo', roleController.getUserInfo) // Nếu để /:id lên trước, khi dùng /userInfo sẽ trở thành getStaffInfoById với id = userInfo
    // .get('/:id', roleController.getStaffInfoById)
    // .post('/', roleInfoValidate, roleController.store)
    // .put('/:id', roleInfoValidate, roleController.update)
    // .delete('/:id', roleController.delete)

module.exports = roleAPI;