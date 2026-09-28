const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  matricNo: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: [
      "Medical Sciences",
      "Law and Humanities",
      "Applied Sciences",
      "Commercial Studies",
      "Languages and Linguistics",
    ],
    required: true,
  },
  level: {
    type: String,
    enum: ["100", "200", "300", "400", "500"],
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date(new Date().toDateString()), // normalized to midnight
  },
});

// one record per student per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
