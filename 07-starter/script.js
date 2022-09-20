"use strict";

//# is used for selecting ids
const player1Score = document.querySelector("#score--0");
//second way for getting id, little faster
const player2Score = document.getElementById("score--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");

//Preparations, fixing initial HTML file
let currentPlayer, currentScore, playerScores;
initialization();

//Roll button
//Rolls the dice and updates current score of active player
//If 1 is rolled, changes player instead
//Do nothing is victory is achieved
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (playerScores[0] < 100 && playerScores[1] < 100) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    //Accessing src attribute for class
    dice.src = "dice-" + diceRoll + ".png";
    if (diceRoll > 1) {
      currentScore += diceRoll;
      document.getElementById("current--" + currentPlayer).textContent =
        currentScore;
    } else changePlayer();
  }
});

//Hold button
//Updates the total score for of active player
//Checks if the game is finished and changes player if it is not
//Do nothing is victory is achieved
document.querySelector(".btn--hold").addEventListener("click", function () {
  if (playerScores[0] < 100 && playerScores[1] < 100) {
    playerScores[currentPlayer] += currentScore;
    document.querySelector("#score--" + currentPlayer).textContent =
      playerScores[currentPlayer];
    if (playerScores[currentPlayer] > 99) {
      document
        .querySelector(".player--" + currentPlayer)
        .classList.add("player--winner");
      dice.classList.add("hidden");
    } else changePlayer();
  }
});

//New game button
//Reset everything and make 1st player active
document.querySelector(".btn--new").addEventListener("click", function () {
  initialization();
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  player2.classList.remove("player--active");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--0");
});

//Initialize parameters
function initialization() {
  currentPlayer = 0;
  currentScore = 0;
  playerScores = [0, 0];
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  dice.classList.add("hidden");
}

//Changes player
//Reset current score to 0 for current player, change player and change graphic appearance of background of both players
function changePlayer() {
  currentScore = 0;
  document.getElementById("current--" + currentPlayer).textContent =
    currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  //toggling either adds parameter to class or removes it
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}
