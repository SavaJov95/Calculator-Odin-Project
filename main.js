const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const display = document.querySelector(".input");

digitBtns.forEach((digit) => {
  digit.addEventListener("click", displayDigits);
});
operatorBtns.forEach((operator) => {
  operator.addEventListener("click", useOperators);
});
equalBtn.addEventListener("click", () => {
  const value = display.value;
  decimalFix(value);
});
clearBtn.addEventListener("click", () => {
  display.value = "";
});
deleteBtn.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});

function displayDigits(e) {
  const value = display.value;
  const buttonValue = e.target.innerText;
  const dotCounter = value.match(/[.]/g);
  const operatorCounter = value.match(/[-+/*]/g);
  if (value.length > 11) {
    return false;
  }
  if (
    (buttonValue === "." &&
      (!value.slice(-1).match(/\d/) ||
        dotCounter?.length > operatorCounter?.length)) ||
    value === 0
  ) {
    return false;
  } else {
    display.value += buttonValue;
  }
}

function useOperators(e) {
  const buttonValue = e.target.innerText;
  const value = display.value;
  if (value.length > 11) {
    return false;
  }
  if (value.match(/[-+/*]/) && value.slice(-1).match(/\d/)) {
    display.value = decimalFix(value);
  }
  if (value.slice(-1).match(/\d/)) {
    display.value += buttonValue;
  }
}

function toOperate(value) {
  const splittedValue = value.split(/[-+/*]/);
  const a = Number(splittedValue[0]);
  const b = Number(splittedValue[1]);
  const operator = value.match(/[-+/*]/)[0];
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
  }

  return result;
}

function decimalFix(value) {
  const number = toOperate(value).toString();
  const numberString = toOperate(value).toString().indexOf(".");
  if (numberString === -1) {
    display.value = toOperate(value);
  } else if (number.length - numberString + 1 > 2) {
    display.value = toOperate(value).toFixed(2);
  } else {
    display.value = toOperate(value);
  }
  return display.value;
}

// function add(a, b) {
//   return a + b;
// }
// function subtract(a, b) {
//   return a - b;
// }
// function multiply(a, b) {
//   return a * b;
// }
// function divide(a, b) {
//   return a / b;
// }
