const Patient = require("BE/source/models/entities/patient.entity.js");

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Patient
  const patient = new Patient({
    hospitalId: req.body.hospitalId,
    roomId: req.body.roomId,
    patientName: req.body.patientName,
    identifyNumber: req.body.identifyNumber,
    healthInsuranceNumber = req.body.healthInsuranceNumber || '',
    address = req.body.address || '',
    phone = req.body.phone || '',
    dob = req.body.dob,
    sex = req.body.sex,
    startTime = req.body.startTime,
    endTime = req.body.endTime || ''
  });

  // Save Patient in the database
  Patient.create(patient, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the patient."
      });
    else res.send(data);
  });
};

// Retrieve all Patients from the database (with condition).
exports.getAll = (res) => {
  Patient.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Patients."
      });
    else res.send(data);
  });
};

// Find a single Patient by Id
exports.findOne = (req, res) => {
  Patient.findById(req.params.patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Patient with id ${req.params.patientId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Patient with id " + req.params.patientId
        });
      }
    } else res.send(data);
  });
};

// find all patients by roomId
exports.findByHospital = (req, res) => {
  Patient.getPatientsByHospital(req.params.hospitalId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Patients by roomId."
      });
    else res.send(data);
  });
};

exports.findByRoom = (req, res) => {
    Patient.getPatientsByRoom(req.params.roomId, req.params.hospitalId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Patients by roomId."
        });
      else res.send(data);
    });
};

exports.findByName = (req, res) => {
    Patient.getPatientsByRoom(req.params.name, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Patients by roomId."
        });
        else res.send(data);
    });
};

// Update a Patient identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Patient.updateById(
    req.params.patientId,
    new Patient(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Patient with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  Patient.remove(req.params.patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Patient with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Patient with id " + req.params.id
        });
      }
    } else res.send({ message: `Patient was deleted successfully!` });
  });
};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {
  Patient.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Patients."
      });
    else res.send({ message: `All Patients were deleted successfully!` });
  });
};