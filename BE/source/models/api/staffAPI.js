const express = require('express');
const staffAPI = express.Router();
const staffController = require('../../modules/staff/controller');
const staffInfoValidate = require('../../middlewares/staff/staffInfoValidate');

staffAPI.get('/', staffController.getStaffList)
    .get('/:id', staffController.getStaffInfoById)
    .post('/', staffInfoValidate, staffController.store)
    .put('/:id', staffInfoValidate, staffController.update)
    .delete('/:id', staffController.delete)

module.exports = staffAPI;