'use strict'

const db = require('../../models/db');
const Role = require('./model');

module.exports = {
    getAll: async (req, res) => {
        try {
            let result = await Role.getAll();
            res.send(result);
        } catch (error) {
            res.status(500).send({
                status: 500,
                error
            })
        }
    }
}