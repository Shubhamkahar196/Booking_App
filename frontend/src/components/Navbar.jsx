import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, LogOut } from "lucide-react";

function Navbar({ theme, toggleTheme, isLoggedIn, isAdmin, handleLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = `px-3 py-2 rounded-lg font-medium transition-colors duration-300 ${
    theme === "dark" ? "hover:bg-slate-700 text-white" : "hover:bg-gray-200 text-gray-900"
  }`;

  return (
    <nav className={`w-full shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-4">
        <button onClick={() => navigate("/")} className="text-2xl font-bold text-indigo-500">
          Hotelio
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => navigate("/")} className={linkClass}>Home</button>
          <button onClick={() => navigate("/about")} className={linkClass}>About</button>
          <button onClick={() => navigate("/contact")} className={linkClass}>Contact</button>
          {isAdmin && <button onClick={() => navigate("/admin")} className={linkClass}>Admin</button>}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-full font-medium ${
                theme === "dark"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition-colors duration-200 flex items-center`}
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className={`px-4 py-2 rounded-full font-medium ${
                theme === "dark"
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition-colors duration-200`}
            >
              Sign In
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-indigo-500 transition-colors duration-200"
            aria-label="Toggle dark/light mode"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-indigo-500 transition-colors duration-200"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full text-gray-500 hover:text-indigo-500 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}>
          <div className="flex flex-col items-center py-2 space-y-2">
            <button onClick={() => { navigate("/"); setIsMenuOpen(false); }} className={linkClass}>Home</button>
            <button onClick={() => { navigate("/about"); setIsMenuOpen(false); }} className={linkClass}>About</button>
            <button onClick={() => { navigate("/contact"); setIsMenuOpen(false); }} className={linkClass}>Contact</button>
            {isAdmin && <button onClick={() => { navigate("/admin"); setIsMenuOpen(false); }} className={linkClass}>Admin</button>}

            {isLoggedIn ? (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className={`px-4 py-2 rounded-full font-medium ${
                  theme === "dark"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors duration-200 flex items-center`}
              >
                <LogOut size={18} className="mr-2" /> Logout
              </button>
            ) : (
              <button
                onClick={() => { navigate("/auth/login"); setIsMenuOpen(false); }}
                className={`px-4 py-2 rounded-full font-medium ${
                  theme === "dark"
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors duration-200`}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
