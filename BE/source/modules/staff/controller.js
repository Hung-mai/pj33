'use strict'
const db = require('../../models/db');
const toSQLDate = require('../../utils/toSQLDate');
const Staff = require('../staff/model');

module.exports = {
    /**
     * Get staff list base on hospitalId in client session
     * @param {Request} req Request from client
     * @param {Response} res Response to client
     */
    getStaffList: async (req, res) => {
        try {
            let result = null;
            switch (req.session.hospitalId) {
                case 1:
                    result = await Staff.getAll();
                    break;
                default:
                    result = await Staff.getByHospitalId(req.session.hospitalId);
                    break;
            }
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    // /**
    //  * Get staff info from query
    //  * 
    //  * @param {Request} req Request
    //  * @param {Response} res Response
    //  */
    // getStaffByHospitalId: async (req, res) => {
    //     try {
    //         if (req.query.hospitalId == req.session.hospitalId && // Lấy danh sách nhân viên cơ sở y tế cụ thể, dành cho nhân viên Quản lý cơ sở y tế
    //             typeof req.query.hospitalId == 'string') {
    //             let result = await Staff.getByHospitalId(req.query.hospitalId);
    //             res.send(result);
    //         } else {
    //             res.status(400).send("Bad request");
    //         }
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // },
    /**
     * Lấy thông tin nhân viên bằng Id
     * @param {Request} req request from client
     * @param {Response} res response to client
     */
     getStaffInfoById: async (req, res) => {
        try {
            let result = await Staff.getOneById(req.params.id);
            res.send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    /**
     * Lấy thông tin người dùng đã đăng nhập
     * @param {Request} req Request từ client
     * @param {Response} res Response tới client
     */
    getUserInfo: async (req, res) => {
        try {
            let result = await Staff.getOneById(req.session.staffId);
            res.send(result[0]);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    update: async (req, res) => {
        try {
            let result = await Staff.updateStaff(req.params.id, req.body.hospitalId, req.body.staffName, req.body.phone, toSQLDate(req.body.dob), req.body.address);
            res.status(200).send("1");
        } catch (error) {
            res.status(400).send(error);
        }
    },
    store: async (req, res) => {
        try {
            let result = await Staff.storeStaff(req.body.hospitalId, req.body.staffName, req.body.phone, toSQLDate(req.body.dob), req.body.address, req.body.roleId);
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