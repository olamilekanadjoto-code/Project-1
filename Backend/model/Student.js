const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  gender: String,
  age: Number,
  department: {
    type: String,
    enum: [
      "Medical Sciences",
      "Law and Humanities",
      "Applied Sciences",
      "Commercial Studies",
      "Languages and Linguistics",
    ],
  },
  level: {
    type: String,
    enum: ["100", "200", "300", "400", "500"],
  },
  matricNo: {
    type: String,
    required: true,
    unique: true,
  },
  fee: {
    type: Number,
    default: 0,
  },
  paidFee: {
    type: Number,
  },
});

const Student = mongoose.model("Student", userSchema);

module.exports = Student;
