const express = require("express");
const {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  updateAttendance,
} = require("../controllers/AttendanceController");

const attendanceRouter = express.Router();

attendanceRouter.post("/mark", markAttendance);
attendanceRouter.get("/class", getAttendanceByClass);
attendanceRouter.get("/student/:id", getAttendanceByStudent);
attendanceRouter.put("/:id", updateAttendance);

module.exports = attendanceRouter;
