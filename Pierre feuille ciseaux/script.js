const rock = `<i class="fa-regular fa-hand-back-fist"></i>`;
const paper = `<i class="fa-regular fa-hand"></i>`;
const cisors = `<i class="fa-regular fa-hand-scissors"></i>`;
const choices = [rock, paper, cisors];
const buttons = document.querySelectorAll(".btn");

let playerScore = 0;
let computerScore = 0;

const scoreCalculator = () => {
  let player = playerChoice.innerHTML;
  let computer = computerChoice.innerHTML;

  if (
    (player === rock && computer === cisors) ||
    (player === paper && computer === rock) ||
    (player === cisors && computer === paper)
  ) {
    playerScore++;
    winChecker.innerHTML = `Gagné !`;
    winChecker.style.color = "green";
    playerScoreDisplay.innerHTML = `Votre score : ${playerScore}`;
  } else if (
    (player === rock && computer === paper) ||
    (player === paper && computer === cisors) ||
    (player === cisors && computer === rock)
  ) {
    computerScore++;
    winChecker.innerHTML = `Perdu !`;
    winChecker.style.color = "red";
    computerScoreDisplay.innerHTML = `Computer score : ${computerScore}`;
  } else {
    winChecker.innerHTML = `Egalité !`;
    winChecker.style.color = "black";
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "btn0":
        playerChoice.innerHTML = rock;
        break;

      case "btn1":
        playerChoice.innerHTML = paper;
        break;

      case "btn2":
        playerChoice.innerHTML = cisors;
        break;

      default:
        null;
    }
    computerChoice.innerHTML = choices[Math.floor(Math.random() * 3)];
    scoreCalculator();
  });
});

playerScoreDisplay.innerHTML = `Votre score : ${playerScore}`;
computerScoreDisplay.innerHTML = `Computer score : ${computerScore}`;

// Code optimisé d'après ChatGPT

// const SYMBOLS = {
//   rock: `<i class="fa-regular fa-hand-back-fist"></i>`,
//   paper: `<i class="fa-regular fa-hand"></i>`,
//   cisors: `<i class="fa-regular fa-hand-scissors"></i>`,
// };

// const choices = [SYMBOLS.rock, SYMBOLS.paper, SYMBOLS.cisors];
// const buttons = document.querySelectorAll(".btn");

// let playerScore = 0;
// let computerScore = 0;

// const winChecker = document.getElementById("winChecker");
// const playerScoreDisplay = document.getElementById("playerScoreDisplay");
// const computerScoreDisplay = document.getElementById("computerScoreDisplay");

// const scoreCalculator = () => {
//   let player = playerChoice.innerHTML;
//   let computer = computerChoice.innerHTML;

//   if (
//     (player === SYMBOLS.rock && computer === SYMBOLS.cisors) ||
//     (player === SYMBOLS.paper && computer === SYMBOLS.rock) ||
//     (player === SYMBOLS.cisors && computer === SYMBOLS.paper)
//   ) {
//     playerScore++;
//     displayScore("Gagné !", "green", playerScore, playerScoreDisplay);
//   } else if (
//     (player === SYMBOLS.rock && computer === SYMBOLS.paper) ||
//     (player === SYMBOLS.paper && computer === SYMBOLS.cisors) ||
//     (player === SYMBOLS.cisors && computer === SYMBOLS.rock)
//   ) {
//     computerScore++;
//     displayScore("Perdu !", "red", computerScore, computerScoreDisplay);
//   } else {
//     displayScore("Égalité !", "black", playerScore, playerScoreDisplay);
//   }
// };

// const displayScore = (message, color, score, displayElement) => {
//   winChecker.innerHTML = message;
//   winChecker.style.color = color;
//   displayElement.innerHTML = `Score : ${score}`;
// };

// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     switch (e.target.id) {
//       case "btn0":
//         playerChoice.innerHTML = SYMBOLS.rock;
//         break;

//       case "btn1":
//         playerChoice.innerHTML = SYMBOLS.paper;
//         break;

//       case "btn2":
//         playerChoice.innerHTML = SYMBOLS.cisors;
//         break;

//       default:
//         null;
//     }

//     computerChoice.innerHTML = choices[Math.floor(Math.random() * 3)];
//     scoreCalculator();
//   });
// });

// displayScore("", "black", playerScore, playerScoreDisplay);
// displayScore("", "black", computerScore, computerScoreDisplay);
