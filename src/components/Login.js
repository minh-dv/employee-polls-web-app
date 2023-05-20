import React from "react";
import { useState } from "react";
import { login } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../util/_DATA";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await getUser(username, password);
    if (user) {
      dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      // Retrieve the stored redirect path from localStorage
      const redirectPath = localStorage.getItem("redirectPath");
      localStorage.removeItem("redirectPath");

      // Navigate the user back to the previous path or the home page if no redirect path is stored
      navigate(redirectPath || "/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-16 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Log in to Employee Polls</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              UserName
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              id="email"
              value={username}
              onChange={handleInputUsername}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              id="password"
              value={password}
              type="password"
              onChange={handleInputPassword}
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
