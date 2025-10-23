import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../../contexts/ThemeContext";

const user = null;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-500
      ${
        theme === "light"
          ? "bg-gradient-to-r from-blue-100 to-blue-200"
          : "bg-gradient-to-r from-gray-900 to-gray-800"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-900 dark:text-yellow-300"
        >
          <FaPaw
            className={`text-red-400 ${theme === "dark" ? "text-red-500" : ""}`}
          />
          WarmPaws
        </Link>
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link
            to="/"
            className={`hover:text-red-400 transition-colors ${
              theme === "light" ? "text-blue-900" : "text-yellow-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`hover:text-red-400 transition-colors ${
              theme === "light" ? "text-blue-900" : "text-yellow-300"
            }`}
          >
            Services
          </Link>
          <Link
            to="/profile"
            className={`hover:text-red-400 transition-colors ${
              theme === "light" ? "text-blue-900" : "text-yellow-300"
            }`}
          >
            My Profile
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:scale-110 transition-transform shadow-sm"
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          {!user && (
            <Link
              to="/login"
              className="btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </Link>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                theme === "light"
                  ? "text-blue-900 hover:bg-blue-100"
                  : "text-yellow-300 hover:bg-gray-700"
              }`}
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`md:hidden transition-colors duration-500
          ${
            theme === "light"
              ? "bg-blue-100 border-t border-blue-200"
              : "bg-gray-900 border-t border-gray-700"
          }`}
        >
          <ul className="flex flex-col px-4 py-2 gap-2">
            <li>
              <Link
                to="/"
                className={`block py-2 ${
                  theme === "light"
                    ? "text-blue-900 hover:text-red-400"
                    : "text-yellow-300 hover:text-red-400"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`block py-2 ${
                  theme === "light"
                    ? "text-blue-900 hover:text-red-400"
                    : "text-yellow-300 hover:text-red-400"
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`block py-2 ${
                  theme === "light"
                    ? "text-blue-900 hover:text-red-400"
                    : "text-yellow-300 hover:text-red-400"
                }`}
              >
                My Profile
              </Link>
            </li>
            {!user && (
              <li>
                <Link
                  to="/login"
                  className={`block py-2 ${
                    theme === "light"
                      ? "text-blue-900 hover:text-red-400"
                      : "text-yellow-300 hover:text-red-400"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
