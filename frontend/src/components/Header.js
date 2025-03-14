// components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300 transition duration-200">
            Home
          </Link>
          <Link
            to="/blog/create"
            className="hover:text-gray-300 transition duration-200"
          >
            Create Blog
          </Link>
          {/* <Link
            to="/profile"
            className="hover:text-gray-300 transition duration-200"
          >
            Profile
          </Link> */}
        </div>

        <div className="relative">
          {isAuthenticated ? (
            <div>
              {/* User Avatar and Dropdown Toggle */}
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span>{user.username}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-800">
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left rounded-md hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-300 transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
