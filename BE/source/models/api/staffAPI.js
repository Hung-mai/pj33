const express = require('express');
const staffAPI = express.Router();
const staffController = require('../../modules/staff/controller');

staffAPI.get('/', staffController.getAll);
staffAPI.post('/', staffController.store);
staffAPI.put('/', staffController.update);
staffAPI.delete('/', staffController.delete);

module.exports = staffAPI;