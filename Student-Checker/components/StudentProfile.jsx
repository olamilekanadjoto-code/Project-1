import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confirmation from "../src/ActionConfirmation";
import "../stylesheets/studentProfile.css";
import "@fontsource/cal-sans";
import "@fontsource/dm-sans";
import "@fontsource/inter";
import "@fontsource/poppins";
import "@fontsource/nunito-sans";
import "@fontsource/roboto";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [dropDown, setDropDown] = useState(false);
  const [missingDays, setMissingDays] = useState(0);

  useEffect(() => {
    const getStudentById = async () => {
      const token = await localStorage.getItem("token");
      try {
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/students/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setStudent(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getMissingDays = async () => {
      try {
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/attendance/student/${id}`,
        );
        // late counts as present -- only "absent" days are missing days
        const absentDays = res.data.filter(
          (record) => record.status === "absent",
        ).length;
        setMissingDays(absentDays);
      } catch (err) {
        console.log(err.message);
      }
    };

    getStudentById();
    getMissingDays();
  }, []);

  return (
    <>
      <div className="profile-component">
        <span className="pc-intro">
          <span className="pi-header">
            <span className="pi-avatar">{student.name?.slice(0, 2)}</span>
            <h1 className="pi-name">{student.name}</h1>
          </span>
          <h5 className="pi-dept">
            {student.department} ● {student.level} Level
          </h5>
          <span className="actions-tab">
            <button
              className="action-btn"
              onClick={() => navigate(`/edit-info/${id}`)}
            >
              <svg
                className="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
              Edit
            </button>

            <button
              className="action-btn action-btn--danger"
              onClick={() => setDropDown(true)}
            >
              <svg
                className="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
              Delete
            </button>

            <button
              className="action-btn"
              onClick={() => navigate("/take-attendance")}
            >
              <svg
                className="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Mark attendance
            </button>
            <button
              className="action-btn"
              onClick={() => navigate(`/attendance/${id}`)}
            >
              <svg
                className="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Attendance History
            </button>
          </span>
        </span>
        <span className="info-grid">
          <span className="info-box">
            <h5 className="ib-header">Name</h5>
            <h6 className="ib-value">{student.name}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Email</h5>
            <h6 className="ib-value">{student.email}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Phone No.</h5>
            <h6 className="ib-value">{student.phone}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Gender</h5>
            <h6 className="ib-value ib-value--gender">{student.gender}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Age</h5>
            <h6 className="ib-value">{student.age}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Department</h5>
            <h6 className="ib-value">{student.department}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Matric No</h5>
            <h6 className="ib-value">{student.matricNo}</h6>
          </span>
          <span className="info-box">
            <h5 className="ib-header">Missing Days</h5>
            <h6 className="ib-value">{missingDays}</h6>
          </span>
        </span>
        <span
          className={
            dropDown ? "displayed-confirmation" : "hidden-confirmation"
          }
        >
          <h3
            style={{ display: dropDown ? "block" : "none", zIndex: "301" }}
            className="close-confirmation-btn"
            onClick={() => setDropDown(false)}
          >
            ❌
          </h3>
          {dropDown && <Confirmation />}
        </span>
      </div>
    </>
  );
}

export default StudentProfile;
