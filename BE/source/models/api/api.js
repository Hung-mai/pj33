'use strict'

const express = require('express');
const staffAPI = require("./staffAPI");
const patientAPI = require("./patientAPI");
const testcampAPI = require("./testcampAPI");
api.use('/staff', staffAPI);
api.use('/patient', patientAPI);
api.use('/testcamp', testcampAPI);

module.exports = api;