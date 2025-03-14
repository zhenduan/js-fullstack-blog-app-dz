import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center my-12">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link className="text-blue-600 underline" to="/">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
