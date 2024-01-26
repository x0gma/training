let cseconds = 0;
let seconds = 0;
let minutes = 0;

let startState = false;

let stopBtn = document.getElementById("stop");

const timeGo = () => {
  if (startState === false) {
    return;
  } else {
    cseconds++;
    if (cseconds >= 100) {
      cseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    timeDisplay();
    timeout = setTimeout(timeGo, 10);
  }
};

const timeDisplay = () => {
  let time = document.getElementById("time-display");
  let csec = cseconds < 10 ? "0" + cseconds : cseconds;
  let sec = seconds < 10 ? "0" + seconds : seconds;
  let min = minutes < 10 ? "0" + minutes : minutes;

  time.innerHTML = `${min} : ${sec} : ${csec}`;
};

start.addEventListener("click", () => {
  if (startState === true) {
    return;
  } else {
    startState = true;
    timeGo();
  }
});

stopBtn.addEventListener("click", () => {
  startState = false;
  clearTimeout(timeout);
});

reset.addEventListener("click", () => {
  startState = false;
  cseconds = 0;
  seconds = 0;
  minutes = 0;
  timeDisplay();
  clearTimeout(timeout);
});

timeDisplay();
