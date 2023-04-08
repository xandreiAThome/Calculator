/**
    Calculator Pseudo Code
    
    1) Enters the first number
    2) Enters the arithmetic operation
    3) Enters the second number
    4) Enters the equal operator
    4.1) If another arithmetic operator is entered, evaluate the first expression before evaluating the latter one

    BEWARE OF SPAGHETTI CODE
 */

let firstNum = "";
let firstDot = false;
let firstOp = "";

let secondNum = "";
let secondDot = false;
let secondOp = "";

let evaluated = false;
let consec = false;

const lowerScreen = document.querySelector(".lower-screen");
window.addEventListener("load", function (e) {
  var el = document.querySelector(".lower-screen");
  el.scrollLeft = el.scrollWidth;
});

const upperScreen = document.querySelector(".upper-screen");

// Records the typed numbers in the calculator
function inputNumbers(e) {
  // IF already evaluated and there is no consecutive operator then just empty the screen
  // checks first num is not empty because the answer from each evaluation is stored as the first num of a consecutive operation if there is any
  if (evaluated && firstNum !== "" && !consec) {
    upperScreen.innerHTML = "";
    empty();
    evaluated = false;
  }
  // If there is still no first operator or the first operator is a square root
  // First Number added
  if (
    (firstOp === "" || (firstOp === "√" && !consec)) &&
    firstNum.length < 15
  ) {
    // if current char is a dot and there is already a first dot then do nothing
    if (e.target.innerHTML === "." && firstDot) {
      void 0;
    } else {
      firstNum += e.target.innerHTML;
      lowerScreen.innerHTML = "";
      lowerScreen.innerHTML = firstNum;

      // if current char is a dot then make firstDot true so that there is only one dot for each Number
      if (e.target.innerHTML === ".") firstDot = true;
    }
    // if there is now a first operator
    // Second Number added
  } else if (
    firstOp !== "" &&
    firstOp !== "%" &&
    firstOp !== "√" &&
    secondNum.length < 15
  ) {
    if (e.target.innerHTML === "." && secondDot) {
      void 0;
    } else {
      secondNum += e.target.innerHTML;
      lowerScreen.innerHTML = "";
      lowerScreen.innerHTML = secondNum;

      if (e.target.innerHTML === ".") secondDot = true;
    }
  }
}
// event listener for the numbers buttons
const numbers = document.querySelectorAll(".numbers");
numbers.forEach((n) => {
  n.addEventListener("click", (e) => {
    inputNumbers(e);
  });
});

// Clears just the current number or operator
// Or if there is already an evaluated expression then clears it all
const CE = document.getElementById("CE-btn");
CE.addEventListener("click", (e) => {
  if (evaluated) {
    lowerScreen.innerHTML = "";
    upperScreen.innerHTML = "";
    evaluated = false;
    consec = false;
    empty();
  } else if (firstNum !== "" && firstOp === "") {
    firstNum = firstNum.slice(0, -1);
    lowerScreen.innerHTML = "";
    lowerScreen.innerHTML = firstNum;
  } else if (firstOp !== "" && secondNum !== "" && secondOp === "") {
    secondNum = secondNum.slice(0, -1);
    lowerScreen.innerHTML = "";
    lowerScreen.innerHTML = secondNum;
  }
});

// Clears all the stored operations and numbers
const AC = document.getElementById("AC-btn");
AC.addEventListener("click", (e) => {
  lowerScreen.innerHTML = "";
  upperScreen.innerHTML = "";
  evaluated = false;
  consec = false;
  empty();
});

