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
    /**
     * Lấy thông tin nhân viên bằng Id
     * @param {Request} req request from client
     * @param {Response} res response to client
     */
     getStaffInfoById: async (req, res) => {
        try {
            let result = await Staff.getOneById(req.params.id);
            res.send(result[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
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
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    updateStaff: async (req, res) => {
        try {
            let result = await Staff.update(req.params.id, req.body.hospitalId, req.body.staffName, req.body.phone, toSQLDate(req.body.dob), req.body.address, req.body.roleId);
            if (result.affectedRows == 0) {
                res.status(200).send("Không tìm thấy đối tượng cần cập nhật");
            } else {
                res.status(201).send("Cập nhật thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    addStaff: async (req, res) => {
        try {
            let result = await Staff.insert(req.body.hospitalId, req.body.staffName, req.body.phone, toSQLDate(req.body.dob), req.body.address, req.body.roleId);
            if (result.affectedRows == 0) {
                res.status(200).send("Thêm thất bại");
            } else {
                res.status(201).send("Thêm thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    delete: async (req, res) => {
        try {
            let result = await Staff.delete(req.params.id);
            if (result.affectedRows == 0) {
                res.status(200).send("Không tìm thấy đối tượng cần xóa");
            } else {
                res.status(201).send("Xóa thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },

    assignStaffToRoom: async (req, res) => {
        try {
            let result = await Staff.assignStaffToRoom(req.body.staffId, req.body.roomId);
            if (result.affectedRows < 1) {
                res.status(200).send("Giao phòng không thành công");
            } else {
                res.status(201).send("Giao phòng thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },

    unassignRoom: async (req, res) => {
        try {
            let result = await Staff.unassignRoom(req.body.staffId, req.body.roomId);
            if (result.affectedRows < 1) {
                res.status(200).send("Bỏ giao phòng không thành công");
            } else {
                res.status(201).send("Bỏ giao phòng thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}