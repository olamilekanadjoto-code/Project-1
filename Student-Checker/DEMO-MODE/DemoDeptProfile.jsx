import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../stylesheets/departments.css";
import "../stylesheets/departmentPage.css";
import "@fontsource/dm-sans";
import "@fontsource/inter";
import "@fontsource/roboto";

function DepartmentPage() {
  const { deptId } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedStudents, setDisplayedStudents] = useState([]);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/departments/${deptId}`,
        );
        setDepartment(res.data);
        setDisplayedStudents(res.data.students);
      } catch (err) {
        console.error(err.message);
        setError("Department not found");
      } finally {
        setLoading(false);
      }
    };
    getDepartment();
  }, [deptId]);

  const Search = async () => {
    if (!searchTerm.trim()) {
      // empty search box -- fall back to this department's full roster
      setDisplayedStudents(department.students);
      return;
    }
    try {
      const res = await axios.get(
        `https://project-1-j62j.onrender.com/students/search`,
        {
          params: { name: searchTerm },
        },
      );
      // the search endpoint isn't department-scoped, so filter results
      // down to students who belong to this department
      const scoped = res.data.filter((s) => s.department === department.name);
      setDisplayedStudents(scoped);
    } catch (err) {
      console.error(err.message);
      setDisplayedStudents([]);
    }
  };

  if (loading) return <p className="dept-page-status">Loading department...</p>;
  if (error) return <p className="dept-page-status">{error}</p>;

  return (
    <div className="dept-page">
      <h4 className="back-link" onClick={() => navigate("/departments")}>
        ◀ Departments
      </h4>
      <span className="dept-profile-slider">
        <span className="profile-slider">{department.code}</span>
        <h1 className="dept-profile-header">{department.name}</h1>
        <h4 className="dh-mini">{department.subtitle}</h4>
      </span>
      <p className="description dept-page-description">
        {department.description}
      </p>

      <span className="dept-search-wrapper">
        <input
          type="text"
          className="dept-search"
          placeholder="Search students in this department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && Search()}
        />
        <button className="dept-search-btn" onClick={Search} type="button">
          <i className="bi bi-search"></i>
        </button>
      </span>

      <h3 className="dept-page-students-heading">Students</h3>
      {displayedStudents.length === 0 ? (
        <p className="dept-page-empty">
          {searchTerm
            ? `No students match "${searchTerm}" in this department.`
            : "No students in this department yet."}
        </p>
      ) : (
        <div className="dept-table-wrapper">
          <table className="dept-page-table">
            <colgroup>
              <col className="dpt-col-name" />
              <col className="dpt-col-email" />
              <col className="dpt-col-compact" />
              <col className="dpt-col-compact" />
              <col className="dpt-col-compact" />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th className="dpt-th-compact">Age</th>
                <th className="dpt-th-compact">Level</th>
                <th className="dpt-th-compact">Gender</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((s) => (
                <tr key={s._id}>
                  <td className="d-name">{s.name}</td>
                  <td className="dpt-td-email">{s.phone}</td>
                  <td className="dpt-td-compact dpt-td-capitalize">{s.age}</td>
                  <td className="dpt-td-compact">{s.level}</td>
                  <td className="dpt-td-compact dpt-td-capitalize">
                    {s.gender}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DepartmentPage;
