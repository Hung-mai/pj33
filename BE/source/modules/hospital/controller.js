'use strict'
const db = require('../../models/db');
const Hospital = require('../hospital/model');

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await Hospital.getAll();
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
    },
    getAllHositals: async(req, res) => {
        try {
            const result = await Hospital.getAllHospitals();
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    getById: async (req, res) => {
        try {
            const [hospital, nurses, doctors, patients, rooms] = await Promise.all([Hospital.getById(req.params.id), Hospital.countNurses(req.params.id), Hospital.countDoctors(req.params.id), Hospital.countPatients(req.params.id), Hospital.countRooms(req.params.id)]);

            if (hospital.length == 0) {
                res.status(204).send({});
            } else {
                let result = hospital[0];
                result.nurses = nurses;
                result.doctors = doctors;
                result.patients = patients;
                result.rooms = rooms;
                res.status(200).send(result)
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
    put: async (req, res) => {
        try {
            const result = await Hospital.update(req.params.id, req.body.name, req.body.address, 0);
            if (result.affectedRows == 0) {
                res.status(200).send("Không thể cập nhật thông tin bệnh viện");
            } else {
                res.status(201).send("Cập nhật thành công");
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
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}