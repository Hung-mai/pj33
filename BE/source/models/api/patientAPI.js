const express = require('express');
const patientInfoValidate = require('../../middlewares/patient/patientInfoValidate');
const patientAPI = express.Router();
const patientController = require('../../modules/patients/controller');

patientAPI.get('/', patientController.getAll)
    .get('/:id', patientController.getOne)
    .post('/', patientInfoValidate, patientController.create)
    .put('/:id', patientInfoValidate, patientController.update)
    .delete('/:id', patientController.delete)
    .get('/transfer/all', patientController.getTransfer)
    .post('/transfer', patientController.createTransfer)
    .put('/transfer/:id', patientController.acceptTransfer)

module.exports = patientAPI;