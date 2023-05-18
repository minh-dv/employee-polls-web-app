import React from "react";
import { Card } from "./Card";
import { useSelector } from "react-redux";

export const Home = () => {
  const authenedUser = useSelector((state) => state.authenticatedUser.user);
  const questions = useSelector((state) => state.questions.questions) || {};
  const unansweredQuestions = Object.values(questions).filter(
    (question) =>
      !question.optionOne.votes.includes(authenedUser.id) &&
      !question.optionTwo.votes.includes(authenedUser.id)
  );
  const answeredQuestions = Object.values(questions).filter(
    (question) =>
      question.optionOne.votes.includes(authenedUser.id) ||
      question.optionTwo.votes.includes(authenedUser.id)
  );

  return (
    <div className="flex flex-col gap-10">
      <Card data={unansweredQuestions} title={"New Questions"}></Card>
      <Card data={answeredQuestions} title={"Done"}></Card>
    </div>
  );
};
