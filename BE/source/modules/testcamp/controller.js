'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../../models/db');
const toSQLDate = require('../../utils/toSQLDate');

module.exports = {
    getAll: (req, res) => {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.testcamp`;
        db.query(query, (error, response) => {
            if (error) {
                res.status(400).send(error);
            }
            else { res.send(response) };
        })
    },
    getById: (req, res) => {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.testcamp WHERE campId = ${req.params.id}`;
        db.query(query, (error, response) => {
            if (error) {
                res.status(400).send(error);
            }
            else { res.send(response) };
        })
    },
    update: (req, res) => {
        let query = `UPDATE ${process.env.DB_NAME || "project3"}.testcamp SET campId = ${req.body.campId}, address = '${req.body.address}' WHERE (testcampId = ${req.params.id})`;
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
    store: (req, res) => {
        let query = `INSERT INTO ${process.env.DB_NAME || "project3"}.testcamp (campId, address) VALUES (${req.body.campId}, '${req.body.address}');`
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
        let query = `DELETE FROM ${process.env.DB_NAME || "project3"}.testcamp WHERE (campId = ${req.params.id})`;
        db.query(query, (error, response) => {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(200).send({
                    status: "Success"
                })
            }
        })
    }
}