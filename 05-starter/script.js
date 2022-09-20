"use strict";
/*
//returns everything under first class with this name
console.log(document.querySelector(".message"));
console.log(document.querySelector(".label-score"));
console.log(document.querySelector(".label-highscore"));
//returns only text under first class 
console.log(document.querySelector(".message").textContent);

//set text under class 
document.querySelector(".message").textContent = "Correct!!!!";
document.querySelector(".number").textContent = 15;
document.querySelector(".score").textContent = 15;
//get value from class 
console.log(document.querySelector(".guess").value);
//set value from class 
document.querySelector(".guess").value = 18;
console.log(document.querySelector(".guess").value);
*/

//change color of element format is #rrggbb
//look for color on Google, search CSS colors to hex
/* document.querySelector("body").style.backgroundColor = "#e00b0b"
 */

//change parameter of class
/*document.querySelector(".number").style.width = "25rem";
  document.querySelector(".number").style.fontSize = "9rem";
  document.querySelector(".number").style.color = "#2fdf28";
*/

let score = Number(document.querySelector(".score").textContent);
let highscore = Number(document.querySelector(".highscore").textContent);
let randomnumber = Math.trunc(Math.random() * 20) + 1;
let victoryachieved = false;
console.log(randomnumber);

document.querySelector(".check").addEventListener("click", function () {
  checkGuess();
});
document.querySelector(".again").addEventListener("click", function () {
  reset();
});

//covers check button
function checkGuess() {
  if (victoryachieved) return;
  const guess = Number(document.querySelector(".guess").value);
  if (score === 0) {
    document.querySelector(".message").textContent = "Game over :(";
  } else if (guess < 1 || guess > 20) {
    document.querySelector(".message").textContent =
      "Only numbers between 1 and 20!";
  } else if (guess > randomnumber) {
    wrongGuess(guess, "Too high!");
  } else if (guess < randomnumber) {
    wrongGuess(guess, "Too low!");
  } else {
    document.querySelector("body").style.backgroundColor = "#0dcd0d";
    document.querySelector(".number").style.width = "25rem";
    document.querySelector(".number").style.fontSize = "9rem";
    document.querySelector(".number").style.color = "#2fdf28";
    document.querySelector(".message").textContent = "Victory!";
    document.querySelector(".number").textContent = guess;
    victoryachieved = true;
    if (score > highscore) {
      document.querySelector(".highscore").textContent = score;
      highscore = score;
    }
  }
}

//guess is too high or too low
function wrongGuess(wrongGuess, displayText) {
  score -= 1;
  if (score === 0) {
    document.querySelector("body").style.backgroundColor = "#e00b0b";
    document.querySelector(".message").textContent = "Game over :(";
  } else {
    document.querySelector(".message").textContent = displayText;
  }
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = wrongGuess;
}

//covers reset button
function reset() {
  randomnumber = Math.trunc(Math.random() * 20) + 1;
  console.log(randomnumber);
  score = 20;
  victoryachieved = false;
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".highscore").textContent = highscore;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").style.fontSize = "6rem";
  document.querySelector(".number").style.color = "#333";
}
