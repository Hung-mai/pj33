const express = require('express');
const hosptialAPI = express.Router();
const hospitalController = require('../../modules/hospital/controller');
const hospitalInfoValidate = require('../../middlewares/hospital/hospitalInfoValidate');
const { Role } = require('../../public/enum');

hosptialAPI.get('/', (req, res) => {
    if (req.session.roleId == Role.admin) hospitalController.getAll(req, res);
    else if (req.session.roleId == Role.testcampstaff || req.session.roleId == Role.hospitaladmin) hospitalController.getAllHositals(req, res);

})
    .get('/:id', hospitalController.getById)
    .post('/', hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.emptyValidate, hospitalController.post)
    .put('/:id', hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.emptyValidate, hospitalController.put)
    .delete('/:id', hospitalInfoValidate.isBaseHospital, hospitalInfoValidate.authorizeValidate, hospitalInfoValidate.unusedHospital, hospitalController.delete)

module.exports = hosptialAPI;