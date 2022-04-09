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
  department: { type: String},
  tags: [],
  date: {
    type: Date,
    default: new Date().toUTCString()
  }
  

});

module.exports = mongoose.model('Employee', EmployeeSchema);