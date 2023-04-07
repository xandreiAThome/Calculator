/**
    Calculator Pseudo Code
    
    1) Enters the first number
    2) Enters the arithmetic operation
    3) Enters the second number
    4) Enters the equal operator
    4.1) If another arithmetic operator is entered, evaluate the first expression before evaluating the latter one

 */

let firstNum = "";
let firstDot = false;
let firstOp = "";

let secondNum = "";
let secondDot = false;
let secondOp = "";

let evaluated = false;
let consec = true;

function evaluate() {
  switch (firstOp) {
    case "+":
      add(firstNum, secondNum);
      break;
    case "-":
      subtract(firstNum, secondNum);
      break;
    case "×":
      multiply(firstNum, secondNum);
      break;
    case "÷":
      divide(firstNum, secondNum);
      break;
  }
}

function add(numA, numB) {
  let ans = parseFloat(numA) + parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = String(ans);
  if (lastOp !== "=") firstOp = lastOp;
}

function subtract(numA, numB) {
  let ans = parseFloat(numA) - parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = String(ans);
  if (lastOp !== "=") firstOp = lastOp;
}

function multiply(numA, numB) {
  let ans = parseFloat(numA) * parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = String(ans);
  if (lastOp !== "=") firstOp = lastOp;
}

function divide(numA, numB) {
  let ans = parseFloat(numA) / parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = String(ans);
  if (lastOp !== "=") firstOp = lastOp;
}

function percentage() {}

function squareRoot() {}

// empties varianbles
function empty() {
  firstNum = "";
  secondNum = "";
  firstOp = "";
  secondOp = "";
  firstDot = false;
  secondDot = false;
}

const lowerScreen = document.querySelector(".lower-screen");
const upperScreen = document.querySelector(".upper-screen");

// Records the typed numbers in the calculator
const numbers = document.querySelectorAll(".numbers");
numbers.forEach((n) => {
  n.addEventListener("click", (e) => {
    // IF already evaluated and there is no consecutive operator then just empty the screen
    if (evaluated && firstNum !== "" && !consec) {
      upperScreen.innerHTML = "";
      empty();
      evaluated = false;
    }
    // If there is still no first operator
    if (firstOp === "") {
      if (e.target.innerHTML === "." && firstDot) {
        void 0;
      } else {
        firstNum += e.target.innerHTML;
        lowerScreen.innerHTML = "";
        lowerScreen.innerHTML = firstNum;

        if (e.target.innerHTML === ".") firstDot = true;
      }
      // if there is now a first operator
    } else if (firstOp !== "") {
      if (e.target.innerHTML === "." && secondDot) {
        void 0;
      } else {
        secondNum += e.target.innerHTML;
        lowerScreen.innerHTML = "";
        lowerScreen.innerHTML = secondNum;

        if (e.target.innerHTML === ".") secondDot = true;
      }
    }
  });
});

const CE = document.getElementById("CE-btn");
CE.addEventListener("click", (e) => {
  lowerScreen.innerHTML = "";
  upperScreen.innerHTML = "";
  empty();
});

// Handles the input of operations
const operations = document.querySelectorAll(".operations");
operations.forEach((op) => {
  op.addEventListener("click", (e) => {
    // if first number is entered and there is still no first operator
    if (firstNum !== "" && firstOp === "" && e.target.innerHTML !== "=") {
      firstOp = e.target.innerHTML;
      upperScreen.innerHTML = "";
      upperScreen.innerHTML = firstNum + firstOp;
      // if evaluated already and inputted a operator right after
      if (evaluated) consec = true;
      // if there is a first operator and second number entered
    } else if (firstOp !== "" && secondNum !== "") {
      secondOp = e.target.innerHTML;
      upperScreen.innerHTML = "";
      upperScreen.innerHTML = firstNum + firstOp + secondNum;
      if (e.target.innerHTML === "=") {
        evaluated = true;
        consec = false;
      }
      evaluate();
    }
  });
});
