import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/authSlice";
import { UserInfo } from "./UserInfo";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between border-b border-gray-400 mb-10">
      <div className="flex gap-5 ml-5">
        <Link
          to="/"
          className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Home
        </Link>
        <Link
          to="/leaderboard"
          className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Leaderboard
        </Link>
        <Link
          to="/new"
          className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          New Poll
        </Link>
      </div>
      <div className="mr-5 flex gap-5">
        <span className="font-medium px-3 py-2 text-slate-700">
          <UserInfo user={loggedInUser} />
        </span>
        <button
          onClick={handleLogout}
          className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
