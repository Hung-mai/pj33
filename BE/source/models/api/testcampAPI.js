const express = require('express');
const testcampAPI = express.Router();
const testcampController = require('../../modules/testcamp/controller');
const testcampValidate = require('../../middlewares/testcamp/testcampValidate');

testcampAPI.get('/', testcampController.getAll)
    .get('/:id', testcampController.getById)
    .post('/', testcampValidate, testcampController.store)
    .put('/:id', testcampValidate, testcampController.update)
    .delete('/:id', testcampController.delete);

module.exports = testcampAPI;