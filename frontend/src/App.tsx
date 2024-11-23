import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Registration } from './pages/registration'; 
import { Login } from './pages/login'; 
import { Feed } from './pages/feed'; 
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes> 
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
