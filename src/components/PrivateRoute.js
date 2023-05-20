// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { NavBar } from "./NavBar";
// import { login } from "../reducers/authSlice";

// const PrivateRoute = ({ children }) => {
//   const dispatch = useDispatch();

//   const loggedInUser = useSelector(
//     (state) => state.authenticatedUser.isAuthenticated
//   );

//   // const loggedInUser = localStorage.getItem("loggedInUser");
//   useEffect(() => {
//     const storedUser = localStorage.getItem("loggedInUser");
//     if (storedUser) {
//       dispatch(login(JSON.parse(storedUser)));
//     }
//   }, [dispatch]);

//   const isAuthenticated = loggedInUser ? true : false;

//   return isAuthenticated || loggedInUser ? (
//     <>
//       <NavBar />
//       {children}
//     </>
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/authSlice";
import { NavBar } from "./NavBar";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state) => state.authenticatedUser.isAuthenticated
  );
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const isAuthenticated = !!loggedInUser;

  if (!isAuthenticated && location.pathname !== "/login") {
    // Store the current location in localStorage to redirect back after login
    localStorage.setItem("redirectPath", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? (
    <>
      <NavBar />
      {children}
    </>
  ) : null;
};

export default PrivateRoute;
