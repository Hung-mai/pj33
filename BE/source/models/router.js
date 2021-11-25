'use strict';

module.exports = function(app) {

    let api = require('./api/api');
    app.use('/api', api);

    app.use((req, res) => {
        res.redirect('/api/staff')
        // res.status(404).send('Sorry, we cannot find that!')
    })
};