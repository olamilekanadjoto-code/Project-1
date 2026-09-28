const { DEPARTMENTS } = require("../model/Departments");
const Student = require("../model/Student");

const getDepartments = async (req, res) => {
  try {
    const departmentsWithCounts = await Promise.all(
      DEPARTMENTS.map(async (dept) => {
        const studentCount = await Student.countDocuments({
          department: dept.name,
        });
        return { ...dept, studentCount };
      }),
    );
    res.status(200).json(departmentsWithCounts);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal Server Error At Dept. Controller" });
  }
};

const DeptFetch = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DEPARTMENTS.find((dept) => dept.Id === id);

    if (!department) {
      return res.status(400).json({ message: "Department doesn't exist" });
    }
    const students = await Student.find({ department: department.name });
    res.status(200).json({ ...department, students });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Internal Server Error At Dept. Controller" });
  }
};

module.exports = { DeptFetch, getDepartments };
