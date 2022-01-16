const express = require('express');
const testcampAPI = express.Router();
const testcampController = require('../../modules/testcamp/controller');
const testcampValidate = require('../../middlewares/testcamp/testcampValidate');

testcampAPI.get('/', testcampController.getAll)
    .get('/:id', testcampController.getById)
    .post('/', testcampValidate.emptyValidate, testcampController.store)
    .put('/:id', testcampValidate.emptyValidate, testcampController.update)
    .delete('/:id', testcampValidate.checkStillHasStaff, testcampController.delete);

module.exports = testcampAPI;