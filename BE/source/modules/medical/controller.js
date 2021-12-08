const db = require('../../models/db');
const MedicalRecord = require('../medical/model');
const Patient = require('../patients/model');

// Create and Save a new record
module.exports = {
  create: async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
  
    try {
      let result = await MedicalRecord.createRecord(req.body);
      const level = await MedicalRecord.classify(req.body);
      let updatePatient = await Patient.updatePatientLevel(req.body.patientId, level);
      res.status(200).send("Create record successfully");
    } catch (error) {
      console.log(error);
        res.status(400).send(error);
    }
  },
  
  getAll: async (req, res) => {
    try {
      let result = await MedicalRecord.getAll();
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving Records.',
      });
    }
  },
  
  getOne: async (req, res) => {
    try {
      let result = await Patient.getOneById(req.params.id);
      res.send(result);
    } catch (error) {
        res.status(400).send(error);
        if (error.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Record with id ${req.params.patientId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving Record with id ' + req.params.patientId,
          });
        }
    }
  },
  
  update: async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
  
    try {
      let result = await MedicalRecord.updateRecord(req.params.id, req.body);
      res.status(200).send("Update record successfully");
    } catch (error) {
        res.status(400).send(error);
        if (error.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Record with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Record with id ' + req.params.id,
          });
        }
    }
  },
  
  delete: (req, res) => {
    let query = `DELETE FROM medicalrecord WHERE (recordId = ${req.params.id})`;
    db.query(query, (error, response) => {
      if (error) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found record with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Could not delete record with id ' + req.params.id,
          });
        }
      } else {
        res.status(200).send({
          status: 'Success',
        });
      }
    });
  },
}
