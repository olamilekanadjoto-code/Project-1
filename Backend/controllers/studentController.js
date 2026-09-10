const Student = require("../model/Student");
const jwt = require("jsonwebtoken");

const createStudent = async (req, res) => {
  try {
    const { name, matric_no, age, gender, department, level } = req.body;
    if (!name) {
      return res.status(400).json("Name field is required");
      console.log("Name is required");
    }
    if (!matric_no) {
      return res.status(400).json("Matric number field is required");
      console.log("Matric number is required");
    }

    const student = new Student({
      name,
      matric_no,
      age,
      gender,
      department,
      level,
    });
    const token = jwt.sign(
      {
        id: student._id,
        matric: student.matric_no,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );
    await student.save();

    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error occured while creating student profile");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students) return res.status(404).json("Students not found");

    res.status(200).json(students);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error while trying to get users");
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { age, level } = req.body;

    const student = await Student.findByIdAndUpdate(id, {
      age,
      level,
    });
    res.status(201).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error while updating student info");
  }
};

const searchStudents = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name)
      return res.status(400).json({ message: "Please Provide a search term" });
    const students = await Student.find({
      name: { $regex: name, $options: "i" },
    });
    if (!students.length === 0) {
      console.log("No results");
      res.status(404).json("No student matches that search ");
    }

    res.status(200).json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error during search");
  }
};

const filterStudents = async (req, res) => {
  try {
    const { department, level } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (level) filter.level = level;

    const students = await Student.find(filter);

    res.status(200).json(students);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error during department filter" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Couldn't delete student" });
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  searchStudents,
  deleteStudent,
  filterStudents,
};
