const displayElement = document.querySelector(".display");

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => button.addEventListener("click", behaviour));
});

let actualNumber = "";
let savedNumber = "";
let operator = "";
const operators = ["+", "-", "*", "/", "%", "="];
const op = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

function behaviour() {
  const maxLength = 14;
  const displayLength = displayElement.value.length;
  let element = this.innerHTML;

  if (this.classList.contains("digit")) {
    if (displayLength < maxLength) {
      actualNumber += element;
      displayElement.value = actualNumber;
      console.log("actualNumber: " + actualNumber);
      console.log("savedNumber: " + savedNumber);
    }
  }

  if (this.classList.contains("operator")) {
    const lastDisplayedContent = displayElement.value;
    if (!operators.includes(lastDisplayedContent)) {
      if (element === "=") {
        console.log(operator);
        result = op[operator](
          Number.parseInt(savedNumber),
          Number.parseInt(actualNumber)
        );
        displayElement.value = result;
        console.log(result);
      } else {
        savedNumber = actualNumber;
        actualNumber = "";
        operator = element;

        displayElement.value = element;
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

function clear() {
  displayElement.value = "";
  console.clear();
  reset();
}

function stepBack() {
  actualNumber = displayElement.value.slice(0, -1);
  displayElement.value = actualNumber;
}

function reset() {
  actualNumber = "";
  savedNumber = "";
  operator = "";
}
