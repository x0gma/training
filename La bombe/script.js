const body = document.getElementById("body");
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("startDefusing");

const leftLight = document.querySelector(".left-light");
const rightLight = document.querySelector(".right-light");

const module1 = document.querySelector(".module1");
const module1Question = document.getElementById("module1Question");
const module1AnswerData = document.getElementById("module1Answer");
const module1Submit = document.getElementById("module1Submit");

const finalSubmit = document.getElementById("finalSubmit");

let module1IsSolved = false;
let module2IsSolved = true;
let module3IsSolved = true;
let module4IsSolved = true;

let module1Answer;
let a1 = Math.floor(Math.random() * 100);
let b1 = Math.floor(Math.random() * 100);

let timeout;
let totalSeconds = 120;
let firstExe = true;

const timeDisplay = () => {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let sec = seconds < 10 ? "0" + seconds : seconds;
  let min = minutes < 10 ? "0" + minutes : minutes;
  timer.textContent = `${min} : ${sec}`;

  if (totalSeconds < 0) {
    timer.textContent = "C'est terminé !";
    return;
  } else {
    totalSeconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
  }

  if (totalSeconds % 2 == 0) {
    leftLight.style.background = "red";
    rightLight.style.background = "orange";
  } else {
    leftLight.style.background = "orange";
    rightLight.style.background = "red";
  }

  timeout = setTimeout(timeDisplay, 1000);
};

const module1App = () => {
  module1Question.innerHTML = `${a1} + ${b1} ?`;
};

startBtn.addEventListener("click", () => {
  if (firstExe == false) {
    return;
  } else {
    firstExe = false;
    module1App();
    module1.style.opacity = 1;
    clearTimeout(timeout);
    timeDisplay();
  }
});

module1AnswerData.addEventListener("input", (e) => {
  module1Answer = e.target.value;
});

module1Submit.addEventListener("click", () => {
  module1Submit.style.background = "green";
  module1Submit.textContent =
    "Appuyez de nouveau si vous changez votre réponse";
  if (parseInt(module1Answer) === a1 + b1) {
    module1IsSolved = true;
  }
});

finalSubmit.addEventListener("click", () => {
  if (
    module1IsSolved &&
    module2IsSolved &&
    module3IsSolved &&
    module4IsSolved
  ) {
    clearTimeout(timeout);
    finalSubmit.style.background = "green";
    body.style.background = "greenyellow";
    timer.textContent = "VOUS AVEZ REUSSI !";
    leftLight.style.background = "green";
    rightLight.style.background = "green";
  } else {
    clearTimeout(timeout);
    finalSubmit.style.background = "red";
    body.style.background = "red";
    timer.textContent = "VOUS ETES MORT !";
    leftLight.style.background = "red";
    rightLight.style.background = "red";
  }
});
