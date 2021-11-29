'use strict'

const express = require('express');
const staffAPI = require("./staffAPI");
const patientAPI = require("./patientAPI");
let api = express.Router();
api.use('/staff', staffAPI);
api.use('/patient', patientAPI);

module.exports = api;