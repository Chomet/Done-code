"use strict";

const modal = document.querySelector(".modal");
console.log(modal);
const overlay = document.querySelector(".overlay");
console.log(overlay);
const closeModal = document.querySelector(".close-modal");
console.log(closeModal);
//Select all classes with same element
//Similar behaviour as array
const openModal = document.querySelectorAll(".show-modal");
console.log(openModal);

//we remove hidden part from the classes to show them
const hideModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//we add hidden part from the classes to show them
const showModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < openModal.length; i++) {
  console.log(openModal[i].textContent);
  openModal[i].addEventListener("click", showModal);
}

closeModal.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);
document.addEventListener("keydown", function (event) {
  //object is created whenever key is pressed and stored in event
  console.log(event);
  //check if the Escape key is pressed
  //best way to see which exact string to match is to print whole event and see attributes
  //also check if the element is present in class
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    hideModal();
  }
});
