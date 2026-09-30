import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../stylesheets/addStudent.css";
import "@fontsource/roboto";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import "@fontsource/cal-sans";
import "@fontsource/inter";

function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(Number);
  const [error, setError] = useState("");

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      if (!age || !name || !phone || !email || !level || !department.trim())
        return window.alert("All fields are required");
      const res = await axios.post(
        `https://project-1-j62j.onrender.com/students/add-student`,
        { name, email, phone, password, age, gender, department, level },
      );
      setName("");
      setDepartment("");
      setEmail("");
      setPhone("");
      setLevel("");
      setGender("");
      setPassword("");
      setAge("");
      navigate("/home");
    } catch (err) {
      console.log(err.message);
      setError("Add student failed due to unexpected error");
    }
  };

  return (
    <>
      <div className="add-component">
        <h4
          className="back-link"
          style={{ position: "relative", left: "4%" }}
          onClick={() => navigate(-1)}
        >
          ◀ Go back
        </h4>
        <span className="add-intro">
          <h1 className="ai-header">Add Student</h1>
        </span>
        <form className="userForm" onSubmit={addStudent}>
          <h4 style={{ color: "red", fontFamily: "Poppins" }}>{error}</h4>
          <span>
            <label className="label">Name :</label>
            <input
              className="ac-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name "
            />
          </span>
          <span>
            <label className="label">Email :</label>
            <input
              className="ac-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </span>
          <span>
            <label className="label">Phone No. :</label>
            <input
              className="ac-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </span>
          <span>
            <label className="label">Password :</label>
            <input
              className="ac-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </span>
          <span>
            <label className="label">Age :</label>
            <input
              className="ac-input"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </span>
          <span>
            <label className="label">Gender :</label>
            <select
              className="gender-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              id="select"
            >
              <option value="">I prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </span>
          <span>
            <label className="label">Dept :</label>
            <select
              className="dept-select"
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
            <label className="label">Level :</label>
            <select
              className="lvl-select"
              name="level"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Choose your current level</option>
              <option value="100">100 </option>
              <option value="200">200 </option>
              <option value="300">300 </option>
              <option value="400">400 </option>
              <option value="500">500+</option>
            </select>
          </span>
          <button className="ac-btn" type="submit">
            Add Student
          </button>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
