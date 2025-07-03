const display = document.querySelector(".display");
const btn = document.querySelectorAll(".button");
const btnOn = document.querySelector(".on-off");
const light = document.querySelector(".light");
const isOperator = /[+\-*/]/;
const isNumber = /\d/;
const deleteSymbol = /DEL/;
const decimalPoint = /./;

let result = "";
let numberString = "";

document.addEventListener("DOMContentLoaded", () => {
  btnOn.addEventListener("click", powerOn);
});

const powerOn = (event) => {
  let item = event.target.dataset.item;
  if (item === "ON") {
    switchOnOff();
  }
};

const input = (event) => {
  let item = event.target.dataset.item;

  console.log(item);
  if (item === "CLR") {
    clear();
  }
  if (deleteSymbol.test(item)) {
    display.value = display.value.slice(0, -1);
  }

  switch (item) {
    case ".":
      pointThing();
      break;

    case "=":
      calc();
      break;

    default:
      let prevElement = getPrevElement();

      if (isNumber.test(item)) {
        if (isOperator.test(prevElement)) {
          display.value = item;
        } else {
          display.value += item;
        }
        numberString += item;
      } else if (isOperator.test(item)) {
        showOperator(item);
        append(item);
      }
  }
};

function switchOnOff() {
  if (display.classList.contains("on")) {
    display.classList.toggle("on");
    btn.forEach((b) => b.removeEventListener("click", input));
    clearDisplay();
  } else {
    display.classList.toggle("on");
    display.classList.add("animation");
    display.value = "       HELLO";
    setTimeout(() => {
      display.value = "";
      display.classList.remove("animation");
      btn.forEach((b) => b.addEventListener("click", input));
    }, 2500);
  }
}

function append(item) {
  numberString += item;
}
function showNumber(item) {
  display.value += item;
}
function showOperator(item) {
  display.value = item;
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

function clearDisplay() {
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
