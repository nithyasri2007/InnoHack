import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Hackathons from './pages/Hackathons.jsx';
import MyHackathons from './pages/MyHackathons.jsx';
import Repository from './pages/Repository.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import AddAchievement from './pages/AddAchievement.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/my-hackathons" element={<MyHackathons />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/add-achievement" element={<AddAchievement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
