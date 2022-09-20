//Converting and checking numbers
console.log(23 === 23.0); //true
console.log(0.1 + 0.2 === 0.3); //false, javascript has a lot of problems with decimal problems without manipulations
//turning in number
console.log(+"22");
//parsing number -> trying to get rid of unnecessary simbols to get number, need to start with number
//it automatically gets rid of whitespaces
console.log(Number.parseInt("25 bla"));
console.log(Number.parseFloat("      5.6feet     "));
//not an number
console.log(Number.isNaN(20));
console.log(Number.isNaN(+"15rem"));
//is finite
console.log(Number.isFinite(20));
console.log(Number.isFinite(20 / 0));

//Math and rounding
console.log(Math.sqrt(1024));
console.log(16 ** (1 / 4)); //putting any exponent we want, not only sqrt
console.log(Math.max(55, 1, 99, 7, 6, 8, 4, 2, 33, 987));
console.log(Math.max(55, 1, 99, "1024", 6, 8, "1025", 2, 33, 987)); //automatically converts strings to numbers if it can
console.log(Math.PI * Number.parseFloat("10px") ** 2); //square radius of 10px circle
console.log(Math.trunc(Math.random() * 6) + 1);
const randomInt = function (min, max) {
  //Math random returns numbers from 0 to 1
  //to get numbers in some range, we need to multiply Math.random by max - min + 1
  //after truncating, we need to add min number to make it start of range
  //analogy with dices: we need to get rolls from 1 (min) to 6 (max)
  //we multiply initial result by 6 (6(max) - 1(min) + 1 (since we count 1 as valid roll))
  // after truncating, we need to add 1(min) to make it start of range
  return Math.trunc(Math.random() * (max - min + 1)) + min;
};
console.log(randomInt(7, 13));
console.log(
  Math.round(23.6),
  Math.round(23.5),
  Math.round(23.4),
  Math.round(-23.6),
  Math.round(-23.5),
  Math.round(-23.4)
); //rounds up
console.log(
  Math.ceil(23.6),
  Math.ceil(23.5),
  Math.ceil(23.4),
  Math.ceil(-23.6),
  Math.ceil(-23.5),
  Math.ceil(-23.4)
);
console.log(
  Math.floor(23.6),
  Math.floor(23.5),
  Math.floor(23.4),
  Math.floor(-23.6),
  Math.floor(-23.5),
  Math.floor(-23.4)
);
console.log((0.345658673).toFixed(2)); //return string

//Remainder operator
console.log(6 % 4);
console.log(6.82 % 3);

//Numberic separators
//Doesn't work when we convert strings with _ into number
const diameter = 287_460_000_000;
console.log(diameter);

//BigInt
const bignumber = 5556457797117917917; //Numeric literals with absolute values equal to 2^53 or greater are too large to be represented accurately as integers.
console.log(555645779711791791753223553n);
console.log(BigInt(55564577971179)); //this one does not work with big numbers, it only converts small ones to big ones
const num = 83;
console.log(897887899898798441n * BigInt(num)); //we need to convert small numbers to bigInt if we want to do operations between small and big numbers

//Creating dates
const date1 = new Date();
console.log(date1);
const date2 = new Date("December 24, 2022");
console.log(date2);
const date3 = new Date("2019-11-18T21:31:17.178Z");
console.log(date3);
//month starts from 0 so 11 is December
//year, month, day, hour, minute, second
const date4 = new Date(2022, 11, 18, 10, 15, 3);
console.log(date4);
const initialDate = new Date(0);
console.log(initialDate);
console.log(
  //We also have set methods for this
  date4.getFullYear(),
  date4.getMonth(),
  date4.getDate(), //gets day in month
  date4.getDay(), //get day in week, aslo starts from 0
  date4.getHours(),
  date4.getMinutes(),
  date4.toISOString(),
  date4.getTime(), //number of milliseconds passed from 1.1.1970
  Date.now()
);

//Operations with dates
const milliseconds = date1 - date3; //number of milliseconds
const daysPassed = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
console.log(daysPassed);

//Internationalizing dates and numbers
const intDate = new Intl.DateTimeFormat("en-US").format(date1);
const intDate2 = new Intl.DateTimeFormat("en-ST").format(date1);
console.log(intDate, intDate2);
console.log(navigator.language); //language in my browser
const options = {
  hours: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
const intDate3 = new Intl.DateTimeFormat(navigator.language, options).format(
  date1
);
console.log(intDate3);
const randomnumber = 4556645645.89;
console.log(new Intl.NumberFormat(navigator.language).format(randomnumber));
console.log(new Intl.NumberFormat("en-US").format(-5000));

//Timers
setTimeout(() => console.log("We log this now"), 5000);
const pizzaTimer = setTimeout(
  (i1, i2) => console.log(`We log this now with ${i1} and ${i2}`),
  5000,
  "ham",
  "cheese"
);
if (2 > 1) clearTimeout(pizzaTimer);
const pizzaTimer2 = setTimeout(
  (i1, i2) => console.log(`We log this now with ${i1} and ${i2}`),
  5000,
  "wine",
  "cheese"
);
if (2 < 1) clearTimeout(pizzaTimer2);
setInterval(() => console.log(new Date()), 20000); //Executing every interval time
