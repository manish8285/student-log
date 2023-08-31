
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AttendenceSheet from './pages/AttendenceSheet'
import Courses from './pages/Courses'
import Students from './pages/Students'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Report from './pages/Report'


function App() {

  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path='/report' element={<Report />} />
        <Route path="/attendence-sheet" element={<AttendenceSheet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
