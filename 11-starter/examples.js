"use strict";

const currenciesMap = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const currenciesSet = new Set(["USD", "EUR", "KN", "ZB"]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//Simple array methods
let arr = ["a", "b", "c", "d", "e", "f", "g"];
//returns new array which starts at start element and returns end - start members (doesn't include end element)
//if there is no end parameter it returns everything after start parameter
console.log(arr.slice(1, 3));
console.log(arr.slice(-2));
//changes original array. Removes (second parameter) elements starting from (first parameter), returns removed elements
//if no second parameter exist it only removes parametar starting at mentioned location
console.log(arr.splice(2, 2));
console.log(arr.splice(-1));
//reverses the array, changing the original array
console.log(arr.reverse());
//concatenates 2 arrays
const concarr = arr.concat(arr);
console.log(concarr);
//joins each element of the array with parametar value
console.log(concarr.join(","));

//new at method
const somearr = [1, 5, 6, 8];
//gets element at specified position in array
console.log(somearr.at(2));
//very useful to get last element of array with negative index
console.log(somearr.at(-1));

//foreach on arrays
//first argument is value, second is position, third is whole array (we dont need all parameters)
movements.forEach(function (move, i, arr) {
  console.log(move, i, arr);
});

//foreach on maps and sets
//Map: first argument is value, second is key, third is whole array (we dont all parameters)
currenciesMap.forEach(function (value, key, map) {
  console.log(value, key, map);
});
//Since set has no keys or positions, key is same as value, but left by developers so foreach for sets is not different from foreach for arrays and maps
currenciesSet.forEach(function (value, _, set) {
  console.log(value, set);
});

//Map method
//Executes function on each element of the array and returns new array
const newmovements = movements.map(function (value) {
  return value * 1.1;
});
console.log(newmovements);

//Filter method
//Executes function on each element and returns only the elements which pass the condition (as new array)
const filteredmovements = movements.filter(function (value) {
  return value > 0;
});
console.log(filteredmovements);

//Reduce method
//Executes function on each element and contains total value in acc
//acc contains the total value after each iteration
//we can also specify initial value of acc after the function call
//if it is not specified, it takes first element of array as initial value!!!!!!!
const balance = movements.reduce(function (acc, value) {
  console.log(acc);
  return acc + value;
}, 0);
console.log(balance);

//Find method
//Executes function on each element and returns first element which satisfies its condition
//returns undefined if nothing found
const firstLessThan0 = movements.find(function (value) {
  return value < 0;
});
console.log(firstLessThan0);

//Some and every
//some checks if any element in array fullfills the condition
console.log(
  movements.some(function (value) {
    return value > 5000;
  })
);
//every checks if all elements in array fullfills the condition
console.log(
  movements.every(function (value) {
    return value < 5000;
  })
);

//Flat and flatmap
//Flat flattens the array
//If argument is specified, it flattens until the specified depth
//flatmap first executes map mathod then flattens it, but only for the first level
console.log([[[1], [[2]], 3], 4].flat());
console.log([[[1], [[2]], [3]], 4].flat(3));

//Sorting arrays
//Changes original array
const owners = ["Marin", "Davor", "Ante", "Ivan"];
console.log(owners.sort());
//It doesn't work properly with numbers, we need callback function
console.log(
  movements.sort(function (a, b) {
    //if we want to sort numbers in ascending order, every time number a is greater than number b, numbers must switch. To switch the numbers, we must return something which is greater than 0. Else we return something which is lower than 0
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  })
);
//Since sort works like it was explained above, below is the more simple way
console.log(
  movements.sort(function (a, b) {
    return a - b;
  })
);

//More ways of creating and filling arrays
const x = new Array(15);
//Fill fills the created array with values in first parameter
//Second and third parameters are optional, indicates start and end point (end point is not included as with splice)
console.log(x.fill(1));
console.log(x.fill(4, 2, 6));
//Array.from
const y = Array.from({ length: 12 }, () => 1);
console.log(y);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
//Getting movements directly from UI
//We need to select all the movements values from HTML and then for each of them we extract numeric value
const movementsUI = Array.from(
  document.querySelectorAll(".movements__value"),
  element => Number(element.textContent.replace(" ", "").slice(0, -1))
);
console.log(movementsUI);

//Practice with the functions
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];
//1. Getting all the deposits in one list
const totalDepositList = accounts.flatMap(function (account) {
  return account.movements.filter(function (movements) {
    return movements > 0;
  });
});
const totalDepositListArrow = accounts
  .flatMap(account => account.movements)
  .filter(movements => movements > 0);
//.reduce((sum, current) => sum + current, 0); -> If we want to get total value of all the deposits
console.log(totalDepositList);
console.log(totalDepositListArrow);
//2. Count all the deposits which are atleast 1000 dollars
const numDeposits1000 = accounts
  .flatMap(account => account.movements)
  .reduce((sum, current) => (current >= 1000 ? sum + 1 : sum), 0);
console.log(numDeposits1000);
//3. Create an object with sum of deposits and withdrawals
const depositsWithdrawals = accounts
  .flatMap(account => account.movements)
  .reduce(
    (sum, current) => {
      current >= 0 ? (sum.deposits += current) : (sum.withdrawal += current);
      return sum;
    },
    { deposits: 0, withdrawal: 0 }
  );
console.log(depositsWithdrawals);
//4. this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ["a", "an", "the", "but"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    );
  return titleCase.join(" ");
};
console.log(convertTitleCase("he he he pile it ON"));
