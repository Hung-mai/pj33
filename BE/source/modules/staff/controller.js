'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../../models/db');
const toSQLDate = require('../../utils/toSQLDate');
const Staff = require('../staff/model');
const checkEmptyObject = require('../../utils/checkEmptyObject');

module.exports = {
    /**
     * Lấy danh sách nhân viên y tế dựa trên query
     * 
     * @param {Request} req Request
     * @param {Response} res Response
     */
    getQuery: async (req, res) => {
        try {
            if (checkEmptyObject(req.query)) { // Lấy toàn bộ danh sách nhân viên y tế, dành cho nhân viên Sở y tế
                let result = await Staff.getAll();
                res.send(result);
            } else if (req.query.hospitalId && // Lấy danh sách nhân viên quản lý cơ sở y tế, dành cho nhân viên Quản lý cơ sở y tế
                typeof req.query.hospitalId == 'string') {
                let result = await Staff.getByHospitalId(req.query.hospitalId);
                res.send(result);
            } else {
                res.status(400).send("Bad request");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getOneById: async (req, res) => {
        try {
            let result = await Staff.getOneById(req.params.id);
            res.send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    update: async (req, res) => {
        try {
            let result = await Staff.updateStaff(req.params.id, req.body.hospitalId, req.body.staffName, req.body.phone, toSQLDate(req.body.dateOfBirth), req.body.address);
            res.status(200).send("1");
        } catch (error) {
            res.status(400).send(error);
        }
    },
    store: async (req, res) => {
        try {
            let result = await Staff.storeStaff(req.body.hospitalId, req.body.staffName, req.body.phone, toSQLDate(req.body.dateOfBirth), req.body.address);
            res.status(200).send("1");
        } catch (error) {
            res.status(400).send(error);
        }
    },
    delete: (req, res) => {
        let query = `DELETE FROM ${process.env.DB_NAME || "project3"}.staff WHERE (staffId = ${req.params.id})`;
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