function evaluate() {}

function add() {}

function subtract() {}

function multiply() {}

function divide() {}

function percentage() {}

function squareRoot() {}

const screen = document.querySelector(".screen");

const numbers = document.querySelectorAll(".numbers");
numbers.forEach((n) => {
  n.addEventListener("click", (e) => {
    content = document.createTextNode(`${e.target.innerHTML}`);
    screen.appendChild(content);
  });
});
