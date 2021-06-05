// /*----- constants -----*/
let limitRound = 7;

/*----- app's state (variables) -----*/

let butonArray = [];
let playerArray = [];
let playerRecord = [];
let btnSelect = 0;
let currentRound = 0;
let numOfClick = 0;

/*----- cached element references -----*/
let inputEL = document.getElementById("inputs");
let playEL = document.getElementById("play");
let scoreEL = document.getElementById("score");
let modelEL = document.getElementById("mode");
let Snd0 = document.getElementById("00");
let Snd1 = document.getElementById("01");
let Snd2 = document.getElementById("02");
let Snd3 = document.getElementById("03");
let Snd4 = document.getElementById("04");
let sndStart = document.getElementById("start");
let sndAgain = document.getElementById("again");
playEL.textContent = "Play ?";
modelEL.textContent = "";
scoreEL.textContent = "State " + currentRound;
modelEL.style.opacity = 0;
inputEL.style.opacity = 1;
/*----- event listeners -----*/
function adPclick() {
  inputEL.addEventListener("click", handleClick);
}
function remPclick() {
  inputEL.removeEventListener("click", handleClick);
}
playEL.addEventListener("click", startTime);
playEL.addEventListener("click", playStartSound);

/*----- functions -----*/

function playSound(s) {
  if (s == 0) {
    Snd0.currentTime = 30.7;
    Snd0.play();
  } else if (s == 1) {
    Snd1.currentTime = 30.7;
    Snd1.play();
  } else if (s == 2) {
    Snd2.currentTime = 30.7;
    Snd2.play();
  } else if (s == 3) {
    Snd3.currentTime = 30.7;
    Snd3.play();
  } else {
    Snd4.currentTime = 30.7;
    Snd4.play();
  }
}

function playStartSound() {
  sndStart.currentTime = 30.6;
  sndStart.play();
}

/// handles the player input below

function handleClick(evt) {
  evt.target.style.opacity = 0; ////  fade effect
  btnSelect = evt.target.id;
  fadeBack(evt);
  playerArray.push(btnSelect); /// build the  P array
  playSound(btnSelect);
  //compare the value being pushed to same index in the butonArray
  compareArray(btnSelect);
  function compareArray(bs) {
    if (playerArray[numOfClick] != butonArray[numOfClick]) {
      fadeAll();
    } else if (playerArray.length === butonArray.length) {
      setTimeout(computerTurn, 1000);
    }
  }
  numOfClick += 1;
}
function fadeBack(evt) {
  setTimeout(fade, 150);
  function fade() {
    evt.target.style.opacity = 1;
  }
}

///// functions below handle computer turn //////
function startTime(){
  setTimeout(computerTurn,1000);
  playlite()
  function playlite() {
    fadeOut();
    function fadeOut() {
      playEL.style.opacity = 0;
    }
    fadeIN();
    function fadeIN() {
      setTimeout(fade, 150);
      function fade() {
        playEL.style.opacity = 1;
      }
    }
  }
}


function computerTurn() {
  playEL.textContent = "";
  if (currentRound >= limitRound) {
    farEnough();
  }
  playerArray = [];
  numOfClick = 0;
  currentRound += 1;
  scoreEL.textContent = "State " + currentRound;
  adPclick();
  fillArray();
  lightButtons();
}
function fillArray() {
  butonArray.push(randomLight());
}
function randomLight() {
  return Math.floor(Math.random() * 5);
}
function lightButtons() {
  let timer = 300;
  for (let b of butonArray) {
    setTimeout(butlite, timer, b);

    function butlite(b) {
      playSound(b);
      fadeOut(b);
      function fadeOut(b) {
        document.getElementById(b).style.opacity = 0;
      }
      fadeIN(b);
      function fadeIN(b) {
        setTimeout(fade, 150);
        function fade() {
          document.getElementById(b).style.opacity = 1;
        }
      }
    }
    timer += 300; //// add delay to next light flash
  }
  playEL.removeEventListener("click", startTime);
}

function fadeAll() {
  sndAgain.play();
  modelEL.style.opacity = 1;
  modelEL.textContent = "Again ?";
  modelEL.addEventListener("click", resetGame);
  remPclick();
  inputEL.style.opacity = 0;
  playEL.style.opacity = 0;
  scoreEL.style.opacity = 0;
}

function farEnough() {
  remPclick();
  playEL.style.opacity = 0;
  scoreEL.style.opacity = 0;
  modelEL.style.opacity = 1;
  modelEL.textContent = "ThaTs Enough For Now";
  endArray = [
    4, 3, 4, 3, 2, 2, 0, 4, 4, 2, 1, 0, 4, 3, 3, 2, 1, 0, 4, 2, 1, 0, 3, 4, 2,
    1, 2, 1, 3, 4, 3, 1, 0,
  ];
  let wTimer = 100;
  for (let b of endArray) {
    wTimer += 100;
    setTimeout(butlite, wTimer, b);

    function butlite(b) {
      fadeOut(b);
      function fadeOut(b) {
        document.getElementById(b).style.opacity = 0;
      }
      fadeIN(b);
      function fadeIN(b) {
        setTimeout(fade, 300);
        function fade() {
          document.getElementById(b).style.opacity = 1;
        }
      }
      setTimeout(resetGame, 5500);
    }
  }
}

function resetGame() {
  modelEL.removeEventListener("click", resetGame);
  playEL.addEventListener("click", startTime);
  sndAgain.pause();
  remPclick();
  butonArray = [];
  playerArray = [];
  btnSelect = 0;
  currentRound = 0;
  numOfClick = 0;
  scoreEL.textContent = "State " + currentRound;
  playEL.textContent = "Play ?";
  modelEL.textContent = "";
  modelEL.style.opacity = 0;
  inputEL.style.opacity = 1;
  playEL.style.opacity = 1;
  scoreEL.style.opacity = 1;
}


