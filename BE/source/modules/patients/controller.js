const db = require('../../models/db');
const Patient = require('../patients/model');

module.exports = {
    // Create and Save a new Patient
  create: async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    try {
      let result = await Patient.createPatient(req.body);
      res.status(200).send("Create patient successfully");
    } catch (error) {
      console.log(error);
        res.status(400).send(error);
    }
  },

  // Retrieve all Patients from the database (with condition).
  getAll: async (req, res) => {
    try {
      let result = await Patient.getAll();
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
      // res.status(500).send({
      //   message: error.message || 'Some error occurred while retrieving Patients.',
      // });
    }
  },

  // Find a single Patient by Id
  getOne: async (req, res) => {
    try {
      let result = await Patient.getOneById(req.params.id);
      res.send(result);
    } catch (error) {
        res.status(400).send(error);
        if (error.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.patientId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving Patient with id ' + req.params.patientId,
          });
        }
    }
  },

  // Update a Patient identified by the id in the request
  update: async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    try {
      let result = await Patient.updatePatient(req.params.id, req.body);
      res.status(200).send("Update patient successfully");
    } catch (error) {
      console.log(error);
        res.status(400).send(error);
        // if (error.kind === 'not_found') {
        //   res.status(404).send({
        //     message: `Not found Patient with id ${req.params.id}.`,
        //   });
        // } else {
        //   res.status(500).send({
        //     message: 'Error updating Patient with id ' + req.params.id,
        //   });
        // }
    }
  },

  // Delete a Patient with the specified id in the request
  delete:  (req, res) => {
    let query = `DELETE FROM patient WHERE (patientId = ${req.params.id})`;
    db.query(query, (error, response) => {
      if (error) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Could not delete Patient with id ' + req.params.id,
          });
        }
      } else {
        res.status(200).send({
          status: 'Success',
        });
      }
    });
  },

  createTransfer: async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    try {
      let result = await Patient.createTransfer(req.body);
      res.status(200).send("Create transfer successfully");
    } catch (error) {
      console.log(error);
        res.status(400).send(error);
    }
  },

  getTransfer: async (req, res) => {
    try {
      let result = await Patient.getTransfers();
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
      // res.status(500).send({
      //   message: error.message || 'Some error occurred while retrieving Patients.',
      // });
    }
  },

  deleteTransfer:  (req, res) => {
    let query = `DELETE FROM transfer WHERE (id = ${req.params.id})`;
    db.query(query, (error, response) => {
      if (error) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Transfer with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Could not delete Transfer with id ' + req.params.id,
          });
        }
      } else {
        res.status(200).send({
          status: 'Success',
        });
      }
    });
  },

  acceptTransfer: async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    try {
      let result = await Patient.updateTransferStatus(req.params.id, 1);
      res.status(200).send("Update transfer successfully");
    } catch (error) {
      console.log(error);
        res.status(400).send(error);
        // if (error.kind === 'not_found') {
        //   res.status(404).send({
        //     message: `Not found Patient with id ${req.params.id}.`,
        //   });
        // } else {
        //   res.status(500).send({
        //     message: 'Error updating Patient with id ' + req.params.id,
        //   });
        // }
    }
  },
}