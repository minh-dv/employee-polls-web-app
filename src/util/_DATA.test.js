import { saveQuestion } from "./_DATA";

describe("saveQuestion", () => {
  it("will return the new question", async () => {
    const optionOne = "Option1";
    const optionTwo = "Option2";
    const author = "sarahedo";
    const response = await saveQuestion(optionOne, optionTwo, author);

    expect(response.author).toEqual(author);
    expect(response.optionOne.text).toEqual(optionOne);
    expect(response.optionTwo.text).toEqual(optionTwo);
  });

  it("will return an error if it not ", async () => {
    const optionOne = "Option1";
    const optionTwo = "Option2";
    const author = undefined;
    const response = await saveQuestion(optionOne, optionTwo, author);
    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
