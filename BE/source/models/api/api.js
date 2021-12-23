'use strict'

const express = require('express');
const staffAPI = require("./staffAPI");
const patientAPI = require("./patientAPI");
const testcampAPI = require("./testcampAPI");
const medicalAPI = require("./medicalAPI");
const sessionLogger = require('../../middlewares/global/sessionLogger');
const { application } = require('express');
let api = express.Router();
api.use('/staff', staffAPI);
api.use('/patient', patientAPI);
api.use('/testcamp', testcampAPI);
api.use('/record', medicalAPI);

module.exports = api;