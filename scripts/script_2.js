const display = document.querySelector(".display");
const btn = document.querySelectorAll(".button");
const light = document.querySelector(".light");
const isOperator = /[+\-*/]/;
const isNumber = /\d/;
const clr = /CLR/;
const deleteSymbol = /DEL/;
const decimalPoint = /./;

let result = "";
let numberString = "";

document.addEventListener("DOMContentLoaded", () => {
  btn.forEach((b) => b.addEventListener("click", input));
});

const input = (event) => {
  let element = event.target.dataset.item;

  console.log("element: " + element);

  if (element === "ON") {
    if (display.classList.contains("on")) {
      display.classList.toggle("on");
      clear();
    } else {
      display.classList.toggle("on");
    }
  }

  if (display.classList.contains("on")) {
    console.log(element);
    if (clr.test(element)) {
      clear();
    }
    if (deleteSymbol.test(element)) {
      display.value = display.value.slice(0, -1);
    }

    switch (element) {
      case ".":
        pointThing();
        break;

      case "=":
        calc();
        break;

      default:
        let prevElement = getPrevElement();

        if (isNumber.test(element)) {
          if (isOperator.test(prevElement)) {
            display.value = element;
          } else {
            display.value += element;
          }
          numberString += element;
        } else if (isOperator.test(element)) {
          showOperator(element);
          append(element);
        }
    }
  } else {
    console.log("Calculator is off!");
  }
};

function append(element) {
  numberString += element;
}
function showNumber(element) {
  display.value += element;
}
function showOperator(element) {
  display.value = element;
}
function getPrevElement() {
  return display.value.slice(-1);
}

function pointThing() {
  if (decimalPoint.test(display.value.slice(0, -1))) {
  } else {
    showNumber(".");
  }
}

function clear() {
  display.value = "";
  numberString = "";
  console.clear();
}

function calc() {
  try {
    result = eval(numberString);
    display.value = result;
  } catch (error) {
    display.value = "ERROR";
  }
}
