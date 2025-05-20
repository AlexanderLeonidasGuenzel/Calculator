const display = document.querySelector(".display");
const btn = document.querySelectorAll(".button");

let result = "";
let numberString = "";

document.addEventListener("DOMContentLoaded", () => {
  btn.forEach((b) => b.addEventListener("click", input));
});

const input = (event) => {
  let element = event.target.innerHTML;

  switch (element) {
    case "C":
      display.value = "";
      numberString = "";
      console.clear();
      break;
    case "⬅":
      display.value = display.value.slice(0, -1);
      break;
    case ".":
      if (display.value.slice(-1) === ".") {
        break;
      } else if (display.value.includes(".")) {
        break;
      } else {
        console.log("element: " + element);
        display.value += element;
        break;
      }

    case "=":
      console.log(numberString);
      result = eval(numberString);
      display.value = result;
      break;

    default:
      const isOperator = /[+\-*/]/;
      const isNumber = /\d/;
      let prevElement = display.value.slice(-1);
      if (isNumber.test(element)) {
        if (isOperator.test(prevElement)) {
          display.value = element;
        } else {
          display.value += element;
        }
        numberString += element;
      } else if (isOperator.test(element)) {
        display.value = element;
        numberString += element;
      }
  }
};

// const input = (event) => {
//   let element = event.target.innerHTML;

//   switch (element) {
//     case "C":
//       display.value = "";
//       result = "";
//       break;
//     case "⬅":
//       display.value = display.value.slice(0, -1);
//       break;
//     case ".":
//       if (display.value.slice(-1) === ".") {
//         break;
//       } else if (display.value.includes(".")) {
//         break;
//       } else {
//         console.log("element: " + element);
//         display.value += element;
//         break;
//       }

//     case "=":
//       result = eval(display.value);
//       display.value += element + result;
//       break;

//     default:
//       if (result === "") {
//         display.value += element;
//       } else {
//         if (
//           element === "+" ||
//           element === "-" ||
//           element === "*" ||
//           element === "/" ||
//           element === "%"
//         ) {
//           display.value = "";
//           display.value += result + element;
//           result = "";
//         } else {
//           display.value = "";
//           display.value += element;
//           result = "";
//         }
//       }
//   }
// };
