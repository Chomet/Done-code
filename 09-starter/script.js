"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (start, main) {
    return [this.starterMenu[start], this.mainMenu[main]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDeliver: function ({ time, address, predjelo = 0, glavnojelo = 0 }) {
    console.log(
      `We received order of ${this.starterMenu[predjelo]} and ${this.mainMenu[glavnojelo]}`
    );
    console.log(
      `It will be delivered for address ${address} and planned time is ${time}`
    );
  },

  orderPasta: function (i1, i2, i3) {
    console.log(i1, i2, i3);
  },

  orderPizza: function (mainIngredient, ...restIngredients) {
    console.log(mainIngredient, restIngredients);
  },
};

//Destructuring arrays
const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a, b, c);

let [first, , third] = restaurant.categories;
console.log(first, third);

[first, third] = [third, first]; //switch 2 variables via arrays
console.log(first, third);
const [predjelo, glavnojelo] = restaurant.order(1, 2);
console.log(predjelo, glavnojelo);

const nest = [1, 2, [3, 4], 5, [6, [7, 8]], 9];
const [prva, , trecaicetvrta, , [, [sedma]]] = nest;
console.log(prva, trecaicetvrta, sedma);

const [x = 1, y = 1, z = 1] = [5, 6]; //default values
console.log(x, y, z);

//Destructuring objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

let aa = 28;
let bb = 18;
const obj = { aa: 18, bb: 28, cc: 38 };
({ aa, bb } = obj); //update variables with values from object
//we needed to start and end with () because it does not work without it
console.log(aa, bb, obj.cc);

const {
  openingHours: { fri },
  openingHours: { fri: niceday },
} = restaurant;
console.log(fri, niceday);

const {
  fri: anotherway,
  fri: { open, open: o, close, close: cl },
} = openingHours;
console.log(anotherway, open, o, close, cl);

restaurant.orderDeliver({
  time: "19:30",
  address: "bla",
  predjelo: 2,
  glavnojelo: 1,
});

restaurant.orderDeliver({
  time: "19:00",
  address: "bla2",
});

//The spread operator (...)

//it can basically only be used in arrays and objects
const nesto = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const novonesto = [0, ...nesto];
console.log(novonesto);
console.log(...novonesto);

const newMenu = [...restaurant.mainMenu, "Janjetina"];
console.log(newMenu);
restaurant.mainMenu.push("Odojak");
console.log(restaurant.mainMenu);

const joinedMenus = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(joinedMenus);
const letters = [...restaurant.starterMenu[2]];
console.log(letters);

const ingredients = [
  prompt("Insert ingredient1"),
  prompt("Insert ingredient2"),
  prompt("Insert ingredient3"),
];
restaurant.orderPasta(...ingredients);

const newRestaurant = { ...restaurant, founder: "Marin", foundingYear: 1993 };
console.log(newRestaurant);
newRestaurant.name = "Novirestoran";
console.log(restaurant.name, newRestaurant.name);

//Rest pattern and parameters

//create arrays and objects
//takes rest of elements in arrays/objects
//similar to [H | T] in Erlang
const [h, ...t] = [1, 2, 3, 4, 5];
console.log(h, t);
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 5, 8, 6);

restaurant.orderPizza("ham", "cheese", "origano");
restaurant.orderPizza("mozzarela");

//Short circuiting (|| and &&)

//|| will return first truthy value
//if no truthy values are found, first is returned
console.log(3 || "Marin");
const guest2 = restaurant.numGuests || 10;
console.log(guest2);

//&& will return first falsy value or last one if first value is falsy
console.log(3 && "Marin");

//Nullish coalescing operator (??)
//Same as ||, but accept all values except null and undefined (so 0 is for example OK)
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//Logical assingment operators
const rest1 = {
  name: "prvo",
  guests: 25,
};
const rest2 = {
  name: "drugo",
  owner: "Marin",
};
//we setup guest variable to 10 or it stays what was before in it
//we use ?? instead of || to accept 0 as value if the old number of guests is 0
rest1.guests ??= 10;
rest2.guests ??= 10;
console.log(rest1.guests, rest2.guests);

//we setup owner variable to anonymous if it existed before
rest2.owner &&= "anonymous";
console.log(rest2);

//Looping arrays: for-of loop
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu2) console.log(item);
//getting indexes
for (const [i, item] of menu2.entries()) console.log(i, item);

//Enchanced object literals
const weekdays2 = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const enchance = {
  hours: {
    //taking property names from arrays
    //We can put anything inside [] to create property name
    [weekdays2[0]]: 8,
    [weekdays2[4]]: 6,
    [weekdays2[6]]: 0,
  },
};

const original = {
  name: "Marin",
  height: 179,
  enchance, //No need to write name again, it is automatically copied
  printUser() {
    //No need to write function, just name of property as function
    console.log(this.name, this.height);
  },
};

console.log(original);
original.printUser();

//Optional chaining (?.)

