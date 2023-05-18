import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { NewPoll } from "./components/NewPoll";
import { LeaderBoard } from "./components/LeaderBoard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { _getUsers, _getQuestions } from "./util/_DATA";
import { getUsers } from "./reducers/userSlice";
import { getQuestions } from "./reducers/questionSlice";

import PrivateRoute from "./components/PrivateRoute";
import { NotFound } from "./components/NotFound";
import { PollDetail } from "./components/PollDetail";
import { fetchData } from "./util/fetchData";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <div className="container mx-auto py-4">
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/poll/:questionId"
          element={
            <PrivateRoute>
              <PollDetail />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
