import axios from "axios";
import { useEffect, useState } from "react";
import "../stylesheets/departments.css";
import "../stylesheets/navbar.css";
import "@fontsource/dm-sans";
import "@fontsource/cal-sans";
import "@fontsource/inter";
import "@fontsource/roboto";
import { useNavigate } from "react-router-dom";

function Department() {
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
                onClick={() => navigate(`/departments/${dept.Id}`)}
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

export default Department;

// < table >
//                 <thead style={{ textAlign: "left" }}>
//                     <tr>
//                         <th>Name</th>
//                         <th>Age</th>
//                         <th>Matric_no</th>
//                         <th>Level</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((s) => (
//                         <tr key={s._id}>
//                             <td>
//                                 <p>
//                                     <strong>{s.name?.[0]}</strong>
//                                     {s.name}
//                                 </p>
//                             </td>
//                             <td>{s.age}</td>
//                             <td>{s.matric_no}</td>
//                             <td>{s.level}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table >

// Medical - The department explores areas such as anatomy, physiology, biochemistry, pathology, pharmacology, and related health sciences. Its central purpose is to build a strong scientific foundation for students who want to understand how the body functions, how diseases develop, and how evidence-based healthcare can improve human life.

// Comm -  The department explores areas such as accounting, management, marketing, entreneurship, economics, and business administration. It prepares students to understand how organizations operate, how markets function, and how financial and managerial decisions are made. The emphasis is on developing practical business knowledge, analytical thinking, and skills needed to participate effectively in the commercial world.

// Law -  Law focuses on justice, rights, legal institutions, interpretation, and the rules that govern individuals and communities. Humanites broadens this perspective through subjects such as history, philosophy, literature, culture, and human thought. Together, the department develops critical thinking, communication, ethical reasoning, and a deeper understanding of people, society, and civilization.

// Applied -  Rather than studying science only in theory, the department connects concepts from fields such as technology, environmental science, computing, engineering-related disciplines, other applied areas to real-world needs. Its goal is to develop analytical, technical, and problem-solving skills that enable students to transform scientific ideas into practical applications that benefit society and industry.

// Lang -The department explores how languages are formed, learned, spoken, interpreted, and transformed across different societies and cultures. It may cover areas such as grammar, phonetics, phonology, semantics, translation, literature, and language acquisition. Its core purpose is to develop strong communication skills while helping students understand the complex systems and cultural dimensions behind human language.
