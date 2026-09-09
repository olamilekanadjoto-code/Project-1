const express = require("express");
const {
  createStudent,
  getStudents,
  updateStudent,
  searchStudents,
  deleteStudent,
  filterStudents,
} = require("../controllers/studentController");
const { sendFeedback } = require("../controllers/FeedbackController");
const router = express.Router();

router.post("/add-student", createStudent);
router.get("/home", getStudents);
router.get("/filter", filterStudents);
router.put("/:id", updateStudent);
router.get("/search", searchStudents);
router.delete("/:id", deleteStudent);
router.post("/feedback", sendFeedback);

module.exports = router;
