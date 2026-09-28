import { Routes, Route, useLocation } from "react-router-dom";
import WelcomePage from "../components/Welcome";
import "./App.css";
import Home from "../components/Home";
import AddStudent from "../components/AddStudent";
import UpdateStudent from "../components/UpdateStudent";
import Navbar from "../components/NavBar";
import Department from "../components/Departments";
import Feedback from "../components/Feedback";
import About from "../components/About";
import ScrollToTop from "../components/ScrollToTop";
import DepartmentPage from "../components/DepartmentProfile";
import StudentProfile from "../components/StudentProfile";
import Confirmation from "./ActionConfirmation";
import LoginComponent from "../components/Login";
import TakeAttendance from "../components/TakeAttendance";
import StudentAttendance from "../components/StudentAttendance";
import HomeDemo from "../DEMO-MODE/DemoHome";
import DemoDepartmentPage from "../DEMO-MODE/DemoDeptProfile";
import DemoDepartment from "../DEMO-MODE/DemoDepartments";
import DemoNavbar from "../DEMO-MODE/DemoNavBar";
import DemoAbout from "../DEMO-MODE/DemoAbout";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/demo-departments" &&
        location.pathname !== "/demo-about" &&
        !location.pathname.startsWith("/demo-departments/") &&
        location.pathname !== "/demo-home" && <Navbar />}

      {(location.pathname === "/demo-home" ||
        location.pathname === "/demo-about" ||
        location.pathname === "/demo-departments" ||
        location.pathname.startsWith("/demo-departments/")) && <DemoNavbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-info/:id" element={<UpdateStudent />} />
        <Route path="/confirm" element={<Confirmation />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/demo-departments" element={<DemoDepartment />} />
        <Route path="/departments/:deptId" element={<DepartmentPage />} />
        <Route
          path="/demo-departments/:deptId"
          element={<DemoDepartmentPage />}
        />
        <Route path="/feedback-report" element={<Feedback />} />
        <Route path="/about" element={<About />} />
        <Route path="/demo-about" element={<DemoAbout />} />
        <Route path="/take-attendance" element={<TakeAttendance />} />
        <Route path="/attendance/:id" element={<StudentAttendance />} />
        <Route path="/demo-home" element={<HomeDemo />} />
      </Routes>
    </>
  );
}

export default App;
