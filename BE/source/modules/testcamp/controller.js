'use strict'

const db = require('../../models/db');
const Testcamp = require('./model');

module.exports = {
    getAll: async (req, res) => {
        try {
            let result = await Testcamp.getAll();
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getById: async (req, res) => {
        try {
            let result = await Testcamp.getById(req.params.id);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    update: async (req, res) => {
        try {
            let result = await Testcamp.update(req.body.name, req.body.address, req.params.id);
            if (result.affectedRows < 1) {
                res.status(200).send("Sửa không thành công");
            } else {
                res.status(201).send("Sửa thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    store: async (req, res) => {
        try {
            let result = await Testcamp.insert(req.body.name, req.body.address);
            if (result.affectedRows < 1) {
                res.status(200).send("Thêm không thành công");
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
            let result = await Testcamp.delete(req.params.id);
            if (result.affectedRows < 1) {
                res.status(200).send("Xóa không thành công");
            } else {
                res.status(201).send("Xóa thành công");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}