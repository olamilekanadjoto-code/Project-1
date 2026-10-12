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
import { useReducer } from "react";

function UpdateStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [names, nameDispatch] = useReducer(
    (names, action) => {
      switch (action.type) {
        case "NEW_FIRST_NAME":
          return { ...names, first: action.value };
        case "NEW_LAST_NAME":
          return { ...names, last: action.value };
      }
    },
    {
      first: "",
      last: "",
    },
  );
  const [passwords, passwordDispatch] = useReducer(
    (passwords, action) => {
      switch (action.type) {
        case "OLD_PASSWORD":
          return { ...passwords, current: action.value };
        case "NEW_PASSWORD":
          return { ...passwords, new: action.value };
      }
    },
    {
      current: "",
      new: "",
    },
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      if (
        !age ||
        !phone ||
        !passwords.current ||
        !passwords.new ||
        !email ||
        !level ||
        !department.trim()
      )
        return window.alert("All fields are required");
      const res = await axios.put(
        `https://project-1-j62j.onrender.com/students/${id}`,
        {
          age,
          names,
          passwords,
          phone,
          email,
          department,
          level,
        },
      );
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
          <button
            type="button"
            style={{
              display: showPassword ? "none" : "block",
              padding: "10px 5px",
              borderColor: "#0c1d3b",
              border: "1px solid",
            }}
            onClick={() => setShowPassword(true)}
          >
            Update password
          </button>
          <button
            type="button"
            style={{
              display: showPassword ? "inline-block" : "none",
              padding: "10px 5px",
              borderColor: "#0c1d3b",
              border: "1px solid",
            }}
            onClick={() => setShowPassword(false)}
          >
            Hide password tab
          </button>
          <span>
            <label className="uf-label">First Name :</label>
            <input
              className="uf-details"
              type="text"
              value={names.first}
              placeholder="Enter new first name"
              onChange={(e) =>
                nameDispatch({ type: "NEW_FIRST_NAME", value: e.target.value })
              }
            />
          </span>
          <span>
            <label className="uf-label">Last Name :</label>
            <input
              className="uf-details"
              type="text"
              value={names.last}
              placeholder="Enter new last name"
              onChange={(e) =>
                nameDispatch({ type: "NEW_LAST_NAME", value: e.target.value })
              }
            />
          </span>
          <span>
            <label className="uf-label">Email :</label>
            <input
              className="uf-details"
              type="email"
              value={email}
              placeholder="Enter new email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span style={{ display: showPassword ? "inline" : "none" }}>
            <label className="uf-label">Current Password :</label>
            <input
              className="uf-details"
              type="password"
              value={passwords.current}
              placeholder="Enter current password"
              onChange={(e) =>
                passwordDispatch({
                  type: "OLD_PASSWORD",
                  value: e.target.value,
                })
              }
            />
          </span>
          <span style={{ display: showPassword ? "inline" : "none" }}>
            <label className="uf-label">New Password :</label>
            <input
              className="uf-details"
              type="password"
              value={passwords.current}
              placeholder="Enter new password"
              onChange={(e) =>
                passwordDispatch({
                  type: "NEW_PASSWORD",
                  value: e.target.value,
                })
              }
            />
          </span>
          <span>
            <label className="uf-label">Phone No :</label>
            <input
              className="uf-details"
              type="text"
              value={phone}
              placeholder="Enter new phone number"
              onChange={(e) => setPhone(e.target.value)}
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
