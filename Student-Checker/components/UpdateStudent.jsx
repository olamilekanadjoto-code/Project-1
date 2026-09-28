import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/updateStudent.css";
import "@fontsource/roboto";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import "@fontsource/cal-sans";
import "@fontsource/inter";

function UpdateStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(null);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      if (!age || !name || !email || !level || !department.trim())
        return window.alert("All fields are required");
      const res = await axios.put(
        `https://project-1-j62j.onrender.com/students/${id}`,
        {
          age,
          name,
          email,
          department,
          level,
        },
      );
      console.log(res.data);
      navigate(`/students/${id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="update-component">
        <h4
          className="back-link"
          style={{ position: "relative", left: "4%" }}
          onClick={() => navigate(-1)}
        >
          ◀ Back to profile
        </h4>
        <span className="update-intro">
          <h1 className="ui-header">Update Student</h1>
          <h3 className="ui-description">
            Students can only update age and level as per our policies
          </h3>
        </span>
        <form onSubmit={updateStudent} className="update-form">
          <span>
            <label className="uf-label">Name :</label>
            <input
              className="uf-details"
              type="text"
              value={name}
              placeholder="Enter new name"
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span>
            <label className="uf-label">Email :</label>
            <input
              className="uf-details"
              type="text"
              value={email}
              placeholder="Enter new email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span>
            <label className="uf-label">Age :</label>
            <input
              className="uf-details"
              type="number"
              placeholder="Enter new age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </span>
          <span>
            <label className="uf-label">Dept :</label>
            <select
              className="dept-select-uf"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              name="department"
              id="select"
            >
              <option value="">Choose department of study</option>
              <option value="Medical Sciences">Medical Sciences</option>
              <option value="Law and Humanities">Law and Humanities</option>
              <option value="Applied Sciences">Applied Sciences</option>
              <option value="Commercial Studies">Commercial Studies</option>
              <option value="Languages and Linguistics">
                Languages and Linguistics
              </option>
            </select>
          </span>
          <span>
            <label className="uf-label">Level :</label>
            <select
              className="lvl-select-uf"
              name="newLevel"
              id="newLevel"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Choose your current level</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500+</option>
            </select>
          </span>
          <button className="uf-btn" type="submit">
            Update
          </button>
        </form>
        <span className="uc-notice">
          <h3 className="notice">
            A student's name, matric_no, password, and gender cannot be
            changed{" "}
          </h3>
        </span>
      </div>
    </>
  );
}

export default UpdateStudent;
