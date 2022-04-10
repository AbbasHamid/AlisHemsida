const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  lastName: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  personNummer: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
