const Attendance = require("../model/Attendance");

// Normalize any incoming date to midnight, matching the model default
function normalizeDate(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  return new Date(d.toDateString());
}

// POST /attendance/mark
// body: { records: [{ studentId, matricNo, status }], department, level, date? }
const markAttendance = async (req, res) => {
  try {
    const { records, department, level, date } = req.body;

    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: "records array is required" });
    }
    if (!department || !level) {
      return res
        .status(400)
        .json({ message: "department and level are required" });
    }

    const day = normalizeDate(date);

    const results = await Promise.all(
      records.map((r) =>
        Attendance.findOneAndUpdate(
          { student: r.studentId, date: day },
          {
            student: r.studentId,
            matricNo: r.matricNo,
            department,
            level,
            status: r.status,
            date: day,
          },
          { upsert: true, returnDocument: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    res.status(200).json(results);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error while marking attendance" });
  }
};

// GET /attendance/student/:id
const getAttendanceByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const records = await Attendance.find({ student: id }).sort({ date: -1 });

    res.status(200).json(records);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Server error while fetching student attendance" });
  }
};

// GET /attendance/class?department=..&level=..&date=..
const getAttendanceByClass = async (req, res) => {
  try {
    const { department, level, date } = req.query;

    if (!department || !level) {
      return res
        .status(400)
        .json({ message: "department and level are required" });
    }

    const filter = { department, level };
    if (date) filter.date = normalizeDate(date);

    const records = await Attendance.find(filter).populate("student", "name");

    res.status(200).json(records);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Server error while fetching class attendance" });
  }
};

// PUT /attendance/:id
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const record = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!record) return res.status(404).json({ message: "Record not found" });

    res.status(200).json(record);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Server error while updating attendance record" });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByClass,
  updateAttendance,
};
