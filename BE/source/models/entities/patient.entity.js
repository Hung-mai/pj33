const sql = require("./db.js");

// constructor
const Patient = function(patient) {
    this.hospitalId = patient.hospitalId;
    this.roomId = patient.roomId;
    this.patientName = patient.patientName;
    this.identifyNumber=  patient.identifyNumber;
    this.healthInsuranceNumber = patient.healthInsuranceNumber;
    this.address = patient.address;
    this.phone = patient.phone;
    this.dob = patient.dob;
    this.sex = patient.sex;
    this.startTime = patient.startTime;
    this.endTime = patient.endTime;
};

Patient.create = (newPatient, result) => {
  sql.query("INSERT INTO patients SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new patient: ", { patientId: res.insertId, ...newPatient });
    result(null, { patientId: res.insertId, ...newPatient });
  });
};

Patient.findById = (id, result) => {
  sql.query(`SELECT * FROM patients WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found patient with the id
    result({ kind: "not_found" }, null);
  });
};

Patient.getAll = (result) => {
  let query = "SELECT * FROM patients";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("patients: ", res);
    result(null, res);
  });
};

Patient.getPatientsByRoom = (roomId, hospitalId, result) => {
    let query = `SELECT * FROM patients WHERE roomId = ${roomId} AND hospitalId = ${hospitalId}`;
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("patients: ", res);
      result(null, res);
    });
};

Patient.getPatientsByName = (name, result) => {
    let query = `SELECT * FROM patients WHERE patientName LIKE '%${name}%'`;
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("patients: ", res);
      result(null, res);
    });
};

Patient.getPatientsByHospital = (hospitalId, result) => {
    let query = `SELECT * FROM patients WHERE hospitalId = ${hospitalId}`;
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("patients: ", res);
      result(null, res);
    });
};

Patient.updateById = (id, patient, result) => {
  sql.query(
    "UPDATE patients SET hospitalId = ?, roomId = ?, patientName = ?, identifyNumber = ?, healthInsuranceNumber = ?, address = ?, phone = ?, dob = ?, sex = ?, startTime = ? WHERE id = ?",
    [patient.hospitalId, patient.roomId, patient.patientName, patient.identifyNumber, patient.healthInsuranceNumber, patient.address, patient.phone, patient.dob, patient.sex, patient.startTime, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found patient with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated patient: ", { id: id, ...patient });
      result(null, { id: id, ...patient });
    }
  );
};

Patient.remove = (id, result) => {
  sql.query(`DELETE FROM patients WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found patient with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted patient with id: ", id);
    result(null, res);
  });
};

Patient.removeAll = result => {
  sql.query("DELETE FROM patients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} patients`);
    result(null, res);
  });
};

module.exports = Patient;