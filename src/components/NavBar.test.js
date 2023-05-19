import { render } from "@testing-library/react";
import store from "../reducers/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
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
          <NavBar />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display username of logged in user", () => {
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
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    const userNameDivElement = component.getByTestId("user-name");
    const userIdDivElement = component.getByTestId("user-id");
    expect(userNameDivElement.textContent).toBe("Sarah Edo");
    expect(userIdDivElement.textContent).toBe("ID: sarahedo");
  });
});
