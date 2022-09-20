"use strict";

//Default parameters
const bookList = [];
const createBooking = function (flightNumb, numPassengers = 1, price = "50$") {
  //Old
  //numPassengers = numPassengers || 1;
  //price = price || "50$";
  const booking = {
    flightNumb,
    numPassengers,
    price,
  };
  console.log(booking);
  bookList.push(booking);
};

createBooking("58AS", 156, "83,2$");
createBooking("58", 5);
//skipping parameters
createBooking("58", undefined, "15$");

//Pass via value vs pass via reference
const flight = "AB123";
const marin = {
  name: "Marin",
  passport: 454544,
};
const checkIn = function (flightNum, passenger) {
  flightNum = "AC456";
  passenger.name = "Mr. " + passenger.name;
  if (passenger.passport === 454544) {
    alert("Check");
  } else alert("Noooo");
};

checkIn(flight, marin);
//primitive type is copied so it wont be changed, its a different variable
//reference type is passed as a memory address so we change original
console.log(flight, marin);

//Functions accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...rest] = str.split(" ");
  return [first.toUpperCase(), ...rest].join(" ");
};
const transform = function (str, fun) {
  console.log(fun);
  console.log(fun.name);
  return fun(str);
};
console.log(transform("hmm wtf", oneWord));
console.log(transform("hmm wtf", upperFirstWord));
const react = function () {
  console.log("helloo");
};
document.body.addEventListener("click", react);
["A", "B", "C"].forEach(react);

//Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};
const greeter = greet("Pozdrav");
greeter("Marin");
greet("Immediate")("call");

const arrowGreet = greeting => names => console.log(`${greeting}, ${names}`);
arrowGreet("Greetings")("Marin");

//Call, apply and bind methods
const luft = {
  airline: "Lufthansa",
  code: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} with number ${this.code}:${flightNum}`
    );
    this.bookings.push({ flightNum, name });
  },
};
luft.book(52, "Marin");
luft.book(55, "Davor");
console.log(luft.bookings);
const newluft = {
  airline: "NewLufthansa",
  code: "LH2",
  bookings: [],
};
const bookFun = luft.book;
//first parameter tell on which object to we execute function
//call is modern method, same as apply if we dereference the array
bookFun.call(newluft, 86, "Matej");
bookFun.apply(newluft, [87, "Marko"]);
bookFun.call(newluft, ...[87, "Marko"]);
//bind
//it does not executes function, it returns new function with this.variables pointing to right object (being binded to it)
const bookNewLuft = bookFun.bind(newluft);
bookNewLuft(44, "Ante");
const bookNewLuft23 = bookFun.bind(newluft, 23);
bookNewLuft23("Ante");
const bookNewLuftAnte = bookFun.bind(newluft, undefined, "Ante");
bookNewLuftAnte(18);
luft.planes = 500;
luft.buy = function () {
  this.planes++;
  console.log(this.planes);
};
document.querySelector(".buy").addEventListener("click", luft.buy.bind(luft));
const addTax = (rate, value) => value + value * rate;
//We use null if we dont care about this keyword
//We basically create new specific function from the same function
const addConstTax = addTax.bind(null, 0.1);
console.log(addConstTax(18));

//IIFE
//we want some functions to be able to execute only once
(function () {
  console.log("Really only once!");
})();
(() => console.log("Really only once arrow!"))();

//Closures
const secured = function () {
  let count = 0;
  let testna = 0;
  return function () {
    let testna = 0;
    count++;
    testna++;
    console.log(`${count} passengers, ${testna} test`);
  };
};
const booker = secured();
const booker2 = secured();
//function which is returned remember all the variables it has in function which returns it
//it remembers even when the parent function finished executing
//that's why if we call this subfunction multiple times count variable will increase by 1 each time
//if the variable is redefined in subfunction, it is of course redeclared every time function is called
booker();
booker();
booker();
booker2();
booker2();
booker2();
let f;
const g = function () {
  const a = 15;
  f = function () {
    console.log(a + 5);
  };
};
const h = function () {
  const b = 10;
  f = function () {
    console.log(b + 5);
  };
};
//context is being changed depends on function which is called first
g();
f();
h();
f();
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  //timer function, code inside function will be executed after time in milliseconds
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`We start boarding in ${wait} seconds`);
};
boardPassengers(15, 2);
