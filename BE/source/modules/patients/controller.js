const db = require('../../models/db');


// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  let query = `INSERT INTO patient (hospitalId, roomId, patientName, identifyNumber, healthInsuranceNumber, address, phone, dob, sex, startTime) VALUES (${req.body.hospitalId}, '${req.body.roomId}', '${req.body.patientName}', '${req.body.identifyNumber}', '${req.body.healthInsuranceNumber}', '${req.body.address}', '${req.body.phone}','${req.body.dob}', '${req.body.sex}', '${req.body.startTime}');`
  db.query(query, (error, response) => {
      if (error) {
          res.status(400).send(error);
      }
      else {
          res.status(200).send({
              status: "Success"
          });
      }
  })
};

// Retrieve all Patients from the database (with condition).
exports.getAll = (req, res) => {
  let query = `SELECT * FROM patient`;
  db.query(query, (error, response) => {
      if (error) {
          res.status(400).send(error);
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Patients."
          });
      }
      else { res.send(response) };
  })
};

// Find a single Patient by Id
exports.getOne = (req, res) => {
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

  let query = `SELECT * FROM patient WHERE patientId = ${req.params.id}`;
  db.query(query, (error, response) => {
      if (error) {
        if (error.kind === "not_found") {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.patientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Patient with id " + req.params.patientId
          });
        }
      }
      else { res.send(response) };
  })
};

// Update a Patient identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

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

  let query = `UPDATE patient SET hospitalId = ${req.body.hospitalId}, roomId = '${req.body.roomId}', patientName = '${req.body.patientName}', identifyNumber = '${req.body.identifyNumber}', healthInsuranceNumber = '${req.body.healthInsuranceNumber}', address = '${req.body.address}', phone = '${req.body.phone}', dob = '${req.body.dob}', sex = '${req.body.sex}', startTime = '${req.body.startTime}', endTime = '${req.body.endTime}' WHERE (patientId = ${req.params.id})`;
        db.query(query, (error, response) => {
            if (error) {
              if (error.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Patient with id ${req.params.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Patient with id " + req.params.id
                });
              }
            }
            else {
                res.status(200).send({
                    status: "Success"
                });
            }
        })
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  let query = `DELETE FROM patient WHERE (patientId = ${req.params.id})`;
        db.query(query, (error, response) => {
            if (error) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Patient with id ${req.params.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Could not delete Patient with id " + req.params.id
                });
              }
            } else {
                res.status(200).send({
                    status: "Success"
                })
            }
        })
};
