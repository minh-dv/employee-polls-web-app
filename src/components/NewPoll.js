import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveQuestion } from "../util/_DATA";
import { addQuestion } from "../reducers/questionSlice";
import { addQuestionUser } from "../reducers/userSlice";

export const NewPoll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const author = loggedInUser.id;
  const handleFirstOptionChange = (e) => {
    setFirstOption(e.target.value);
  };

  const handleSencondOptionChange = (e) => {
    setSecondOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = await saveQuestion(firstOption, secondOption, author);
    if (question) {
      const questionId = question.id;
      dispatch(addQuestion({ questionId, question }));
      dispatch(addQuestionUser({ questionId, author }));
    }
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center bg-gray-100 p-5">
        <h2 className="text-2xl font-bold">Poll by sarahedo</h2>
        <div className="h-56 w-56 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="https://github.com/sarah.png"
            alt={`sarahedo's avatar`}
          />
        </div>
        <h2 className="text-2xl font-bold">Would You Rather</h2>
      </div>

      <div className="max-w-5xl mx-auto my-8 p-8 border border-gray-300 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="option1"
              className="block font-medium text-gray-700 mb-2"
            >
              First Option
            </label>
            <input
              type="text"
              id="option1"
              name="option1"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              placeholder="Option One"
              required
              value={firstOption}
              onChange={handleFirstOptionChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="option2"
              className="block font-medium text-gray-700 mb-2"
            >
              Second Option
            </label>
            <input
              type="text"
              id="option2"
              name="option2"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              placeholder="Option Two"
              required
              value={secondOption}
              onChange={handleSencondOptionChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 mx-auto w-1/4"
            >
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
