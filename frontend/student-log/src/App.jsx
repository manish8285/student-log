
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AttendenceSheet from './pages/AttendenceSheet'

function App() {

  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/attendence-sheet" element={<AttendenceSheet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
