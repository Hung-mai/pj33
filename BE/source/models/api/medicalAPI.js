const express = require('express');
const medicalInfoValidate = require('../../middlewares/patient/patientInfoValidate');
const medicalAPI = express.Router();
const medicalController = require('../../modules/medical/controller');

medicalAPI.get('/', medicalController.getAll)
    .get('/:id', medicalController.getOne)
    .post('/', patientInfoValidate, medicalController.create)
    .put('/:id', patientInfoValidate, medicalController.update)
    .delete('/:id', medicalController.delete);

module.exports = patientAPI;