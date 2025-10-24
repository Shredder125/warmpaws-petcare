import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPaw, FaUserCircle } from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/config";
import "animate.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `transition-colors ${
      theme === "light"
        ? isActive
          ? "text-red-500 font-bold"
          : "text-blue-900 hover:text-red-400"
        : isActive
        ? "text-yellow-400 font-bold"
        : "text-yellow-300 hover:text-red-400"
    }`;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-500 animate__animated animate__pulse ${
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
          <Link to="/" className={getLinkClasses("/")}>
            Home
          </Link>

          <Link
            to={user ? "/services" : "/login"}
            className={getLinkClasses("/services")}
          >
            Services
          </Link>

          <Link
            to={user ? "/profile" : "/login"}
            className={getLinkClasses("/profile")}
          >
            My Profile
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1 cursor-pointer">
                <FaUserCircle
                  size={28}
                  className="text-gray-800 dark:text-yellow-300"
                />
                <span className=" text-gray-800 dark:text-yellow-300 md:text-lg md:ml-1 md:font-bold ">
                  {user.displayName || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-6 relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-white rounded-lg shadow-lg group bg-red-500 hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                <span className="relative">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-white rounded-lg shadow-lg group bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                <span className="relative">Login</span>
              </Link>
              <Link
                to="/register"
                className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-white rounded-lg shadow-lg group bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                <span className="relative">Register</span>
              </Link>
            </div>
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
              {isMenuOpen ? <IoIosArrowBack /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`md:hidden transition-colors duration-500 ${
            theme === "light"
              ? "bg-blue-100 border-t border-blue-200"
              : "bg-gray-900 border-t border-gray-700"
          }`}
        >
          <ul className="flex flex-col px-4 py-2 gap-2">
            <li>
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to={user ? "/services" : "/login"}
                className={getLinkClasses("/services")}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to={user ? "/profile" : "/login"}
                className={getLinkClasses("/profile")}
              >
                My Profile
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className={`w-full text-left py-2 ${
                    theme === "light"
                      ? "text-red-500 hover:text-red-700"
                      : "text-red-400 hover:text-red-600"
                  }`}
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-1">
                  <Link to="/login" className={getLinkClasses("/login")}>
                    Login
                  </Link>
                  <Link to="/register" className={getLinkClasses("/register")}>
                    Register
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
