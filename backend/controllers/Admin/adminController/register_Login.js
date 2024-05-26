const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AdminLoginRegister = require("../../../models/Admin/AdminRegisterLogin/adminModel");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerAdmin = asyncHandler(async (req, res) => {
  let isValid = false;
  let msg = '';
  const { name, email, password, role } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ success: false, msg: "Password must be at least 6 characters long." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, msg: "Please enter a valid email address." });
  }

  const adminExists = await AdminLoginRegister.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ success: false, msg: "Admin already registered." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await AdminLoginRegister.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (admin) {
    const { _id, email, role } = admin;
    const token = generateToken(_id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
    });
    res.status(201).json({
      success: true,
      data: _id,
      name,
      email,
      role,
      token,
      message: "Admin registered successfully.",
    });
  } else {
    res.status(400).json({ error: "Invalid admin data" });
  }
});


const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email ||!password) {
    return res.status(400).json({ success: false, msg: "Please provide email and password." });
  }

  const admin = await AdminLoginRegister.findOne({ email });
  if (!admin) {
    return res.status(400).json({ success: false, msg: "No admin found with this email." });
  }

  const passwordIsCorrect = await bcrypt.compare(password, admin.password);

  if (!passwordIsCorrect) {
    return res.status(400).json({ success: false, msg: "Incorrect password." });
  }

  const token = generateToken(admin._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
  });

  res.status(200).json({
    success: true,
    message: "Admin logged in successfully.",
    token,
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
};