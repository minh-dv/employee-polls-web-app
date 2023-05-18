import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    authenticatedUser: authReducer,
    users: userReducer,
    questions: questionReducer,
  },
});
