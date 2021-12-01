module.exports = app => {
    const patientController = require("BE/source/modules/patients/controller");
  
    var router = require("express").Router();
  
    // Create a new Patient
    router.post("/patient/", patientController.create);
  
    // Retrieve all Patients
    router.get("/patient/list", patientController.getAll);
  
    // Retrieve a single Patient with id
    router.get("/patient/get/:patientId", Patients.findOne);
  
    // Retrieve Patients with hospitalId
    router.get("/patients/get-by-hospital/:hospitalId", Patients.findByHospital);

    // Retrieve Patients with hospitalId and roomId
    router.get("/patients/get-by-room/:hospitalId/:roomId", Patients.findByRoom);
  
    // Update a Patient with id
    router.put("/patient/update/:id", Patients.update);
  
    // Delete a Patient with id
    router.delete("/:id", Patients.delete);
  
    // Delete all Patients
    router.delete("/", Patients.deleteAll);
  
    app.use('/api/Patients', router);
  };