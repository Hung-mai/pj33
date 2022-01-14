'use strict'

const express = require('express');
const staffAPI = require("./staffAPI");
const patientAPI = require("./patientAPI");
const testcampAPI = require("./testcampAPI");
const medicalAPI = require("./medicalAPI");
const hospitalAPI = require('./hospitalAPI');
const roleAPI = require('./roleAPI');
const sessionLogger = require('../../middlewares/global/sessionLogger');
const { application } = require('express');
const roomAPI = require('./roomAPI');
let api = express.Router();
api.use('/staff', staffAPI);
api.use('/patient', patientAPI);
api.use('/testcamp', testcampAPI);
api.use('/record', medicalAPI);
api.use('/hospital', hospitalAPI);
api.use('/role', roleAPI);
api.use('/room', roomAPI);

module.exports = api;