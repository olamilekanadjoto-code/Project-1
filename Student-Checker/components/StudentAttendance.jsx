import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/studentAttendance.css";
import "@fontsource/poppins";
import "@fontsource/inter";

function StudentAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/attendance/student/${id}`,
        );
        setRecords(res.data);
      } catch (err) {
        console.log(err.message);
        setError("Couldn't load attendance history");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [id]);

  const presentCount = records.filter((r) => r.status === "present").length;
  const rate =
    records.length > 0
      ? Math.round((presentCount / records.length) * 100)
      : null;

  if (error) return <p className="attendance-error">{error}</p>;

  return (
    <div className="student-attendance-component">
      <h4
        className="back-link"
        style={{ position: "relative", left: "4%" }}
        onClick={() => navigate(-1)}
      >
        ◀ Back to profile
      </h4>
      <span className="sa-intro">
        <h1 className="ai-header">Attendance Record</h1>
        {rate !== null && <p className="sa-rate">{rate}% present</p>}
      </span>

      {loading ? (
        <p className="attendance-loading">Loading...</p>
      ) : records.length === 0 ? (
        <p className="attendance-empty">No attendance recorded yet.</p>
      ) : (
        <div className="sa-list">
          {records.map((r) => (
            <div className="sa-row" key={r._id}>
              <span className="sa-date">
                {new Date(r.date).toLocaleDateString()}
              </span>
              <span className={`sa-status sa-status-${r.status}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentAttendance;
