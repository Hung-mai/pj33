'use strict'

const express = require('express');
const staffAPI = require("./staffAPI");
const testcampAPI = require("./testcampAPI");
let api = express.Router();
api.use('/staff', staffAPI);
api.use('/testcamp', testcampAPI);

module.exports = api;