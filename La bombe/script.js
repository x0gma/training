////////////////////////////////////CONSTANTES ET VARIABLES //////////////////////////////////////////////////////////////////////////
const body = document.getElementById("body");
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("startDefusing");

const radioButtons = document.querySelectorAll('input[name="wireRadio"]');
const wireImg = document.querySelector(".wire-img");
const checkbox = document.querySelector(".checkbox");

const audio1 = new Audio();
audio1.src =
  "./assets/audio/Suspense Musique Trailer épique - Musique de fond instrumentale libre de droits.mp3";
const audio2 = new Audio();
audio2.src = "./assets/audio/Victory Music - Sound Effect for editing.mp3";
const audio3 = new Audio();
audio3.src = "./assets/audio/221.mp3";
const volume = document.getElementById("volume");

const leftLight = document.querySelector(".left-light");
const rightLight = document.querySelector(".right-light");

const module1 = document.querySelector(".module1");
const module1Question = document.getElementById("module1Question");
const module1AnswerData = document.getElementById("module1Answer");
const module1Submit = document.getElementById("module1Submit");

const module2 = document.querySelector(".module2");

const finalSubmit = document.getElementById("finalSubmit");

let isAudioMuted = false;

let module1IsSolved = false;
let module2IsSolved = false;
let module3IsSolved = true;
let module4IsSolved = true;

let module1Answer;
let a1 = Math.floor(Math.random() * 100);
let b1 = Math.floor(Math.random() * 100);

let timeout;
let totalSeconds = 60;
let firstExeStart = true;
let firstExeFinal = true;

//////////////////////////////////////////MUTE BUTTON//////////////////////////////////////////////////////////////////////
const toggleAudioMute = () => {
  if (isAudioMuted) {
    volume.innerHTML = `<span id="volume"><i class="fa-solid fa-volume-high"></i></span>`;
    audio1.volume = 1;
    audio2.volume = 1;
    audio3.volume = 1;
  } else {
    volume.innerHTML = `<span><i class="fa-solid fa-volume-xmark"></i></span>`;
    audio1.volume = 0;
    audio2.volume = 0;
    audio3.volume = 0;
  }
  isAudioMuted = !isAudioMuted;
};

volume.addEventListener("click", toggleAudioMute);

//////////////////////////////////////////COMPTE A REBOURS///////////////////////////////////////////////////////////////////
const timeDisplay = () => {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let sec = seconds < 10 ? "0" + seconds : seconds;
  let min = minutes < 10 ? "0" + minutes : minutes;
  timer.textContent = `${min} : ${sec}`;

  if (totalSeconds < 0) {
    clearTimeout(timeout);
    finalSubmit.style.background = "red";
    body.style.background = "red";
    timer.textContent = "VOUS ETES MORT !";
    leftLight.style.background = "red";
    rightLight.style.background = "red";
    audio3.play();
    audio1.volume = 0;
    audio2.volume = 0;
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
    body.style.background = "yellow";
  } else {
    leftLight.style.background = "orange";
    rightLight.style.background = "red";
    body.style.background = "orange";
  }

  timeout = setTimeout(timeDisplay, 1000);
};

////////////////////////////////////////////////////////////////// MODULE 1 ////////////////////////////////////////////////////////////////////////
const module1App = () => {
  module1Question.innerHTML = `${a1} + ${b1} ?`;
};

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

//////////////////////////////////////////////////////////////MODULE 2 ////////////////////////////////////////////////////////////////////////////////////

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    let firstExeModule2 = true;
    let chosenWire = e.target.id;
    console.log(chosenWire);

    if (firstExeModule2 == false) {
      return;
    } else {
      wireImg.style.background = `url(../assets/img/${chosenWire}.png) center/contain no-repeat`;
      checkbox.style.display = "none";
    }

    if (chosenWire == "blueWire") {
      module2IsSolved = true;
    } else {
      return;
    }
  });
});

/////////////////////////////////////////////////////////START BUTTON ET FINAL SUBMIT//////////////////////////////////////////////////////////////////////

startBtn.addEventListener("click", () => {
  if (firstExeStart == false) {
    return;
  } else {
    firstExeStart = false;
    module1App();
    module1.style.opacity = 1;
    module2.style.opacity = 1;
    clearTimeout(timeout);
    timeDisplay();
    audio1.play();
    startBtn.textContent = "Rechargez la page (f5) pour recommencer";
  }
});

finalSubmit.addEventListener("click", () => {
  if (firstExeFinal == false) {
    return;
  } else {
    firstExeFinal = true;
    audio1.pause();

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
      audio2.play();
    } else {
      clearTimeout(timeout);
      finalSubmit.style.background = "red";
      body.style.background = "red";
      timer.textContent = "VOUS ETES MORT !";
      leftLight.style.background = "red";
      rightLight.style.background = "red";
      audio3.play();
    }
  }
});
