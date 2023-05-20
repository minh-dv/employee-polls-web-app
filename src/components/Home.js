// import React from "react";
// import { Card } from "./Card";
// import { useSelector } from "react-redux";

// export const Home = () => {
//   const authenedUser = useSelector((state) => state.authenticatedUser.user);
//   const questions = useSelector((state) => state.questions.questions) || {};
//   const unansweredQuestions = Object.values(questions).filter(
//     (question) =>
//       !question.optionOne.votes.includes(authenedUser?.id) &&
//       !question.optionTwo.votes.includes(authenedUser?.id)
//   );
//   const answeredQuestions = Object.values(questions).filter(
//     (question) =>
//       question.optionOne.votes.includes(authenedUser?.id) ||
//       question.optionTwo.votes.includes(authenedUser?.id)
//   );

//   return (
//     <div className="flex flex-col gap-10">
//       <Card data={unansweredQuestions} title={"Unanswered Questions"}></Card>
//       <Card data={answeredQuestions} title={"Answered Questions"}></Card>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";

export const Home = () => {
  const authenticatedUser = useSelector(
    (state) => state.authenticatedUser.user
  );
  const questions = useSelector((state) => state.questions.questions) || {};
  const [activeTab, setActiveTab] = useState("unanswered");

  const unansweredQuestions = Object.values(questions).filter(
    (question) =>
      !question.optionOne.votes.includes(authenticatedUser?.id) &&
      !question.optionTwo.votes.includes(authenticatedUser?.id)
  );

  const answeredQuestions = Object.values(questions).filter(
    (question) =>
      question.optionOne.votes.includes(authenticatedUser?.id) ||
      question.optionTwo.votes.includes(authenticatedUser?.id)
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center mb-4">
        <button
          className={`py-2 px-4 rounded-tl-lg rounded-bl-lg ${
            activeTab === "unanswered"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => handleTabChange("unanswered")}
        >
          Unanswered Polls
        </button>
        <button
          className={`py-2 px-4 rounded-tr-lg rounded-br-lg ${
            activeTab === "answered"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => handleTabChange("answered")}
        >
          Answered Polls
        </button>
      </div>
      {activeTab === "unanswered" && (
        <Card data={unansweredQuestions} title={"Unanswered Questions"} />
      )}
      {activeTab === "answered" && (
        <Card data={answeredQuestions} title={"Answered Questions"} />
      )}
    </div>
  );
};
