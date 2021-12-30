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
    },
    getById: async (req, res) => {
        try {
            const result = await Hospital.getById(req.params.id);
            if (result.length == 0) {
                res.status(204).send({});
            } else {
                res.status(200).send(result[0])
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    post: async (req, res) => {
        try {
            const result = await Hospital.insert(req.body.name, req.body.address, 0);
            if (result.affectedRows == 0) {
                res.status(200).send("Không thể thêm bệnh viện");
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
            const result = await Hospital.delete(req.params.id);
            if (result.affectedRows == 0) {
                res.status(200).send("Không tìm thấy bệnh viện cần xóa");
            } else {
                res.status(201).send("Đã xóa");
            }
        } catch(error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}