//If property exists returns it, instead returns undefined
console.log(restaurant.openingHours.fri?.open);
console.log(restaurant.openingHours.mon?.open);
for (const day of weekdays2) {
  const open = restaurant.openingHours[day]?.open;
  if (open >= 0) {
    console.log(`On ${day} we open on ${open} hours`);
  }
}
//?. and ?? are introduced in ES2020 together because they work well together
console.log(restaurant.order?.(0, 1) ?? "Missing method");
console.log(restaurant.eat?.(0, 1) ?? "Missing method");
console.log(weekdays2[0]?.name ?? "Array empty");

//Looping objects: object keys, values and entries
const keys = Object.keys(openingHours);
console.log(keys); //thu, fri, sat
const values = Object.values(openingHours);
console.log(values); //open:, close:
const entries = Object.entries(openingHours);
console.log(entries); //thu, open:, close:
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//Sets

//Collection of unique values
const ordersSet = new Set(["Pasta", "Pizza", "Risotto", "Pasta", "Risotto"]);
console.log(ordersSet); //Duplicates are not here
//Get size of set
console.log(ordersSet.size);
//Is the element part of set
console.log(ordersSet.has("Bread"));
//Add element to set
console.log(ordersSet.add("Bread"));
//Delete element from set
console.log(ordersSet.delete("Bread"));
//Delete every element from set
//ordersSet.clear;
for (const order of ordersSet) console.log(order);
//Create array from set
const ordersArray = [...ordersSet];
console.log(ordersArray);

//Maps
const restaurantMap = new Map();
//Add element to map
restaurantMap.set("name", "first");
restaurantMap.set(1, "Zagreb");
console.log(restaurantMap.set(2, "Split"));
restaurantMap
  .set("categories", ["Pasta", "Pizza"])
  .set("open", 8)
  .set("close", 22)
  .set(true, "Opened")
  .set(false, "Closed");
//Read data from map
console.log(restaurantMap.get("categories"));
const time = 20;
console.log(
  restaurantMap.get(
    time > restaurantMap.get("open") && time < restaurantMap.get("close")
  )
);
//Check if element is in map
restaurantMap.has("open");
//Delete element from map
restaurantMap.delete("categories");
//Get size of map
restaurantMap.size;
//Delete all elements from map
//restaurantMap.clear();
const someArray = [1, 2, 3];
restaurantMap.set(someArray, "Test");
console.log(restaurantMap.get(someArray));
restaurantMap.set(document.querySelector("h1"), "Heading");
console.log(restaurantMap);

//Convert object to map
const hours2 = new Map(Object.entries(openingHours));
console.log(hours2);
const question = new Map([
  ["Question", "Choose 1"],
  [1, "A"],
  [2, "B"],
  [3, "C"],
  ["correct", 1],
  [true, "Yes"],
  [false, "Nooo"],
]);
console.log(question.get("Question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
const answer = prompt("Type answer");
console.log(question.get(Number(answer) === question.get("correct")));
//convert map to array
console.log([...question]);

//Working with strings
const airline = "Senj Helicopter Academy";
const plane = "A15";
//length of string
console.log(airline.length);
//first and last position of letter/string in string
//case sensitive
console.log(airline.indexOf("f"));
console.log(airline.lastIndexOf("e"));
//return substring (first parameter is start, second is end)
//returns end - start number of characters, that means it does not return end character
console.log(airline.slice(5), airline.slice(5, 7));
const checkMiddleSeat = function (seat) {
  return seat.slice(-1) === "B" || seat.slice(-1) === "E" ? "Yes" : "No";
};
console.log(
  checkMiddleSeat("11A"),
  checkMiddleSeat("11B"),
  checkMiddleSeat("11C"),
  checkMiddleSeat("11D"),
  checkMiddleSeat("11E")
);
//lower and upper case
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
//Get rid of whitespaces and special characters at beggining and end of string
console.log("    somethingwrong \n\t".trim());
//Replacing parts of the string
const price = "15,16Kn";
console.log(price.replace("Kn", "Usd").replace(",", "."));
console.log(price.replace(/1/g, "2")); //regex
//contains string, starts with string and end with string
console.log(
  airline.includes("Senj"),
  airline.startsWith("Zg"),
  airline.endsWith("demy")
);
//split strings, creates array of splited strings by parameter
console.log("some+plushy+string+with++pluses".split("+"));
//join strings, concatenated strings by parameter
const [firstName, lastName] = "Marin Nekic".split(" ");
const newName = ["Mr", firstName, lastName.toUpperCase()].join("_");
console.log(newName);
const properName = function (name) {
  const partsOfName = name.split(" ");
  const capitalizedName = [];
  for (const i of partsOfName) {
    capitalizedName.push(i.replace(i[0], i[0].toUpperCase()));
  }
  return capitalizedName.join(" ");
};
console.log(properName("marin nekic"));
//Adding letters/strings to string until wanted length
console.log(airline.padStart(52, "-+"));
console.log(airline.padEnd(52, "-+"));

const maskCreditCard = function (number) {
  const str = String(number);
  return str.slice(-4).padStart(str.length, "*");
};
console.log(maskCreditCard(54899884322));
console.log(maskCreditCard("54899884322"));
//repeating strings
const badger = "Badger ";
const mushroom = "Mushroom ";
console.log(badger.repeat(12) + mushroom.repeat(2) + "!");
