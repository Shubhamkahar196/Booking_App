import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import HotelDetail from "./pages/HotelDetail";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking session

  const { data: hotels, loading, error } = useFetch("http://localhost:8000/api/v1/hotels");

  // Toggle dark/light mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-gray-100", "text-gray-800");
    } else {
      document.body.classList.add("bg-gray-100", "text-gray-800");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [theme]);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/session", {
          method: "GET",
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredHotels = hotels
    ? hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-500">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />

        <main className="container mx-auto p-4 md:p-6">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  loading={loading}
                  error={error}
                  filteredHotels={filteredHotels}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  theme={theme}
                />
              }
            />
            <Route
              path="/hotel/:id"
              element={
                <HotelDetail
                  dateRange={dateRange}
                  theme={theme}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage theme={theme} />}
            />
            <Route
              path="/contact"
              element={<ContactPage theme={theme} />}
            />
            <Route
              path="/auth/login"
              element={
                isLoggedIn ? <Navigate to="/" /> : <LoginPage theme={theme} onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route
              path="/auth/signup"
              element={
                isLoggedIn ? <Navigate to="/" /> : <SignupPage theme={theme} onLoginSuccess={handleLoginSuccess} />
              }
            />
          </Routes>

        </main>

        <footer
          className={`py-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"
            } border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="container mx-auto text-center px-4 md:px-6">
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              &copy; 2025 Hotelio. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}