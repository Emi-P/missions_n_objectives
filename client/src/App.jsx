import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import Login from './pages/Login'
import CreateMission from './pages/CreateMission/CreateMission'

function App() {
  const userIsAuthenticated = localStorage.getItem('token') ? true : false

  return (
    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />}></Route>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navigation /> 
            <Dashboard />
          </ProtectedRoute>
          }></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/create-mission" element={<CreateMission />}></Route>
        {/* <Route path="/todays-objective-create" element={<TasksFormPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App