import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        </Routes>
    </>
  )
}

export default App