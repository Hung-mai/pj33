const express = require('express');
const patientAPI = express.Router();
const patientController = require('../../modules/patients/controller');

staffAPI.get('/', patientController.getAll)
    .get('/:id', patientController.getOne)
    // .post('/', staffInfoValidate, staffController.store)
    // .put('/:id', staffInfoValidate, staffController.update)
    .delete('/:id', patientController.delete);

module.exports = patientAPI;