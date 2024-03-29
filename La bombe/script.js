// //////////////////////////////////////// Constantes et variables////////////////////////////////////////////////////////
const body = document.getElementById("body");
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("startDefusing");
const radioButtons = document.querySelectorAll('input[name="wireRadio"]');
const wireImg = document.querySelector(".wire-img");
const checkbox = document.querySelector(".checkbox");
const audio1 = new Audio(
  "./assets/audio/Suspense Musique Trailer épique - Musique de fond instrumentale libre de droits.mp3"
);
const audio2 = new Audio(
  "./assets/audio/Victory Music - Sound Effect for editing.mp3"
);
const audio3 = new Audio("./assets/audio/221.mp3");
const volume = document.getElementById("volume");
const leftLight = document.querySelector(".left-light");
const rightLight = document.querySelector(".right-light");
const module1 = document.querySelector(".module1");
const module1Question = document.getElementById("module1Question");
const module1AnswerData = document.getElementById("module1Answer");
const module1Submit = document.getElementById("module1Submit");
const module2 = document.querySelector(".module2");
const module3 = document.querySelector(".module3");
const module3Submit = document.getElementById("module3Btn");
const module3Light = document.querySelector(".module3Light");
const finalSubmit = document.getElementById("finalSubmit");
let isAudioMuted = false;
let module1IsSolved = false,
  module2IsSolved = false,
  module3IsSolved = false,
  module4IsSolved = true;
let module1Answer,
  a1 = Math.floor(Math.random() * 100),
  b1 = Math.floor(Math.random() * 100);
let timeout,
  totalSeconds = 10;
(firstExeStart = true),
  (firstExeFinal = true),
  (firstExeModule2 = true),
  (firstExeModule3 = true);

// //////////////////////////////////////////////////////// Fonction pour activer ou désactiver tous les sons ////////////////////////////////////////////////////////
const toggleAudioMute = () => {
  volume.innerHTML = `<span><i class="fa-solid ${
    isAudioMuted ? "fa-volume-high" : "fa-volume-xmark"
  }"></i></span>`;
  audio1.volume = audio2.volume = audio3.volume = isAudioMuted ? 1 : 0;
  isAudioMuted = !isAudioMuted;
};

volume.addEventListener("click", toggleAudioMute);

// //////////////////////////////////////////////////////// Compte à rebours////////////////////////////////////////////////////////
const timeDisplay = () => {
  if (totalSeconds <= 0) {
    clearTimeout(timeout);
    finalSubmit.style.background =
      body.style.background =
      leftLight.style.background =
      rightLight.style.background =
        "red";
    timer.textContent = "VOUS ETES MORT !";
    audio3.play();
    audio1.volume = audio2.volume = 0;
    return;
  } else {
    totalSeconds--;
  }

  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const sec = seconds < 10 ? "0" + seconds : seconds;
  const min = minutes < 10 ? "0" + minutes : minutes;
  timer.textContent = `${min}:${sec}`;

  [
    leftLight.style.background,
    rightLight.style.background,
    body.style.background,
  ] =
    totalSeconds % 2 === 0
      ? ["red", "orange", "yellow"]
      : ["orange", "red", "orange"];

  timeout = setTimeout(timeDisplay, 1000);
};

// ////////////////////////////////////////////////////////Module 1////////////////////////////////////////////////////////
const module1App = () => {
  module1Question.innerHTML = `${a1} + ${b1} ?`;
};

module1AnswerData.addEventListener(
  "input",
  (e) => (module1Answer = e.target.value)
);

module1Submit.addEventListener("click", () => {
  module1Submit.style.background = "green";
  module1Submit.textContent =
    "Appuyez de nouveau si vous changez votre réponse";
  module1IsSolved = parseInt(module1Answer) === a1 + b1;
});

// ////////////////////////////////////////////////////////Module 2///////////////////////////////////////////////////////

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (firstExeModule2) {
      const chosenWire = e.target.id;
      wireImg.style.background = `url(../assets/img/${chosenWire}.png) center/contain no-repeat`;
      checkbox.style.display = "none";
      module2IsSolved = chosenWire === "blueWire";
      firstExeModule2 = false;
    }
  });
});

// ////////////////////////////////////////////////////////Module 3////////////////////////////////////////////////////////

const module3App = () => {
  if (firstExeModule3 == false) {
    return;
  } else {
    firstExeModule3 = false;
    let unite = totalSeconds % 10;
    if (unite === 5) {
      module3IsSolved = true;
    } else {
      return;
    }
  }
};

module3Submit.addEventListener("click", () => {
  module3App();
  module3Light.style.background = "yellow";
});

// ////////////////////////////////////////////////////////Start Button et Final Submit////////////////////////////////////////////////////////
startBtn.addEventListener("click", () => {
  if (firstExeStart) {
    firstExeStart = false;
    module1App();
    [module1.style.opacity, module2.style.opacity, module3.style.opacity] = [
      1, 1, 1,
    ];
    clearTimeout(timeout);
    timeDisplay();
    audio1.play();
    startBtn.textContent = "Rechargez la page pour recommencer";
  } else {
    location.reload();
  }
});

finalSubmit.addEventListener("click", () => {
  if (firstExeFinal) {
    firstExeFinal = false;
    audio1.pause();

    if (
      module1IsSolved &&
      module2IsSolved &&
      module3IsSolved &&
      module4IsSolved
    ) {
      clearTimeout(timeout);
      [
        finalSubmit.style.background,
        body.style.background,
        timer.textContent,
        leftLight.style.background,
        rightLight.style.background,
      ] = ["green", "greenyellow", "VOUS AVEZ REUSSI !", "green", "green"];
      audio2.play();
    } else {
      clearTimeout(timeout);
      [
        finalSubmit.style.background,
        body.style.background,
        timer.textContent,
        leftLight.style.background,
        rightLight.style.background,
      ] = ["red", "red", "VOUS ETES MORT !", "red", "red"];
      audio3.play();
    }
  }
});
