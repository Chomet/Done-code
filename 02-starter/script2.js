//LECTURE: Activating Strict Mode
"use strict";

let hasDriversLicense = false;
const passTest = true;

//if (passTest) hasDriverLicense = true; -> without strict mode we would not see error
if (hasDriversLicense) console.log("Drive!");

//some words are reserved for possible future uses in strict mode
//const interface = "Audio";
//const private = 55;

//LECTURE: Functions
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} people and its capital city is ${capitalCity}`;
}

const country1 = describeCountry("Croatia", 3880000, "Zagreb");
const country2 = describeCountry("Italy", 35000000, "Rome");
const country3 = describeCountry("Iceland", 330000, "Reykyavyk");

console.log(country1);
console.log(country2);
console.log(country3);

//LECTURE: Function Declarations vs. Expressions
function percentageOfWorld1(population) {
    const totalPopulation = 7900000000;
    return population / totalPopulation * 100;
}

const population1 = 3880000;
const population2 = 150000000;
const population3 = 1500000000;

console.log(percentageOfWorld1(population1), percentageOfWorld1(population2), percentageOfWorld1(population3));

const percentageOfWorld2 = function (population) {
    const totalPopulation = 7900000000;
    return population / totalPopulation * 100;
}

console.log(percentageOfWorld2(population1), percentageOfWorld2(population2), percentageOfWorld2(population3));

//LECTURE: Arrow Functions
const yearsUntilRetirement = (name, birthYear) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return `${name} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement("Marin", 1993));

const percentageOfWorld3 = population => {
    const totalPopulation = 7900000000;
    return population / totalPopulation * 100;
}

console.log(percentageOfWorld3(population1), percentageOfWorld3(population2), percentageOfWorld3(population3));

//LECTURE: Functions Calling Other Functions
function describePopulation(country, population) {
    return `${country} has ${population} people, which is about ${percentageOfWorld1(population)} of the world`;
}

console.log(describePopulation("Croatia", population1), describePopulation("Russia", population2), describePopulation("China", population3));

//LECTURE: Introduction to Arrays
const population4 = 30000000;
const populationarray = new Array(population1, population2, population3, population4);
if (populationarray.length === 4) {
    console.log("Array is 4!");
} else {
    console.log("Array is not 4!");
}
const percentages = new Array(percentageOfWorld1(population1), percentageOfWorld1(population2), percentageOfWorld1(population3), percentageOfWorld1(population4));
console.log(percentages);

//LECTURE: Basic Array Operations (Methods)
//Add element to the end
populationarray.push("something");
populationarray.push(true);
const newshit = populationarray.push("different");
console.log(populationarray);
console.log(newshit); //contains length of new string, not the string
//Add element to the beginning
populationarray.unshift("start");
console.log(populationarray);
//remove element from the end
populationarray.pop();
console.log(populationarray);
//remove element from the start
populationarray.shift();
console.log(populationarray);
//check position of element, we get -1 for non existent element
//includes just returns true or false, it also does strict check
console.log(populationarray.indexOf(150000000), populationarray.indexOf("wtf"));
console.log(populationarray.includes(150000000), populationarray.includes("wtf"));

const neighbours = ["Hungary", "Slovenia", "Bosnia", "Serbia"];
neighbours.push("Utopia");
neighbours.pop();
if (neighbours.includes("Germaany")) console.log("No Germany!");
neighbours[neighbours.indexOf("Bosnia")] = "Bosnia and Hercegovina";
console.log(neighbours);

//LECTURE: Introduction to Objects
const myCountry = {
    country: "Croatia",
    capital: "Zagreb",
    firstlanguage: "Hrvatski",
    secondlanguage: "Engleski",
    population: 3880000,
    neighbours: neighbours,
    largeCountry: false,

    calcPercentagePopulation: function (population) {
        return (population / 8000000000) * 100;
    },

    calcOwnPercentagePopulation: function () {
        return (this.population / 8000000000) * 100;
    },

    calcOnceOwnPercentagePopulation: function () {
        this.wtf = (this.population / 8000000000) * 100;
        return this.wtf;
    },

    summary: function () {
        this.summary = `${this.country} has capital city of ${this.capital} and it has ${this.population} people. It also is ${this.largeCountry ? "a" : "not a"} large country`;
        return this.summary;
    }
};

//LECTURE: Dot vs. Bracket Notation
myCountry["population"] = myCountry["population"] + 2000000;
myCountry.population = myCountry.population - 2000000;

console.log(`${myCountry.country} has ${myCountry.neighbours.length} neighbours and its second one is ${myCountry.neighbours[1]}. It also has ${myCountry.population} people which speaks ${myCountry.firstlanguage}`);

//LECTURE: Object Methods
//first type, transfer arguments to a function
console.log(myCountry.calcPercentagePopulation(population1));
console.log(myCountry["calcPercentagePopulation"](myCountry.population));
//second type, use attributes from his own object
console.log(myCountry.calcOwnPercentagePopulation());
//third type, create new property inside object, call function to populate it once, use property later without calling function anymore
console.log(myCountry.calcOnceOwnPercentagePopulation());
console.log(myCountry.wtf);
console.log(myCountry.summary());
console.log(myCountry.summary);

//LECTURE: Iteration: The for Loop
for (let i = 1; i <= 5; i++) {
    console.log(`Voter number ${i} is currently voting`);
}

//LECTURE: Looping Arrays, Breaking and Continuing
const percentages2 = [];
for (let i = 0; i < populationarray.length; i++) {
    percentages2.push(percentageOfWorld1(populationarray[i]));
}
console.log(percentages2);

for (let i = 0; i < populationarray.length; i++) {
    //continue -> go to next iteration of loop
    if (typeof populationarray[i] === "number") continue;
    console.log(populationarray[i]);
}
for (let i = 0; i < populationarray.length; i++) {
    //break -> immediately exit loop
    if (typeof populationarray[i] === "string") break;
    console.log(populationarray[i]);
}

//LECTURE: Looping Backwards and Loops in Loops
for (let i = populationarray.length - 1; i >= 0; i--) {
    console.log(populationarray[i]);
}

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
    'Russia']];
for (let i = 0; i < listOfNeighbours.length; i++)
    for (let j = 0; j < listOfNeighbours[i].length; j++)
        console.log(`Country: ${listOfNeighbours[i][j]}`);

//LECTURE: The while Loop
const percentages3 = [];
let counter = 0;
while (counter < populationarray.length) {
    percentages3.push(percentageOfWorld1(populationarray[counter]));
    counter++;
}
console.log(percentages3);

let dice = 0;
let dicerollnumbers = [0, 0, 0, 0, 0, 0];
while (dice < 6) {
    if (dice !== 0) {
        console.log(dice);
    }
    dice = Math.trunc(Math.random() * 6) + 1;
    dicerollnumbers[dice - 1]++;
}
console.log(dicerollnumbers);