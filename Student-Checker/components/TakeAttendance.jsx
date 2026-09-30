import axios from "axios";
import { useState } from "react";
import "../stylesheets/takeAttendance.css";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS = [
  "Medical Sciences",
  "Law and Humanities",
  "Applied Sciences",
  "Commercial Studies",
  "Languages and Linguistics",
];

const LEVELS = ["100", "200", "300", "400", "500"];

function TakeAttendance() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadClass = async () => {
    if (!department || !level) return;
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await axios.get(
        `https://project-1-j62j.onrender.com/students/filter?department=${encodeURIComponent(
          department,
        )}&level=${encodeURIComponent(level)}`,
      );
      setStudents(res.data);
      const defaults = {};
      res.data.forEach((s) => (defaults[s._id] = "present"));
      setStatusMap(defaults);
    } catch (err) {
      console.log(err.message);
      setError("Couldn't load students for this class");
    } finally {
      setLoading(false);
    }
  };

  const setStatus = (id, status) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  };

  const submitAttendance = async (e, s) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const record = {
        studentId: s._id,
        matricNo: s.matricNo,
        status: statusMap[s._id] || "present",
      };

      await axios.post(`https://project-1-j62j.onrender.com/attendance/mark`, {
        records: [record],
        department,
        level,
      });
      setMessage(`Attendance saved for ${s.name} today`);
    } catch (err) {
      console.log(err.message);
      setError("Something went wrong saving attendance");
    }
  };

  return (
    <div className="attendance-component">
      <h4
        className="back-link"
        style={{ position: "relative", left: "4%" }}
        onClick={() => navigate(-1)}
      >
        ◀ Back to profile
      </h4>
      <span className="attendance-intro">
        <h1 className="ai-header">Take Attendance</h1>
      </span>

      <div className="attendance-filters">
        <span>
          <label className="label">Dept :</label>
          <select
            className="dept-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Choose department</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </span>
        <span>
          <label className="label">Level :</label>
          <select
            className="lvl-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Choose level</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </span>
        <button className="ac-btn" type="button" onClick={loadClass}>
          Load Class
        </button>
      </div>

      {message && <p className="attendance-message">{message}</p>}
      {error && <p className="attendance-error">{error}</p>}

      {loading ? (
        <p className="attendance-loading">Loading students...</p>
      ) : students.length > 0 ? (
        students.map((s) => (
          <form
            className="attendance-list"
            key={s._id}
            onSubmit={(e) => submitAttendance(e, s)}
          >
            <div className="attendance-row">
              <span className="attendance-name">
                {s.name}{" "}
                <span className="attendance-matric">({s.matricNo})</span>
              </span>
              <span className="attendance-buttons">
                {["present", "late", "absent"].map((status) => (
                  <button
                    type="button"
                    key={status}
                    className={
                      statusMap[s._id] === status
                        ? `status-btn status-${status} active`
                        : "status-btn"
                    }
                    onClick={() => setStatus(s._id, status)}
                  >
                    {status}
                  </button>
                ))}
              </span>
              <button className="ac-btn save-btn" type="submit">
                Save Attendance
              </button>
            </div>
          </form>
        ))
      ) : (
        department &&
        level && (
          <p className="attendance-empty">
            No students found. Try loading the class.
          </p>
        )
      )}
    </div>
  );
}

export default TakeAttendance;
