import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    getUsers: (state, action) => {
      state.users = { ...action.payload };
    },
    addQuestionUser: (state, action) => {
      const { questionId, author } = action.payload;
      state.users[author].questions.push(questionId);
    },
    addAnswerUser: (state, action) => {
      const { questionId, author, answer } = action.payload;
      state.users[author].answers[questionId] = answer;
    },
  },
});

export const { getUsers, addQuestionUser, addAnswerUser } = userSlice.actions;
export default userSlice.reducer;