// Handles the input of operations
function inputOp(e) {
  // if first number is entered and there is still no first operator and the first operator is not an equal sign
  // Or if the first operator is a squareroot
  // then add the first part of the expression to memory
  if (
    (e.target.innerHTML === "√" || firstNum !== "") &&
    firstOp === "" &&
    e.target.innerHTML !== "="
  ) {
    // if first operator is squareroot then it comes first before a number
    if (e.target.innerHTML === "√") {
      firstOp = e.target.innerHTML;
      upperScreen.innerHTML = "";
      upperScreen.innerHTML = firstOp + firstNum;
    } else {
      firstOp = e.target.innerHTML;
      upperScreen.innerHTML = "";
      upperScreen.innerHTML = firstNum + firstOp;
    }
    // if evaluated already and inputted a operator right after then it is a consecutive operation
    if (evaluated) consec = true;

    // if there is a first operator and second number entered then evaluate the expression
  } else if (firstOp !== "" && secondNum !== "") {
    secondOp = e.target.innerHTML;
    upperScreen.innerHTML = "";
    upperScreen.innerHTML = firstNum + firstOp + secondNum;
    // if the second operator is an equal sign then there is only one expression to evaluate
    // and it is not a consecutive operation of expressions
    if (e.target.innerHTML === "=") {
      evaluated = true;
      consec = false;
    }
    consec = true;
    evaluate();
    // if first operator is percentage and there is a first number then evaluate it already
    // because the percentage operator doesn't need a second number
  } else if (firstOp === "%" && firstNum !== "" && secondNum === "") {
    secondOp = e.target.innerHTML;
    upperScreen.innerHTML = "";
    upperScreen.innerHTML = firstNum + firstOp;
    if (e.target.innerHTML === "=") {
      evaluated = true;
      consec = false;
    }
    consec = true;
    evaluate();
    // if there is a first number and the first operator is a square root then evaluate it already
    // because the square root operator does't need a second number
  } else if (firstNum !== "" && firstOp === "√" && secondNum === "") {
    secondOp = e.target.innerHTML;
    upperScreen.innerHTML = "";
    upperScreen.innerHTML = firstOp + firstNum;
    if (e.target.innerHTML === "=") {
      evaluated = true;
      consec = false;
    }
    consec = true;
    evaluate();
  }
}
// event listener for the operators button
const operations = document.querySelectorAll(".operations");
operations.forEach((op) => {
  op.addEventListener("click", (e) => {
    inputOp(e);
  });
});

//////////////////////////////////////////////// Arithemetic functions below

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
    case "%":
      percentage(firstNum);
      break;
    case "√":
      squareRoot(firstNum);
      break;
  }
}

function add(numA, numB) {
  // make the numbers to string but fixed their decimals to just 5 digits, make the answer to number again to remove the trailing zeroes
  // and finally convert it to a string
  let ans = String(
    parseFloat((parseFloat(numA) + parseFloat(numB)).toFixed(5))
  );
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = ans;

  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  if (lastOp !== "=") firstOp = lastOp;
}

function subtract(numA, numB) {
  let ans = String(
    parseFloat((parseFloat(numA) - parseFloat(numB)).toFixed(5))
  );
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = ans;

  if (lastOp !== "=") firstOp = lastOp;
}

function multiply(numA, numB) {
  let ans = String(
    parseFloat((parseFloat(numA) * parseFloat(numB)).toFixed(5))
  );
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = ans;

  if (lastOp !== "=") firstOp = lastOp;
}

function divide(numA, numB) {
  let ans = String(
    parseFloat((parseFloat(numA) / parseFloat(numB)).toFixed(5))
  );
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = ans;

  if (lastOp !== "=") firstOp = lastOp;
}

function percentage(numA) {
  let ans = String(parseFloat((parseFloat(numA) / 100).toFixed(5)));
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = ans;

  if (lastOp !== "=") firstOp = lastOp;
}

function squareRoot(numA) {
  let ans = String(parseFloat(Math.sqrt(parseFloat(numA)).toFixed(5)));
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = ans;
  empty();
  firstNum = ans;

  if (lastOp !== "=") firstOp = lastOp;
}

// empties varianbles
function empty() {
  firstNum = "";
  secondNum = "";
  firstOp = "";
  secondOp = "";
  firstDot = false;
  secondDot = false;
}
