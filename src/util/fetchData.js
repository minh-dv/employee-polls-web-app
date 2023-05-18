import { _getUsers, _getQuestions } from "./_DATA";
import { getUsers } from "../reducers/userSlice";
import { getQuestions } from "../reducers/questionSlice";

function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function fetchData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
  };
}
