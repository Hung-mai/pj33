'use strict';
const express = require('express');

module.exports = function (app) {
    let path = require('path');
    let authorizeMiddleware = require('../middlewares/global/authorizeMiddleware');
    let authorizeRouter = require('./routers/authorizeRouter');
    let api = require('./api/api');
    let sessionLogger = require('../middlewares/global/sessionLogger');

    // Định tuyến
    app.use('/login', authorizeRouter)
        .use(authorizeMiddleware)
        .use('/api', api)
        .use('/', express.static(path.resolve(__dirname, '../../../fe/dist')))
        .use((req, res) => {
            res.status(404).send("Not found");
        })
};