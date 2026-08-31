import { Routes, Route, useLocation } from 'react-router-dom'
import WelcomePage from '../pages/Welcome'
import './App.css'
import Home from '../pages/Home'
import AddStudent from '../pages/AddStudent'
import UpdateStudent from '../pages/UpdateStudent'
import Navbar from '../pages/NavBar'
import Department from '../pages/Departments'
import Feedback from '../pages/Feedback'
import About from '../pages/About'


function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add-student' element={<AddStudent />} />
        <Route path='/edit-info/:id' element={<UpdateStudent />} />
        <Route path='/departments' element={<Department />} />
        <Route path='/feedback-report' element={<Feedback />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  )
}

export default App
