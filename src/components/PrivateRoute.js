import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavBar } from "./NavBar";
import { login } from "../reducers/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const loggedInUser = localStorage.getItem("loggedInUser");
  useEffect(() => {
    dispatch(login(JSON.parse(loggedInUser)));
  }, [dispatch, loggedInUser]);

  const isAuthenticated = loggedInUser ? true : false;

  return isAuthenticated || loggedInUser ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
