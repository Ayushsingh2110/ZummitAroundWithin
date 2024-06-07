const User = require("../../models/User/userModel");

// Get Patient By Id

const getPatientById = async (req, res) => {
  const patient_id = req.params.id;
  try {
    const patient = await User.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const { name, input } = patient;
    return res.json({ name, input });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

// Get All Therapists Details...

const getAllPatients = async (req, res) => {
  try {
    const allPatients = await User.find();
    const patientsData = allPatients.map((patient) => {
      const { name, input } = patient;
      return { name, input };
    });
    return res.json(patientsData);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

module.exports = {
  getPatientById,
  getAllPatients,
};
