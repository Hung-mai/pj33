const express = require('express');
const medicalInfoValidate = require('../../middlewares/medical/medicalInfoValidate');
const medicalAPI = express.Router();
const medicalController = require('../../modules/medical/controller');

medicalAPI.get('/', medicalController.getAll)
    .get('/:id', medicalController.getOne)
    .post('/', medicalInfoValidate, medicalController.create)
    .put('/:id', medicalInfoValidate, medicalController.update)
    .delete('/:id', medicalController.delete);

module.exports = medicalAPI;