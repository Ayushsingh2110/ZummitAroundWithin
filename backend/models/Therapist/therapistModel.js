
const mongoose = require('mongoose');

const therapistSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  input: {
    type: String,
    required: [true, 'Please add an email or phone number'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  admin :{
    type : String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Therapist', therapistSchema);
