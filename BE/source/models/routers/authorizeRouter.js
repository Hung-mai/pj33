const authorizeRouter = require('express').Router();

const authorizeController = require('../../modules/authorize/controller');

authorizeRouter
.get('/', authorizeController.get)
.post('/', authorizeController.post)
.get('/logout', authorizeController.logout);

module.exports = authorizeRouter;