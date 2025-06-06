import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MyButton } from './CodeTest'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CarRentalPage from './components/RentCarHome'
import RentalFormPage from './components/RentCarForm'
import RentalConfirmationPage from './components/RentCarInfo'
import Contact from './components/Contact'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarRentalPage />} />
        <Route path="/rent-form/:marca/:modelo" element={<RentalFormPage />} />
        <Route path="/rent-info" element={<RentalConfirmationPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App