import { saveQuestion, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

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

describe("_saveQuestion", () => {
  test("returns the saved question with all expected fields populated", async () => {
    // Arrange
    const optionOneText = "Option One";
    const optionTwoText = "Option Two";
    const author = "sarahedo";

    // Act
    const savedQuestion = await _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });

    // Assert
    expect(savedQuestion.id).toBeDefined();
    expect(savedQuestion.timestamp).toBeDefined();
    expect(savedQuestion.author).toBe(author);
    expect(savedQuestion.optionOne.text).toBe(optionOneText);
    expect(savedQuestion.optionOne.votes).toEqual([]);
    expect(savedQuestion.optionTwo.text).toBe(optionTwoText);
    expect(savedQuestion.optionTwo.votes).toEqual([]);
  });

  test("returns an error if incorrect data is passed", async () => {
    // Arrange
    const invalidQuestion = {
      optionOneText: "",
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    // Act
    try {
      await _saveQuestion(invalidQuestion);
    } catch (error) {
      // Assert
      expect(error).toBe(
        "Please provide optionOneText, optionTwoText, and author"
      );
    }
  });
});

describe("_saveQuestionAnswer", () => {
  test("returns true when correctly formatted data is passed", async () => {
    // Arrange
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    // Act
    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    // Assert
    expect(result).toBe(true);
  });

  test("returns an error if incorrect data is passed", async () => {
    // Arrange
    const invalidData = {
      authedUser: "",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    // Act
    try {
      await _saveQuestionAnswer(invalidData);
    } catch (error) {
      // Assert
      expect(error).toEqual("Please provide authedUser, qid, and answer");
    }
  });
});
