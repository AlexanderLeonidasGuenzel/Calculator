const displayElement = document.querySelector(".display");
let number_1 = "";
let number_2 = "";
let result = "";
let operator = "";
let locked = false;
numberCreation = false;
const operators = ["+", "-", "*", "/", "%", "="];
const op = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};
const maxLength = 14;

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => button.addEventListener("click", input));
});

function input() {
  const displayLength = displayElement.value.length;
  let inputElement = this.innerHTML;

  if (this.classList.contains("digit")) {
    locked = false;
    if (displayLength < maxLength) {
      createNumber(inputElement);
    }
  }

  if (this.classList.contains("operator")) {
    //prevent display operator as first input
    if (displayElement.value === "") {
      return;
    }

    numberCreation = false;

    if (inputElement === "=") {
      result = op[operator](
        Number.parseInt(number_2),
        Number.parseInt(number_1)
      );
      displayElement.value = result;
      locked = true;
      reset();

      //input operators: + , - , * , /
    } else {
      operator = inputElement;
      displayElement.value = inputElement;
      if (number_2 === "") {
        number_2 = number_1;
        number_1 = "";
      } else {
        result = op[operator](
          Number.parseInt(number_2),
          Number.parseInt(number_1)
        );
        console.log("result: " + result);
        number_2 = result;
        number_1 = "";
      }
    }
  }

  if (this.classList.contains("clear")) {
    clear();
  }

  if (this.classList.contains("stepBack")) {
    stepBack();
  }
}

function createNumber(digit) {
  if (numberCreation === false) {
    number_1 = "";
  }
  number_1 += digit;
  displayElement.value = number_1;
  numberCreation = true;
}

function clear() {
  displayElement.value = "";
  console.clear();
  reset();
}

function stepBack() {
  if (locked === false) {
    value = displayElement.value.slice(0, -1);
    displayElement.value = value;
    number_1 = value;
  }
}

function reset() {
  number_1 = result;
  number_2 = "";
  operator = "";
}
