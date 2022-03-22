const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstNameS: { type: String },
  lastNameS: { type: String },

  usernameS: {
    type: String,
    required: true,
    unique: true,
  },
  emailS: {
    type: String,
    required: true,
    unique: true,
  },
  passwordS: {
    type: String,
    required: true,
  },
  age: { type: Number },
  address: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("UserS", userSchema);
