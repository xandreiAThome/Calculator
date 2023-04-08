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
let consec = true;
let percentOp = false;
let squareRootOp = false;

const lowerScreen = document.querySelector(".lower-screen");
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
  // If there is still no first operator
  // First Number
  if ((firstOp === "" || firstOp === "√") && firstNum.length < 15) {
    if (e.target.innerHTML === "." && firstDot) {
      void 0;
    } else {
      firstNum += e.target.innerHTML;
      lowerScreen.innerHTML = "";
      lowerScreen.innerHTML = firstNum;

      if (e.target.innerHTML === ".") firstDot = true;
    }
    // if there is now a first operator
    // Second Number
  } else if (
    firstOp !== "" &&
    !percentOp &&
    !squareRootOp &&
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
    consec = true;
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
  consec = true;
  empty();
});

// Handles the input of operations
function inputOp(e) {
  // if first number is entered and there is still no first operator and the first operator is not an equal sign
  // Or if the first operator is a squareroot
  if (
    (e.target.innerHTML === "√" || firstNum !== "") &&
    firstOp === "" &&
    e.target.innerHTML !== "="
  ) {
    // if first operator is squareroot
    if (e.target.innerHTML === "√") {
      squareRootOp = true;
      firstOp = e.target.innerHTML;
      upperScreen.innerHTML = "";
      upperScreen.innerHTML = firstOp + firstNum;
    } else {
      firstOp = e.target.innerHTML;
      upperScreen.innerHTML = "";
      upperScreen.innerHTML = firstNum + firstOp;
    }
    // if evaluated already and inputted a operator right after
    if (evaluated) consec = true;

    if (e.target.innerHTML === "%") percentOp = true;

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
  } else if (firstOp === "%" && firstNum !== "") {
    secondOp = e.target.innerHTML;
    upperScreen.innerHTML = "";
    upperScreen.innerHTML = firstNum + firstOp;
    if (e.target.innerHTML === "=") {
      evaluated = true;
      consec = false;
    }
    evaluate();
  } else if (firstNum !== "" && firstOp === "√") {
    secondOp = e.target.innerHTML;
    upperScreen.innerHTML = "";
    upperScreen.innerHTML = firstOp + firstNum;
    if (e.target.innerHTML === "=") {
      evaluated = true;
      consec = false;
    }
    evaluate();
  }
}
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
  let ans = parseFloat(numA) + parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  if (ans.toFixed(5) % 1 === 0) {
    lowerScreen.innerHTML = ans;
    empty();
    firstNum = ans;
  } else {
    lowerScreen.innerHTML = ans.toFixed(5);
    empty();
    firstNum = ans.toFixed(5);
  }
  if (lastOp !== "=") firstOp = lastOp;
}

function subtract(numA, numB) {
  let ans = parseFloat(numA) - parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  if (ans.toFixed(5) % 1 === 0) {
    lowerScreen.innerHTML = ans;
    empty();
    firstNum = ans;
  } else {
    lowerScreen.innerHTML = ans.toFixed(5);
    empty();
    firstNum = ans.toFixed(5);
  }
  if (lastOp !== "=") firstOp = lastOp;
}

function multiply(numA, numB) {
  let ans = parseFloat(numA) * parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  if (ans.toFixed(5) % 1 === 0) {
    lowerScreen.innerHTML = ans;
    empty();
    firstNum = ans;
  } else {
    lowerScreen.innerHTML = ans.toFixed(5);
    empty();
    firstNum = ans.toFixed(5);
  }
  if (lastOp !== "=") firstOp = lastOp;
}

function divide(numA, numB) {
  let ans = parseFloat(numA) / parseFloat(numB);
  // if the second operator is not an equal sign, store the operator and make it the first operator for the subsequent expressions
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  if (ans.toFixed(5) % 1 === 0) {
    lowerScreen.innerHTML = ans;
    empty();
    firstNum = ans;
  } else {
    lowerScreen.innerHTML = ans.toFixed(5);
    empty();
    firstNum = ans.toFixed(5);
  }
  if (lastOp !== "=") firstOp = lastOp;
}

function percentage(numA) {
  let ans = parseFloat(numA) / 100;
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  if (ans.toFixed(5) % 1 === 0) {
    lowerScreen.innerHTML = ans;
    empty();
    firstNum = ans;
  } else {
    lowerScreen.innerHTML = ans.toFixed(5);
    empty();
    firstNum = ans.toFixed(5);
  }
  if (lastOp !== "=") firstOp = lastOp;
}

function squareRoot(numA) {
  let ans = Math.sqrt(parseFloat(numA));
  let lastOp = secondOp;
  lowerScreen.innerHTML = "";
  if (ans.toFixed(5) % 1 === 0) {
    lowerScreen.innerHTML = ans;
    empty();
    firstNum = ans;
  } else {
    lowerScreen.innerHTML = ans.toFixed(5);
    empty();
    firstNum = ans.toFixed(5);
  }

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
  percentOp = false;
  squareRootOp = false;
}
