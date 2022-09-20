let js = 'amazing';
console.log(40 + 8 + 23 - 10);

//LECTURE: Values and Variables
let country = "Croatia";
let continent = "Europe";
let population = 3880000;

console.log(country);
console.log(continent);
console.log(population);

//LECTURE: Data Types
let isIsland = false;
let language;
console.log(typeof isIsland);
isIsland = "not boolean anymore!";
console.log(typeof funnyBool);
console.log(typeof continent);
console.log(typeof population);
isIsland = false;

//LECTURE: let, const and var
language = "Hrvatski";
var old = "staro";
const konstanta = "konstanta";

//LECTURE: Basic Operators
console.log(konstanta, language);
console.log(population / 2);
console.log(konstanta + " " + language);
population++;
console.log(population);
const finland = 6000000;
console.log("Does my country has more population than Finland: " + (finland < population));
population--;
let description = country + " is in " + continent + " and its " + population + " people speak " + language;
console.log(description);

//LECTURE: Strings and Template Literals
console.log(`Strong
await
fads`);
// to get ` character press AltGr + 7
description = `${country} is in ${continent} and its ${population} people speak ${language}`;
console.log(description);

//LECTURE: Taking Decisions: if / else Statements
let averagePopulation = 33000000;
if (population > averagePopulation) {
    // to get available emojis press Windows + .
    console.log(`${country} population is above average 👍`);
} else {
    let belowAverage = averagePopulation - population;
    console.log(`${country} population is ${belowAverage} below average 😒`);
}

//LECTURE: Type Conversion and Coercion
const inputYear = "1991";
console.log(inputYear + 18); //coercion, automatic conversion
console.log(Number(inputYear) + 18, inputYear); // manual conversion
console.log(Number("Marin")); //NaN
console.log(String(25), 25);
console.log("15" - 8 + '2'); //72, -, * and / converts to number but + to string

//LECTURE: Truthy and falsy values
console.log(Boolean(0)); // false
console.log(Boolean({})); // true
// 5 falsy values: 0, "", undefined, null, NaN
let money;
if (money) {
    console.log("We have some money!");
} else {
    console.log("No money!");
}

//LECTURE: Equality Operators: == vs. ===
const numNeighbours = Number(prompt("How many neighbour countries does your country have?"));
//use ===, much better than ==, == makes conversion automatically which leads to weird situations
if (numNeighbours === 1) {
    console.log("Only 1 neighbour");
} else if (numNeighbours > 1) {
    console.log("More than 1 neighbour");
} else {
    console.log("No borders");
}

//LECTURE: Logical Operators
if (language === "Hrvatski" && population < 50000000 && !isIsland) {
    console.log(`${country} is suited for you`);
} else {
    console.log(`You should not live in ${country}`);
}

//LECTURE: The switch Statement
switch (language) {
    case "chinese":
    case "mandarian":
        console.log("Most number of native speakers");
        break;
    case "spanish":
        console.log("2nd place in number of native speakers");
        break;
    case "english":
        console.log("3nd place in number of native speakers");
        break;
    case "hindi":
        console.log("4th place in number of native speakers");
        break;
    case "arabic":
        console.log("5th place in number of native speakers");
        break;
    default:
        console.log("Great language too");
}

//LECTURE: Statements and Expressions
//Expressions -> produce value
//3 + 4
//1995
//true && false || not true

//Statement -> performs actions without value
//if (23 > 10) const something = "23 rocks";

//LECTURE: The Conditional (Ternary) Operator

population > averagePopulation ? console.log(`${country} population is above average`) : console.log(`${country} population is below average`);