'use strict'
const db = require('../../models/db');
const Hospital = require('../hospital/model');

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await Hospital.getAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: 400,
                error
            })
        }
    }
}