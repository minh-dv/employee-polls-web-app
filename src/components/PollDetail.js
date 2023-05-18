import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAnswerUser } from "../reducers/userSlice";
import { addAnswerQuestion } from "../reducers/questionSlice";

export const OPTION_ONE = "optionOne";
export const OPTION_TWO = "optionTwo";

export const PollDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const authenedUserId = authenedUser.id;
  const questions = useSelector((state) => state.questions.questions) || {};
  const { questionId } = useParams();
  const question = Object.values(questions).find(
    (question) => question.id === questionId
  );

  const hasVotedForOptionOne =
    question?.optionOne.votes.includes(authenedUserId);
  const hasVotedForOptionTwo =
    question?.optionTwo.votes.includes(authenedUserId);
  const userHasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleAddAnswer = (option) => {
    dispatch(
      addAnswerUser({ questionId, author: authenedUserId, answer: option })
    );
    dispatch(
      addAnswerQuestion({
        questionId,
        author: authenedUserId,
        answer: option,
      })
    );
    navigate("/");
  };

  const handleOptionOne = (e) => {
    e.preventDefault();
    handleAddAnswer(OPTION_ONE);
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    handleAddAnswer(OPTION_TWO);
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal).toFixed(2) *
            100 +
          " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal).toFixed(2) *
            100 +
          " %"
        );
      default:
        return "";
    }
  };

  const percentOne = calcPercentage(OPTION_ONE, question);
  const percentTwo = calcPercentage(OPTION_TWO, question);
  return (
    <div className="flex flex-col items-center justify-center">
      <h4 className="text-lg font-semibold mb-2">Poll By {authenedUserId}</h4>

      <div className="flex items-center justify-center mb-4">
        <img
          src={authenedUser.avatarURL}
          alt={`${authenedUserId}s' Avatar`}
          className="rounded-full h-40 w-40"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Would you rather</h3>

      <div className="flex mt-10 w-4/6">
        {/* Option 1 */}
        <div className="flex flex-col items-center justify-between border rounded-lg p-4 mr-4 w-1/2">
          <span className="text-gray-700 whitespace-pre-wrap">
            {question?.optionOne.text}
          </span>

          {/* If user is logged in and hasn't voted */}
          {!userHasVoted && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2 w-full"
              onClick={handleOptionOne}
            >
              Vote
            </button>
          )}

          {/* If user has voted */}
          {userHasVoted && (
            <div className="flex items-center mt-2 w-full">
              <div className="w-5/6 bg-gray-200 rounded-full ">
                <div
                  className="bg-green-500 text-white text-xs leading-none py-1 rounded-full"
                  style={{ width: percentOne }}
                ></div>
              </div>
              <span className="ml-2">{percentOne}</span>
            </div>
          )}
        </div>

        {/* Option 2 */}
        <div className="flex flex-col items-center justify-between border rounded-lg p-4 w-1/2">
          <span className="text-gray-700 whitespace-pre-wrap">
            {question?.optionTwo.text}
          </span>

          {/* If user is logged in and hasn't voted */}
          {!userHasVoted && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2 w-full"
              onClick={handleOptionTwo}
            >
              Vote
            </button>
          )}

          {/* If user has voted */}
          {userHasVoted && (
            <div className="flex items-center mt-2 w-full">
              <div className="w-5/6 bg-gray-200 rounded-full">
                <div
                  className="bg-green-500 text-white text-xs leading-none py-1 rounded-full"
                  style={{ width: percentTwo }}
                ></div>
              </div>
              <span className="ml-2">{percentTwo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
