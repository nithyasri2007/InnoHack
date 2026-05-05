import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Hackathons from "./pages/Hackathons.jsx";
import HackathonDetails from "./pages/HackathonDetails.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import HackathonList from "./pages/HackathonList.jsx";
import Repository from "./pages/Repository.jsx";
import Admin from "./pages/Admin.jsx";
import AdminHackathonList from "./pages/AdminHackathonList.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddAchievement from "./pages/AddAchievement.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/hackathons"
              element={
                <ProtectedRoute
                  element={<Hackathons />}
                  allowedRole="STUDENT"
                />
              }
            />
            <Route
              path="/hackathons/:id"
              element={
                <ProtectedRoute
                  element={<HackathonDetails />}
                  allowedRole="STUDENT"
                />
              }
            />
            <Route
              path="/hackathon-list"
              element={
                <ProtectedRoute
                  element={<HackathonList />}
                  allowedRole="STUDENT"
                />
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute element={<Bookmarks />} allowedRole="STUDENT" />
              }
            />
            <Route
              path="/repository"
              element={
                <ProtectedRoute
                  element={<Repository />}
                  allowedRole="STUDENT"
                />
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute element={<Admin />} allowedRole="ADMIN" />
              }
            />
            <Route
              path="/admin-hackathon-list"
              element={
                <ProtectedRoute
                  element={<AdminHackathonList />}
                  allowedRole="ADMIN"
                />
              }
            />
            <Route
              path="/add-achievement"
              element={
                <ProtectedRoute
                  element={<AddAchievement />}
                  allowedRole="ADMIN"
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
