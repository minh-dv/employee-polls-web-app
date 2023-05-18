import { createSlice } from "@reduxjs/toolkit";
import { OPTION_ONE, OPTION_TWO } from "../components/PollDetail";

const questionSlice = createSlice({
  name: "questions",
  initialState: {},
  reducers: {
    getQuestions: (state, action) => {
      state.questions = { ...action.payload };
    },
    addQuestion: (state, action) => {
      const { questionId, question } = action.payload;
      state.questions[questionId] = question;
    },
    addAnswerQuestion: (state, action) => {
      const { questionId, author, answer } = action.payload;
      if (answer === OPTION_ONE) {
        state.questions[questionId].optionOne.votes.push(author);
      }
      if (answer === OPTION_TWO) {
        state.questions[questionId].optionTwo.votes.push(author);
      }
    },
  },
});

export const { getQuestions, addQuestion, addAnswerQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
