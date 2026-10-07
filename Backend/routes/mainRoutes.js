const express = require("express");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  searchStudents,
  deleteStudent,
  filterStudents,
  loginStudent,
  studentConfirmation,
} = require("../controllers/studentController");
const { sendFeedback } = require("../controllers/FeedbackController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/add-student", createStudent);
router.get("/home", getStudents);
router.post("/login", loginStudent);
router.get("/filter", filterStudents);
router.get("/search", searchStudents);
router.post("/confirm", studentConfirmation);
router.post("/feedback", sendFeedback);
router.put("/payment/:id", updateFeeStatus);
router.get("/:id", verifyToken, getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
module.exports = router;
