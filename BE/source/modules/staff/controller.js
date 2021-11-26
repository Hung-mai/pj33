'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../../models/db');
const toSQLDate = require('../../utils/toSQLDate');

module.exports = {
    getAll: (req, res) => {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff`;
        db.query(query, (error, response) => {
            res.send(response);
        })
    },
    getById: (req, res) => {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.staff WHERE staffId = ${req.params.id}`;
        db.query(query, (error, response) => {
            res.send(response);
        })
    },
    update: (req, res) => {
    },
    store: (req, res) => {
        let query = `INSERT INTO ${process.env.DB_NAME || "project3"}.staff (hospitalId, staffName, phone, dob, address) VALUES (${req.body.hospitalId}, '${req.body.staffName}', '${req.body.phone}', '${toSQLDate(req.body.dateOfBirth)}', '${req.body.address}');`
        db.query(query, (error, response) => {
            if (error) {
                res.status(400).send(error);
            }
            else {
                res.status(200).send({
                    status: "Success"
                });
            }
        })
    },
    delete: (req, res) => {
    }
}