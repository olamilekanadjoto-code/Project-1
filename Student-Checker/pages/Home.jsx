import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../stylesheets/home.css";
import "@fontsource/cal-sans";
import "@fontsource/nunito-sans";
import "@fontsource/inter";
import "@fontsource/poppins";

function Home() {
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

  useEffect(() => {
    setLoading(false);
    const AllStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:2468/students/home`);
        setStudents(res.data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };
    AllStudents();
  }, []);

  const Filter = async () => {
    setLoading(true);
    try {
      const params = {};
      if (department) params.department = department;
      if (level) params.level = level;
      const res = await axios.get(`http://localhost:2468/students/filter`, {
        params,
      });
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

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:2468/students/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      console.log(err.message);
      setError(err.message);
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

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="home-Body">
        <div className="home-billboard">
          <img src="../src/assets/kestrel-college-crest.svg" alt="ots-logo" />
          <span className="billboard-text">
            <h1>KESTREL COLLEGE</h1>
            <p>
              Welcome Sir/Ma, Are you ready to turn your dreams into
              reality{" "}
            </p>
          </span>
          <span className="billboard-pryText">
            <p>
              Check out our students, their courses and level in the table below
            </p>
            <h5>You can create, view, and edit students' info</h5>
          </span>
        </div>
        <span className="top">
          <span className="left">
            <h1 className="left-header">
              <i className="bi bi-person-circle"></i> Students
            </h1>
          </span>
          <span className="right">
            <Link className="link" to="/add-student">
              <button className="add-btn">
                <i className="bi bi-person-fill-add"></i> Add Student
              </button>
            </Link>
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
          <div className="student-table-wrapper">
            <table className="student-table">
              <thead>
                <tr className="table-head-row">
                  <th className="table-head">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === students.length &&
                        students.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="table-head">Student ⇕</th>
                  <th className="table-head">Matric No. ⇕</th>
                  <th className="table-head">Age ⇕</th>
                  <th className="table-head">Department ⇕</th>
                  <th className="table-head">Level ⇕</th>
                  <th className="table-head">Actions ⇕</th>
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
                ) : (
                  paginatedStudents.map((student) => (
                    <tr
                      key={student._id}
                      className={
                        selected.includes(student._id) ? "selected-row" : ""
                      }
                    >
                      <td style={{ width: "10px" }}>
                        <input
                          type="checkbox"
                          checked={selected.includes(student._id)}
                          onChange={() => toggleSelect(student._id)}
                        />
                      </td>
                      <td className="t-student" style={{ width: "250px" }}>
                        <div className="student">
                          <span className="student-name">
                            <strong className="avatar">
                              {student.name?.[0]}
                            </strong>
                            <h4 className="name">{student.name}</h4>
                          </span>
                        </div>
                      </td>
                      <td className="td">{student.matric_no}</td>
                      <td className="td">{student.age}</td>
                      <td className="dept-div">{student.department}</td>
                      <td className="td">{student.level}</td>
                      <td className="actions-cell">
                        <span
                          onClick={() =>
                            setOpenMenu(
                              openMenu === student._id ? null : student._id,
                            )
                          }
                        >
                          ...
                        </span>
                        {openMenu === student._id && (
                          <div className="dropdown-menu">
                            <Link to={`/edit-info/${student._id}`}>
                              <button className="edit-btn">
                                <i className="bi bi-pencil-square"></i> Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => deleteStudent(student._id)}
                              className="delete-btn"
                            >
                              {" "}
                              <i className="bi bi-trash3-fill"></i>
                              &nbsp;&nbsp;Delete
                            </button>
                          </div>
                        )}
                      </td>
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
      </div>
    </>
  );
}

export default Home;
