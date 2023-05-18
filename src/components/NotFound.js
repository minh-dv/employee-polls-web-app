import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Page Not Found</p>
      <Link to="/" className="text-blue-600">
        Home Page
      </Link>
    </div>
  );
};
