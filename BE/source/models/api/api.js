'use strict'

const express = require('express');
const staffAPI = require("./staffAPI");
let api = express.Router();
api.use('/staff', staffAPI);

module.exports = api;