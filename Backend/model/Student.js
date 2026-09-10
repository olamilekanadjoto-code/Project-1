const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matric_no: { type: String, required: true, unique: true },
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
});

const Student = mongoose.model("Student", userSchema);

module.exports = Student;
