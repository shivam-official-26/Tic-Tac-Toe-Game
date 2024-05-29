const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
let XWins = document.querySelector(".XWins");
let ties = document.querySelector(".ties");
let OWins = document.querySelector(".OWins");
const turnPrinter = document.querySelector("#turnPrinter");
const popup = document.querySelector("#popup");
const closeBtn = document.querySelector("#closeBtn");

let turnX = true;
let winner;
let numbersOfTimeBtnClicked = 0;
let numbersOfTimeXWins = 0;
let numbersOfTimeOWins = 0;
let numbersOfTimeties = 0;
const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      turnPrinter.innerText = "O Turn";
      box.style.color = "#31C3BD";
      box.innerText = "X";
      turnX = false;
    } else {
      turnPrinter.innerText = "X Turn";
      box.style.color = "#F2B137";
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    turnX = true;
    turnPrinter.innerText = "X Turn";
  }
};

reset.addEventListener("click", () => {
  enableBtn();
});

closeBtn.addEventListener("click", () => {
  popup.style.visibility = "hidden";
  closeBtn.style.visibility = "hidden";
});

const showPopup = (message) => {
  popup.style.visibility = "visible";
  popup.innerHTML = message;
  closeBtn.style.visibility = "visible";
  numbersOfTimeBtnClicked = 0;
};

const checkWinner = () => {
  let isWinner = false;
  for (let pattern of winningPattern) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;
    if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        disableBtn();
        if (pos1Value === "X") {
          numbersOfTimeXWins++;
          XWins.innerText = `X - ${numbersOfTimeXWins}`;
          winner = "X";
          turnPrinter.innerText = `X Wins`;
        } else if (pos1Value === "O") {
          numbersOfTimeOWins++;
          OWins.innerText = `O - ${numbersOfTimeOWins}`;
          winner = "O";
          turnPrinter.innerText = `O Wins`;
        }
        showPopup(`Winner: ${winner}`);
        isWinner = true;
        break;
      }
    }
  }
  if (!isWinner && [...boxes].every((box) => box.innerText !== "")) {
    numbersOfTimeties++;
    ties.innerText = `Ties - ${numbersOfTimeties}`;
    showPopup("It's a Draw!");
    turnPrinter.innerText = "It's a Draw!";
  }
};
