// components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
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
          <Link
            to="/profile"
            className="hover:text-gray-300 transition duration-200"
          >
            Profile
          </Link>
        </div>

        <div>
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <div className="flex space-x-4">
              {" "}
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
