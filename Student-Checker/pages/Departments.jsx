import axios from "axios";
import { useEffect, useState } from "react";
import "../stylesheets/departments.css"
import "../stylesheets/navbar.css"
import "@fontsource/dm-sans"
import "@fontsource/cal-sans"
import "@fontsource/inter"
const medImages = ["../images/image1.jpg", "../images/image2.jpg",]
const appImages = ["../images/image3.jpg", "../images/image4.jpg",]
const lawImages = ["../images/image5.jpg", "../images/image6.jpg",]
const commImages = ["../images/image7.jpg", "../images/image8.jpg",]
const langImages = ["../images/image9.jpg", "../images/image10.jpg",]

function Department() {
    const [students, setStudents] = useState([])
    const [department, setDepartment] = useState("")
    const [level, setLevel] = useState("")
    const [medCurrent, setMedCurrent] = useState(0)
    const [commCurrent, setCommCurrent] = useState(0)
    const [appCurrent, setAppCurrent] = useState(0)
    const [lawCurrent, setLawCurrent] = useState(0)
    const [langCurrent, setLangCurrent] = useState(0)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get("http://localhost:2468/students/home")
                setStudents(res.data)
                console.log(res.data)
            } catch (err) {
                console.error(err.message);

            }
        }
        getUsers()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setMedCurrent(prev => (prev + 1) % medImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCommCurrent(prev => (prev + 1) % commImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setAppCurrent(prev => (prev + 1) % appImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setLawCurrent(prev => (prev + 1) % lawImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setLangCurrent(prev => (prev + 1) % langImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const deptFilter = () => {
        const filtered = students.filter((student) => {
            return student.department == department
        })
    }
    const lvlFilter = () => {
        const filtered = students.filter((student) => {
            return student.level == level
        })
    }

    return (
        <>
            <div className="deptBody">
                <span className="main">
                    <h1 className="main-header">Departments Page</h1>
                    <h3 className="main-description">Every department, at a glance</h3>
                </span>

                <div className="dept-grid">
                    <div className="dept-box">
                        <h2 className="dept-header">Medical Sciences</h2>
                        <span className="slider-image" style={{ transform: `translateX(-${medCurrent * 100}%)` }}>
                            {medImages.map((img, index) => (
                                <img src={img} key={index} />
                            ))}
                        </span>
                        <p className="description">Medical Sciences focuses on understanding the human body, health, disease, and the scientific principles behind diagnosis, prevention, and treatment.</p>
                    </div>
                    <div className="dept-grid">
                        <div className="dept-box">
                            <h2 className="dept-header">Commercial Studies</h2>
                            <span className="slider-image" style={{ transform: `translateX(-${commCurrent * 100}%)` }}>
                                {commImages.map((img, index) => (
                                    <img src={img} key={index} />
                                ))}
                            </span>
                            <p className="description">Commercial Studies focuses on the principles and practices involved in business, trade, finance, and economic activity.</p>
                        </div>
                    </div>
                    <div className="dept-grid">
                        <div className="dept-box">
                            <h2 className="dept-header">Law And Humanities</h2>
                            <span className="slider-image" style={{ transform: `translateX(-${lawCurrent * 100}%)` }}>
                                {lawImages.map((img, index) => (
                                    <img src={img} key={index} />
                                ))}
                            </span>
                        </div>
                        <p className="description">Law and Humanities examines the systems, principles, and ideas that shape human society and relationships.</p>
                    </div>
                    <div className="dept-grid">
                        <div className="dept-box">
                            <h2 className="dept-header">Applied Sciences</h2>
                            <span className="slider-image" style={{ transform: `translateX(-${appCurrent * 100}%)` }}>
                                {appImages.map((img, index) => (
                                    <img src={img} key={index} />
                                ))}
                            </span>
                        </div>
                        <p className="description">Applied Sciences focuses on using scientific knowledge to solve practical problems and develop useful solutions.</p>
                    </div>
                    <div className="dept-grid">
                        <div className="dept-box">
                            <h2 className="dept-header">Languages And Linguistics</h2>
                            <span className="slider-image" style={{ transform: `translateX(-${langCurrent * 100}%)` }}>
                                {langImages.map((img, index) => (
                                    <img src={img} key={index} />
                                ))}
                            </span>
                            <p className="description">Languages and Linguistics focuses on the structure, development, use, and communication of human language.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Department



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