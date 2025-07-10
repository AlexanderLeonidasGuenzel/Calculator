const display = document.querySelector(".display");
const btn = document.querySelectorAll(".button");
const btnOn = document.querySelector(".power");
const light = document.querySelector(".light");
const operator = /[+\-*\/]/;
const digit = /\d/;

let number = "";
let displayItem = "";
let evalString = "";
let hasResult = false;

document.addEventListener("DOMContentLoaded", () => {
  btnOn.addEventListener("click", powerOn);
});

const powerOn = () => {
  if (display.classList.contains("on")) {
    display.classList.toggle("on");
    btn.forEach((b) => b.removeEventListener("click", inputHandler));
    reset();
  } else {
    display.classList.toggle("on");
    display.classList.add("animation");
    display.value = "       Hello";
    setTimeout(() => {
      display.value = "";
      display.classList.remove("animation");
      btn.forEach((b) => b.addEventListener("click", inputHandler));
    }, 2500);
  }
};

const inputHandler = (event) => {
  let inputValue = event.target.dataset.item;
  display.style.fontFamily = "SevenSegment";

  if (inputValue === "CLR") {
    reset();
  }

  //digit 0-9 and .
  if ((digit.test(inputValue) || inputValue === ".") && number.length <= 10) {
    if (number.includes(".") && inputValue === ".") {
      //do nothing
    } else {
      hasResult = false;
      number += inputValue;
      displayItem = number;
    }
  }

  //operator +,-,*,/
  if (operator.test(inputValue)) {
    let op = inputValue;
    if ((hasResult || display.value === "") && (op === "*" || op === "/")) {
    } else {
      append(number);
      append(op);
      displayItem = displayOperator(op);
    }
  }

  // =
  if (inputValue === "=") {
    const SCALE = 10000000000;
    try {
      append(number);
      let result = eval(evalString);
      displayItem = Math.round(result * SCALE) / SCALE;
      hasResult = true;
      number = "";
      evalString = "";
    } catch (error) {
      displayItem = "ERROR";
    }
  }

  if (inputValue === "DEL") {
    if (digit.test(display.value)) {
      number = removeFrom(number);
      displayItem = number;
    }
  }
  display.value = displayItem;
};

function append(item) {
  evalString += item;
  number = "";
}

function removeFrom(target) {
  if (target.lenght !== 0) {
    return target.slice(0, -1);
  }
}

function reset() {
  evalString = "";
  number = "";
  displayItem = "";
  hasResult = false;
}

function displayOperator(op) {
  if (op === "/") {
    display.style.fontFamily = "Arial, sans-serif";
    return "÷";
  }
  if (op === "*") {
    display.style.fontFamily = "Arial, sans-serif";
    return "x";
  } else {
    return op;
  }
}
