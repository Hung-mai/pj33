const express = require('express');
const staffAPI = express.Router();
const staffController = require('../../modules/staff/controller');
const postMiddleware = require('../../middlewares/staff/post');

staffAPI.get('/', staffController.getAll)
    .get('/:id', staffController.getById)
    .post('/', postMiddleware, staffController.store)
    .put('/', staffController.update)
    .delete('/', staffController.delete);

module.exports = staffAPI;