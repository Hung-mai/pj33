'use strict';

module.exports = function(app) {
    let path = require('path');
    let api = require('./api/api');
    app.use('/api', api);
    app.use('/home', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')))
    app.use((req, res) => {
        res.redirect('/home');
    })
};