'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../../models/db');

module.exports = {
    getAll: (req, res) => {
        let query = `SELECT * FROM ${process.env.DB_NAME || "project3"}.hospital`;
        db.query(query, (error, response) => {
            console.log(error);
            console.log(response);
            res.send(response);
        })
    },
    getOne: (req, res) => {
    },
    update: (req, res) => {
    },
    store: (req, res) => {
    },
    delete: (req, res) => {
    }
}