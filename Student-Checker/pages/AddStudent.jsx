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
  const [department, setDepartment] = useState("");
  const [matric_no, setMatric_no] = useState("");
  const [level, setLevel] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://project-1-j62j.onrender.com/students/add-student`,
        { name, matric_no, age, gender, department, level },
      );
      setName("");
      setDepartment("");
      setMatric_no("");
      setLevel("");
      setGender("");
      setAge("");
      console.log(res.data);
      localStorage.setItem("token", res.data);
      const token = await jwtDecode(res.data);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };
  // if (error) return <p>{error}</p>;

  return (
    <>
      <div className="add-component">
        <span className="add-intro">
          <h1 className="ai-header">Add Student</h1>
        </span>
        <form className="userForm" onSubmit={addStudent}>
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
            <label className="label">Matric_no :</label>
            <input
              className="ac-input"
              type="text"
              value={matric_no}
              onChange={(e) => setMatric_no(e.target.value)}
              placeholder="Enter your matric_no"
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
              <option value="">Custom</option>
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
