import { fireEvent, render } from "@testing-library/react";
import store from "../reducers/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { NewPoll } from "./NewPoll";

describe("NewPoll", () => {
  it("should render the component", () => {
    const user = {
      id: "sarahedo",
      password: "password123",
      name: "Sarah Edo",
      avatarURL: "https://github.com/sarah.png",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        am8ehyc8byjqgar0jgpub9: "optionTwo",
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    };

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all elements", () => {
    const user = {
      id: "sarahedo",
      password: "password123",
      name: "Sarah Edo",
      avatarURL: "https://github.com/sarah.png",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        am8ehyc8byjqgar0jgpub9: "optionTwo",
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    };

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionLabelElement = component.getByTestId("firstOptionLabel");
    const firstOptionInputElement = component.getByTestId("firstOption");
    const secondOptionLabelElement = component.getByTestId("secondOptionLabel");
    const secondOptionInputElement = component.getByTestId("secondOption");
    const submitButtonElement = component.getByTestId("submit-form");

    expect(firstOptionLabelElement.textContent).toBe("First Option");
    expect(secondOptionLabelElement.textContent).toBe("Second Option");
    expect(submitButtonElement.textContent).toBe("Create Poll");

    fireEvent.change(firstOptionInputElement, {
      target: { value: "FootBall" },
    });
    fireEvent.change(secondOptionInputElement, {
      target: { value: "Voleyball" },
    });
    expect(firstOptionInputElement.value).toBe("FootBall");
    expect(secondOptionInputElement.value).toBe("Voleyball");
  });
});
