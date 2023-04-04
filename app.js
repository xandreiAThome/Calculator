let operator = [];
let firstNum = "";
let secondNum = "";
let ans = "";
let consec = false;

function evaluate() {
  switch (operator[0]) {
    case "+":
      add(firstNum, secondNum);
      empty();
      break;
  }
}

function add(numA, numB) {
  let sum = parseFloat(numA) + parseFloat(numB);
  lowerScreen.innerHTML = "";
  lowerScreen.innerHTML = sum;
  ans = String(sum);
  consec = true;
}

function subtract() {}

function multiply() {}

function divide() {}

function percentage() {}

function squareRoot() {}

// empties varianbles
function empty() {
  operator = [];
  firstNum = "";
  secondNum = "";
}

const lowerScreen = document.querySelector(".lower-screen");
const upperScreen = document.querySelector(".upper-screen");

// Records the typed numbers in the calculator
const numbers = document.querySelectorAll(".numbers");
numbers.forEach((n) => {
  n.addEventListener("click", (e) => {
    if (consec) {
      upperScreen.innerHTML = "";
      lowerScreen.innerHTML = "";
      consec = false;
    }

    if (operator.length === 0) {
      firstNum += e.target.innerHTML;
      lowerScreen.innerHTML = "";
      lowerScreen.innerHTML = firstNum;
    } else {
      secondNum += e.target.innerHTML;
      lowerScreen.innerHTML = "";
      lowerScreen.innerHTML = secondNum;
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
    if (operator.length <= 2) {
      if (firstNum.length !== 0) {
        // if there is a typed number
        if (e.target.innerHTML !== "=") {
          let op = document.createTextNode(firstNum + e.target.innerHTML);
          upperScreen.appendChild(op);
        }

        operator.push(e.target.innerHTML);

        if (operator.length === 2 && operator[1] === "=") {
          let sec = document.createTextNode(secondNum);
          upperScreen.appendChild(sec);
          evaluate();
        }
      }
    }
  });
});
