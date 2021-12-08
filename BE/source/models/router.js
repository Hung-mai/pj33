'use strict';

module.exports = function (app) {
    let path = require('path');
    let authorizeMiddleware = require('../middlewares/global/authorizeMiddleware');
    let authorizeRouter = require('./routers/authorizeRouter');
    let api = require('./api/api');

    // Định tuyến
    app.use('/login', authorizeRouter)
        .use(authorizeMiddleware)
        .use('/api', api)
        .use('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')))
        .use((req, res) => {
            res.redirect('/'); // Khi đường dẫn không tồn tại, redirect về home, vẫn phải đi qua authorizeMiddleware
        })
};