const express = require('express');
const hosptialAPI = express.Router();
const hospitalController = require('../../modules/hospital/controller');
const hospitalInfoValidate = require('../../middlewares/hospital/hospitalInfoValidate');

hosptialAPI.get('/', hospitalController.getAll)
    .get('/:id', hospitalController.getById)
    .post('/', hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.emptyValidate, hospitalController.post)
    .put('/:id', hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.emptyValidate, hospitalController.put)
    .delete('/:id', hospitalInfoValidate.isBaseHospital, hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.unusedHospital, hospitalController.delete)

module.exports = hosptialAPI;