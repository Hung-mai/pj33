const db = require('../../models/db');

// Create and Save a new record
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  let query = `INSERT INTO medicalrecord (staffId, patientId, treatmentTime, bodyTemperature, vaccinesAdministered, spO2, backgroundDisease, breathingFrequency, heartbeat, bloodPresure, isFever, isCough, isSoreThroat, isOxygenSupport, isHardBreath, isMusclePain, isLossOfTaste) 
    VALUES 
    (${req.body.staffId}, '${req.body.patientId}', '${req.body.treatmentTime}', '${req.body.bodyTemperature}', '${req.body.vaccinesAdministered}', '${req.body.spO2}', '${req.body.backgroundDisease}','${req.body.breathingFrequency}', '${req.body.heartbeat}', '${req.body.bloodPresure}', '${req.body.isFever}', '${req.body.isCough}', '${req.body.isSoreThroat}', '${req.body.isOxygenSupport}', '${req.body.isHardBreath}', '${req.body.isMusclePain}', '${req.body.isLossOfTaste}');`;
  db.query(query, (error, response) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send({
        status: 'Success',
      });
    }
  });
};

exports.getAll = (req, res) => {
  let query = `SELECT * FROM medicalrecord`;
  db.query(query, (error, response) => {
    if (error) {
      res.status(400).send(error);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      });
    } else {
      res.send(response);
    }
  });
};

exports.getOne = (req, res) => {
  let query = `SELECT * FROM medicalrecord WHERE recordId = ${req.params.id}`;
  db.query(query, (error, response) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found record with id ${req.params.patientId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving record with id ' + req.params.patientId,
        });
      }
    } else {
      res.send(response);
    }
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  let query = `UPDATE medicalrecord SET staffId = ${req.body.staffId}, patientId = '${req.body.patientId}', treatmentTime = '${req.body.treatmentTime}', bodyTemperature = '${req.body.bodyTemperature}', vaccinesAdministered = '${req.body.vaccinesAdministered}', spO2 = '${req.body.spO2}', backgroundDisease = '${req.body.backgroundDisease}', breathingFrequency = '${req.body.breathingFrequency}', heartbeat = '${req.body.heartbeat}', bloodPresure = '${req.body.bloodPresure}', isFever = '${req.body.isFever}', isCough = '${req.body.isCough}', isSoreThroat = '${req.body.isSoreThroat}', isOxygenSupport = '${req.body.isOxygenSupport}', isHardBreath = '${req.body.isHardBreath}', isMusclePain = '${req.body.isMusclePain}', isLossOfTaste = '${req.body.isLossOfTaste}' WHERE (recordId = ${req.params.id})`;
  db.query(query, (error, response) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found record with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating record with id ' + req.params.id,
        });
      }
    } else {
      res.status(200).send({
        status: 'Success',
      });
    }
  });
};

exports.delete = (req, res) => {
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
};