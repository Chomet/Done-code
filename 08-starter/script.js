"use strict";

function calcAge(birthYear) {
  const age = 2022 - birthYear;

  function printAge() {
    const output = `You are ${firstName}, ${age} years old, born in ${birthYear}`;
    console.log(output);

    if (birthYear > 1980 && birthYear < 1997) {
      var old = true;
      const something = `Oh, you are millenial, ${firstName}`;
      console.log(something);

      function add(a, b) {
        return a + b;
      }
    }
    //variables declared with var can be used by one block outside of it
    //variables declared with let and const can only be used inside block
    //use let and const only in modern Javascript
    //functions can only be used inside its block if we use strict mode
    //if not, then we can use them elsewhere
    console.log(old);
    //console.log(something); // error
    //console.log(add(2, 3)); //
  }
  printAge();
  return age;
}

const firstName = "Marin";
calcAge(1993);
//Function can be declared after it is used
//Expresion and arrow cannot be used before they are coded because they are basically variables when made this way.
console.log(addDecl(2, 3));
//console.log(addExpr(2, 3));
//console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

//global scope, window object
console.log(this);

const age = function (birthYear) {
  console.log(2022 - birthYear);
  //scope of declared function, this keyword is currently undefined in strict mode
  console.log(this);
};
age(1998);

const ageArrow = birthYear => {
  console.log(2022 - birthYear);
  //arrow function has no this keyword so it looks for its value outside which is currently global scope which is window object
  console.log(this);
};
ageArrow(1998);

const someMethod = {
  year: 1993,
  calcAge: function () {
    console.log(2022 - this.year);
  },
};
someMethod.calcAge();

const novi = {
  year: 1895,
};

//we can borrow the method from one method to another
novi.calcAge = someMethod.calcAge;
novi.calcAge();
//we can borrow the method from one method to const
//but it then becomes a function call
const createdfunction = someMethod.calcAge;

const someObject = {
  firstName: "Marin",
  year: 1993,
  calcAge: function () {
    console.log(2022 - this.year);

    /* Solution 1, before ES6
    const self = this;
    const isMillenial = function () {
      //this keyword inside the function is undefined
      //console.log(this);
      //if (this.year > 1980 && this.year < 1997) console.log('Millenial!');
      //solution for this is to use self inside method to preserve property of this
      console.log(self);
      if (self.year > 1980 && self.year < 1997) console.log('Millenial!');
    };
    isMillenial(); */

    //Solution 2, after ES6
    //Use arrow function since  it doesnt have this keyword and looks for the value outside of it
    const isMillenial = () => {
      console.log(this);
      if (this.year > 1980 && this.year < 1997) console.log("Millenial!");
    };
    isMillenial();
  },
  //As said before, arrow function has no this keyword, so we look for value outside, in global window function, which does not have firstName parameter
  greet: () => console.log(`Hello ${this.firstName}`),
};

someObject.greet();
someObject.calcAge();
