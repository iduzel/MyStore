const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: { type: String },
  phone: { type: Number },
});

module.exports = mongoose.model('Employee', EmployeeSchema);