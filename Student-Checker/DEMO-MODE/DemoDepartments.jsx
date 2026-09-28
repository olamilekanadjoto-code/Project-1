import axios from "axios";
import { useEffect, useState } from "react";
import "../stylesheets/departments.css";
import "../stylesheets/navbar.css";
import "@fontsource/dm-sans";
import "@fontsource/cal-sans";
import "@fontsource/inter";
import "@fontsource/roboto";
import { useNavigate } from "react-router-dom";

function DemoDepartment() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [level, setLevel] = useState("");

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const res = await axios.get(
          "https://project-1-j62j.onrender.com/departments",
        );
        setDepartments(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getDepartments();
  }, []);

  // const deptFilter = () => {
  //   const filtered = students.filter((student) => {
  //     return student.department == department;
  //   });
  // };
  // const lvlFilter = () => {
  //   const filtered = students.filter((student) => {
  //     return student.level == level;
  //   });
  // };

  return (
    <>
      <div className="dept-component">
        <span className="main">
          <h1 className="main-header">Departments</h1>
          <h3 className="main-description">Every department, at a glance</h3>
        </span>

        <div className="dept-grid">
          {departments.map((dept) => (
            <div className="dept-box" key={dept.Id}>
              <span className="dept-slider">
                <span className="slider">{dept.code}</span>
                <h2 className="dept-header">{dept.name}</h2>
                <h4 className="dh-mini">{dept.subtitle}</h4>
              </span>
              <p className="description">{dept.description}</p>
              <span
                className="dept-link"
                onClick={() => navigate(`/demo-departments/${dept.Id}`)}
              >
                <h5>{dept.studentCount} Students</h5>
                <h6>▶</h6>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DemoDepartment;
