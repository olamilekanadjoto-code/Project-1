import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import "../stylesheets/home.css"
import "@fontsource/cal-sans"
import "@fontsource/nunito-sans"
import "@fontsource/inter"
import "@fontsource/poppins"


function Home() {
    const [students, setStudents] = useState([]);
    const [department, setDept] = useState("")
    const [level, setLevel] = useState("")
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState([])
    const [openMenu, setOpenMenu] = useState(null)
    const [error, setError] = useState("")
    const [filterMessage, setFilterMessage] = useState("")

    useEffect(() => {
        setLoading(false)
        const AllStudents = async () => {
            try {
                const res = await axios.get(`http://localhost:2468/students/home`)
                setStudents(res.data)
            } catch (err) {
                console.error(err.message)
                setError(err.message)
            }
        }
        AllStudents()
    }, [])

    const Filter = async () => {
        setLoading(true)
        try {
            const params = {}
            if (department) params.department = department
            if (level) params.level = level
            const res = await axios.get(`http://localhost:2468/students/filter`, { params })
            setStudents(res.data)
            if (res.data.length === 0) {
                if (level && department) {
                    setFilterMessage(
                        `There are no ${level} level students studying ${department}`
                    );
                } else if (level) {
                    setFilterMessage(
                        `There are no ${level} level students`
                    );
                } else if (department) {
                    setFilterMessage(
                        `There are no students studying ${department}`
                    );
                }
            } else {
                setFilterMessage("")
            }
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }



    }


    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:2468/students/${id}`)
            setStudents((prev) => prev.filter((student) =>
                student._id !== id
            ))
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
    }


    // useEffect(() => {
    //     Filter();
    // }, [department, level]);

    const toggleSelect = (id) => {
        try {
            setSelected((prev) =>
                prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
            );
        } catch (err) {
            console.error(err.message)
        }
    };

    const toggleSelectAll = () => {
        try {
            setSelected(selected.length === students.length ? [] : students.map((s) => s._id));
        } catch (err) {
            console.error(err.message)
        }
    }


    if (error) return <p>{error}</p>

    return (
        <>
            <div className="home-Body">
                <div className="home-billboard">
                    <img src="../src/assets/cropped-OTS-FAV-ICON.png" alt="ots-logo" />
                    <span className="billboard-text">
                        <h1>OTS ICT CENTRE</h1>
                        <p>Welcome Sir/Ma, Are you ready to turn your tech dreams into reality </p>
                    </span>
                    <span className="billboard-pryText">
                        <p>Check out our students, their courses and level in the table below</p>
                        <h5>You can create, view, and edit students' info</h5>
                    </span>
                </div>
                <span className="top">
                    <span className="left">
                        <svg width="clamp(10px, 5vw, 30px)" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 className="left-header">Students</h1>
                    </span>
                    <span className="right">
                        <Link className="link" to="/add-student">
                            <button className="add-btn">
                                <svg width="clamp(40px, 8vw, 60px)" height="auto" viewBox="0 0 24 24" fill="#4f7a6e" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 22C3.57038 20.0332 4.74795 18.2971 6.36438 17.0399C7.98081 15.7827 9.95335 15.0687 12 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 22V14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 18H23" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Add Student</button>
                        </Link>
                    </span>
                </span>
                <div className="table-et-filter">
                    <div className="filter-section">
                        <span className="select">
                            <span className="select-wrapper">
                                <select className="select-box" name="level" id="level" value={level} onChange={(e) => {
                                    setLevel(e.target.value)
                                }} onClick={Filter} >
                                    <option value="">All Levels  </option>
                                    <option value="100">100 </option>
                                    <option value="200">200 </option>
                                    <option value="300">300 </option>
                                    <option value="400">400 </option>
                                    <option value="500">500</option>
                                </select>
                                <i className="bi bi-chevron-down select arrow"></i>
                            </span>
                            <span className="select-wrapper">
                                <select className="select-box" name="department" id="department" value={department} onChange={(e) => {
                                    setDept(e.target.value)
                                }} onClick={Filter} >
                                    <option value="">All Departments</option>
                                    <option value="Medical Sciences">Medical Sciences</option>
                                    <option value="Law and Humanities">Law and Humanities</option>
                                    <option value="Applied Sciences">Applied Sciences</option>
                                    <option value="Commercial Studies">Commercial Studies</option>
                                    <option value="Languages & Linguistics">Languages & Linguistics</option>
                                </select>
                                <i className="bi bi-chevron-down select arrow"></i>
                            </span>
                        </span>
                    </div>

                    <div className="student-table-wrapper">
                        <table className="student-table">
                            <thead>
                                <tr className="table-head-row">
                                    <th className="table-head">
                                        <input type="checkbox" checked={selected.length === students.length && students.length > 0}
                                            onChange={toggleSelectAll} />
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
                                        <td colSpan="7" className="loading-row">Loading...</td>
                                    </tr>
                                ) : filterMessage ? (<tr>
                                    <td colSpan="7" className="no-students">{filterMessage}</td>
                                </tr>
                                ) :
                                    (students.map((student) => (
                                        <tr key={student._id} className={selected.includes(student._id) ? "selected-row" : ""}>
                                            <td style={{ width: "10px" }} >
                                                <input type="checkbox" checked={selected.includes(student._id)} onChange={() => toggleSelect(student._id)} />
                                            </td>
                                            <td className="t-student" style={{ width: "250px" }}>
                                                <div className="student">
                                                    <span className="student-name">
                                                        <strong className="avatar">{student.name?.[0]}</strong>
                                                        <h4 className="name">{student.name}</h4>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="td">{student.matric_no}</td>
                                            <td className="td">{student.age}</td>
                                            <td className="dept-div">{student.department}</td>
                                            <td className="td">{student.level}</td>
                                            <td className="actions-cell">
                                                <span onClick={() => setOpenMenu(openMenu === student._id ? null : student._id)}>...</span>
                                                {openMenu === student._id && (
                                                    <div className="dropdown-menu">
                                                        <Link to={`/edit-info/${student._id}`}>
                                                            <button className="edit-btn">Edit</button>
                                                        </Link>
                                                        <button onClick={() => deleteStudent(student._id)} className="delete-btn">Delete</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                    )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home


// <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="7" className="loading-row">Loading...</td>
//                                 </tr>
//                             ) : (
//                                 students.map((s) => (
//                                     <tr key={s._id} className={selected.includes(s._id) ? "selected-row" : ""}>
//                                         <td>
//                                             <input type="checkbox" checked={selected.includes(s._id)} onChange={() => toggleSelect(s._id)} />
//                                         </td>
//                                         <td className="student-cell">
//                                             <div className="avatar">{s.name?.[0]}</div>
//                                             <div>
//                                                 <p className="student-name">{s.name}</p>
//                                                 <p className="student-matric_no">{s.matric_no}</p>
//                                             </div>
//                                         </td>
//                                         <td>{s.age}</td>
//                                         <td>{s.department}</td>
//                                         <td>{s.level}</td>
//                                         <td className="actions-cell">
//                                             <span className="icon-btn" onClick={() => setOpenMenu(openMenu === s._id ? null : s._id)}>...</span>
//                                             {openMenu === s._id && (
//                                                 <div className="dropdown-menu">
//                                                     <Link to={`/edit-info/${s._id}`}><button>Edit</button></Link>
//                                                     <button className="delete-btn">Delete</button>
//                                                 </div>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>