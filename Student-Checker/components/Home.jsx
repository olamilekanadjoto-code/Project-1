import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../stylesheets/home.css";
import "@fontsource/cal-sans";
import "@fontsource/nunito-sans";
import "@fontsource/inter";
import "@fontsource/poppins";
import logo from "../src/assets/kestrel-college-crest.svg";
import LoginComponent from "./Login";

function Home() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [department, setDept] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [error, setError] = useState("");
  const [filterMessage, setFilterMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [confirmation, setConfirmation] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const drop = async () => {
      await setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    };
    drop();
  }, []);
  useEffect(() => {
    setLoading(false);
    const AllStudents = async () => {
      try {
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/students/home`,
        );
        setStudents(res.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };
    AllStudents();
  }, []);

  const Search = async () => {
    if (!searchTerm.trim()) {
      // empty search box -- fall back to the unfiltered list
      setLoading(true);
      try {
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/students/home`,
        );
        setStudents(res.data);
        setFilterMessage("");
        setCurrentPage(1);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://project-1-j62j.onrender.com/students/search`,
        {
          params: { name: searchTerm },
        },
      );
      setStudents(res.data);
      setCurrentPage(1);
      setFilterMessage(
        res.data.length === 0 ? `No students match "${searchTerm}"` : "",
      );
    } catch (err) {
      console.error(err.message);
      setStudents([]);
      setFilterMessage(`No students match "${searchTerm}"`);
    } finally {
      setLoading(false);
    }
  };

  const Filter = async () => {
    setLoading(true);
    try {
      const params = {};
      if (department) params.department = department;
      if (level) params.level = level;
      const res = await axios.get(
        `https://project-1-j62j.onrender.com/students/filter`,
        {
          params,
        },
      );
      setStudents(res.data);
      setCurrentPage(1); // reset to page 1 whenever filters change
      if (res.data.length === 0) {
        if (level && department) {
          setFilterMessage(
            `There are no ${level} level students studying ${department}`,
          );
        } else if (level) {
          setFilterMessage(`There are no ${level} level students`);
        } else if (department) {
          setFilterMessage(`There are no students studying ${department}`);
        }
      } else {
        setFilterMessage("");
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    try {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleSelectAll = () => {
    try {
      setSelected(
        selected.length === students.length ? [] : students.map((s) => s._id),
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // Pagination derived values
  const totalPages = Math.ceil(students.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedStudents = students.slice(startIndex, startIndex + perPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="home-Body">
        <div className="home-billboard">
          <img src={logo} alt="ots-logo" className="img" />
          <span className="billboard-text">
            <h1>KESTREL COLLEGE</h1>
          </span>
        </div>
        <span className="top">
          <span className="left">
            <h1 className="left-header">
              <i className="bi bi-person-circle"></i> Students
            </h1>
          </span>
          <span className="search-wrapper">
            <input
              type="text"
              className="student-search"
              placeholder="Search students by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && Search()}
            />
            <button className="search-btn" onClick={Search} type="button">
              <i className="bi bi-search"></i>
            </button>
          </span>
        </span>
        <div className="table-et-filter">
          <div className="filter-section">
            <span className="select">
              <span className="select-wrapper">
                <select
                  className="displayed-level"
                  name="level"
                  id="level"
                  value={level}
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                  onClick={Filter}
                >
                  <option value="">All Levels</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500+</option>
                </select>
              </span>
              <span className="select-wrapper">
                <select
                  className="displayed-dept"
                  name="department"
                  id="department"
                  value={department}
                  onChange={(e) => {
                    setDept(e.target.value);
                  }}
                  onClick={Filter}
                >
                  <option value="">All Departments</option>
                  <option value="Medical Sciences">Medical Sciences</option>
                  <option value="Law and Humanities">Law and Humanities</option>
                  <option value="Applied Sciences">Applied Sciences</option>
                  <option value="Commercial Studies">Commercial Studies</option>
                  <option value="Languages & Linguistics">
                    Languages & Linguistics
                  </option>
                </select>
              </span>
            </span>
          </div>
          <span className={open ? "hover-info" : "hover-info-closed"}>
            <h3 className="hi-text">
              Click on student name to login to profile
            </h3>
          </span>
          <div className="student-table-wrapper">
            <table className="student-table">
              <colgroup>
                <col className="col-student" />
                <col className="col-email" />
                <col className="col-dept" />
                <col className="col-compact" />
                <col className="col-compact" />
                <col className="col-compact" />
              </colgroup>
              <thead>
                <tr className="table-head-row">
                  <th className="table-head">Student </th>
                  <th className="table-head">Email </th>
                  <th className="table-head">Department </th>
                  <th className="table-head">Gender </th>
                  <th className="table-head table-head-compact">Age </th>
                  <th className="table-head table-head-compact">Level </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="loading-row">
                      Loading...
                    </td>
                  </tr>
                ) : filterMessage ? (
                  <tr>
                    <td colSpan="7" className="no-students">
                      {filterMessage}
                    </td>
                  </tr>
                ) : paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-students">
                      No students yet — add your first one!
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((student) => (
                    <tr
                      key={student._id}
                      className={
                        selected.includes(student._id) ? "selected-row" : ""
                      }
                    >
                      <td
                        className="t-student"
                        onClick={() => setDropDown(true)}
                      >
                        <div className="student">
                          <span className="student-name">
                            <h4 className="name">{student.name}</h4>
                          </span>
                        </div>
                      </td>
                      <td className="td td-email">{student.email}</td>
                      <td className="dept-div">{student.department}</td>
                      <td className="td td-compact td-capitalize">
                        {student.gender?.[0]}
                      </td>
                      <td className="td td-compact">{student.age}</td>
                      <td className="td td-compact">{student.level}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!loading && !filterMessage && totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`page-btn ${page === currentPage ? "active" : ""}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={dropDown ? "home-modal" : "home-modal-closed"}>
          <span
            className={dropDown ? "lc-close-btn" : "lc-close-btn-hidden"}
            onClick={() => setDropDown(false)}
          >
            Close
          </span>
          <span>{dropDown && <LoginComponent />}</span>
        </div>
      </div>
    </>
  );
}

export default Home;

// <td className="actions-cell">
//   <span
//     onClick={() => {
//       setOpenMenu(
//         openMenu === student._id ? null : student._id,
//       );
//     }}
//   >
//     ...
//   </span>
//   {openMenu === student._id && (
//     <div className="dropdown-menu">
//       <Link to={`/edit-info/${student._id}`}>
//         <button className="edit-btn">
//           <i className="bi bi-pencil-square"></i> Edit
//         </button>
//       </Link>
//       <button
//         onClick={() => {
//           deleteStudent(student._id);
//           setStudents((prev) =>
//             prev.filter((s) => s._id !== student._id),
//           );
//         }}
//         className="delete-btn"
//       >
//         {" "}
//         <i className="bi bi-trash3-fill"></i>
//         &nbsp;&nbsp;Delete
//       </button>
//     </div>
//   )}
// </td>
