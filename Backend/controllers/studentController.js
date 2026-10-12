const Student = require("../model/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateUniqueMatricNo } = require("../utils/generateMatricNo");
const { TUITION } = require("../model/Tuition");

const createStudent = async (req, res) => {
  try {
    const { name, email, phone, password, age, gender, department, level } =
      req.body;
    if (!name.first) {
      return res.status(400).json("First name field is required");
      console.log("First name is required");
    }
    if (!name.last) {
      return res.status(400).json("Last name field is required");
      console.log("Last name is required");
    }
    if (!email) {
      console.log("Email is required");
      return res.status(400).json("Email field is required");
    }
    if (!phone) {
      console.log("Phone is required");
      return res.status(400).json("Phone field is required");
    }
    if (!password) {
      console.log("Password is required");
      return res.status(400).json("Password field is required");
    }

    const fullName = `${name.first} ${name.last}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const matricNo = await generateUniqueMatricNo(Student);
    const paidFee = 0;

    const prefix = Object.keys(TUITION).find((p) => department?.startsWith(p));

    const fee = TUITION[prefix];

    const student = new Student({
      fullName,
      firstName: name.first,
      lastName: name.last,
      email,
      phone,
      password: hashedPassword,
      age,
      gender,
      department,
      level,
      matricNo,
      fee,
      paidFee,
    });
    await student.save();

    res.status(200).json("Student Profile Created");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error occured while creating student profile");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    // if (students) return res.status(404).json("Students not found");

    res.status(200).json(students);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server error while trying to get users");
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "Error while fetching student by id" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const comparePassword = await bcrypt.compare(password, student.password);
    if (!comparePassword) return res.status(400).json("Incorrect Password");

    const token = jwt.sign(
      {
        id: student._id,
        age: student.age,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    res.status(200).json(token);
  } catch (err) {
    console.error(err.message);
  }
};

const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  (typeof v === "string" && v.trim() === "") ||
  (typeof v === "number" && Number.isNaN(v));

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { age, names, passwords, email, department, level } = req.body;

    const updates = {};

    if (!isEmpty(age)) updates.age = age;
    if (!isEmpty(names?.first)) updates.firstName = names.first.trim();
    if (!isEmpty(names?.last)) updates.lastName = names.last.trim();
    if (!isEmpty(email)) updates.email = email.trim();
    if (!isEmpty(level)) updates.level = level;

    if (!isEmpty(department)) {
      updates.department = department;
      const prefix = Object.keys(TUITION).find((p) => department.startsWith(p));
      if (prefix) updates.fee = TUITION[prefix];
    }

    const fullName = `${updates.firstName} ${updates.lastName}`;

    // Password changes only when a new one is supplied
    if (!isEmpty(passwords?.new)) {
      const studentForPass = await Student.findById(id);
      if (!studentForPass) return res.status(404).json("Student not found");

      const passCompare = await bcrypt.compare(
        passwords.current || "",
        studentForPass.password,
      );
      if (!passCompare) return res.status(400).json("Incorrect Password");

      updates.password = await bcrypt.hash(passwords.new, 10);
    }
    updates.fullName = fullName;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json("Nothing to update");
    }

    const student = await Student.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    });
    if (!student) return res.status(404).json("Student not found");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchStudents = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name)
      return res.status(400).json({ message: "Please Provide a search term" });
    const students = await Student.find({
      fullName: { $regex: name, $options: "i" },
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

const studentConfirmation = async (req, res) => {
  try {
    const { matricNo } = req.body;
    const student = await Student.findOne({ matricNo });

    if (!student)
      return res.status(404).json({ message: "MatricNo is incorrect" });

    res.status(200).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Delete confirmation failed" });
  }
};

const updateFeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountPaid } = req.body;

    const amount = Number(String(amountPaid).replace(/,/g, ""));

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    const student = await Student.findById(id);

    const newPaidFee = Math.trunc((student.paidFee ?? 0) + amount);

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        paidFee: newPaidFee,
      },
      { returnDocument: true },
    );

    res.status(201).json({ message: "Payment received successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error while paying fees" });
    console.error(err.message);
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
  getStudentById,
  updateStudent,
  searchStudents,
  updateFeeStatus,
  deleteStudent,
  filterStudents,
  loginStudent,
  studentConfirmation,
};
