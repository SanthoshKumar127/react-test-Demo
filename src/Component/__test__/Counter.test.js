import React from "react";
import Counter from "../Counter";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header renders with correct text", () => {
  //   const view = render(<Counter />);
  //   const headerEle = view.getByTestId("header");
  //   expect(headerEle.textContent).toBe("My Counter");
  render(<Counter />);
  //   <h1 data-testid="header">My Counter</h1>
  const header = screen.getByTestId("header");
  expect(header.textContent).toBe("My Counter");
});

test("Counter initally start with the text 0", () => {
  render(<Counter />);
  const counterEle = screen.getByTestId("counter");

  expect(counterEle.textContent).toBe("0");
});

test("input contains inital value of 1", () => {
  render(<Counter />);
  const inputEl = screen.getByTestId("input");

  expect(inputEl.value).toBe("1");
});

test("add button renders with +", () => {
  render(<Counter />);
  const addBtn = screen.getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("add button renders with -", () => {
  render(<Counter />);
  const subBtn = screen.getByTestId("sub-btn");
  expect(subBtn.textContent).toBe("-");
});

test("Change value of input works correctly", () => {
  render(<Counter />);
  const inputEl = screen.getByTestId("input");
  expect(inputEl.value).toBe("1");
  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  expect(inputEl.value).toBe("5");
});

test("clicking on addition button adds 1 to counter", () => {
  render(<Counter />);
  const addBtnEl = screen.getByTestId("add-btn");
  const counterEl = screen.getByTestId("counter");

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("1");
});

test("clicking on subtract button subtracts 1 from counter", () => {
  render(<Counter />);
  const subBtnEl = screen.getByTestId("sub-btn");
  const counterEl = screen.getByTestId("counter");

  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("-1");
});

test("change the input value and clicking on addition button works correctly", () => {
  render(<Counter />);
  const addBtnEl = screen.getByTestId("add-btn");
  const counterEl = screen.getByTestId("counter");
  const inputEl = screen.getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("5");
});

test("change the input value and clicking on subtract button works correctly", () => {
  render(<Counter />);
  const subBtnEl = screen.getByTestId("sub-btn");
  const counterEl = screen.getByTestId("counter");
  const inputEl = screen.getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct counter number", () => {
  render(<Counter />);
  const addBtnEl = screen.getByTestId("add-btn");
  const subBtnEl = screen.getByTestId("sub-btn");
  const counterEl = screen.getByTestId("counter");
  const inputEl = screen.getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "10",
    },
  });

  fireEvent.click(addBtnEl); //10
  fireEvent.click(addBtnEl); //20
  fireEvent.click(addBtnEl); //30
  fireEvent.click(addBtnEl); //40
  fireEvent.click(subBtnEl); //30
  fireEvent.click(subBtnEl); //20

  expect(counterEl.textContent).toBe("20");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtnEl); //25
  fireEvent.click(subBtnEl); //20

  expect(counterEl.textContent).toBe("20");
});

test("counter contains correct className", () => {
  render(<Counter />);
  const counterEl = screen.getByTestId("counter");
  const inputEl = screen.getByTestId("input");
  const addBtnEl = screen.getByTestId("add-btn");
  const subBtnEl = screen.getByTestId("sub-btn");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, {
    target: {
      value: "50",
    },
  });

  fireEvent.click(addBtnEl); //50
  expect(counterEl.className).toBe("");
  fireEvent.click(addBtnEl); //100
  expect(counterEl.className).toBe("green");

  fireEvent.click(addBtnEl); //150
  expect(counterEl.className).toBe("green");

  fireEvent.click(subBtnEl); //100
  fireEvent.click(subBtnEl); //50

  expect(counterEl.className).toBe("");

  fireEvent.click(subBtnEl); //0
  fireEvent.click(subBtnEl); //-50
  fireEvent.click(subBtnEl); //-100
  fireEvent.click(subBtnEl); //-150

  expect(counterEl.className).toBe("red");
});
