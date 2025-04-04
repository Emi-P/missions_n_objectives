import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import CreateMission from './pages/CreateMission/CreateMission'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/create-mission" element={<CreateMission />}></Route>
        {/* <Route path="/todays-objective-create" element={<TasksFormPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App