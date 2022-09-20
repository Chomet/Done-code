"use strict";

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

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//Store usernames for each person in their respective objects
const usernames = function (accounts) {
  accounts.forEach(function (account) {
    let username = "";
    for (const i of account.owner.split(" ")) {
      username += i[0];
    }
    account.username = username.toLowerCase();
  });
};
usernames(accounts);

//Login to the account
let currAccount;
btnLogin.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const username = inputLoginUsername.value.trim();
  const pin = inputLoginPin.value;
  //check if account exists
  currAccount = accounts.find(function (account) {
    return account.username === username && account.pin === Number(pin);
  });
  if (currAccount) {
    //display welcome message, all the transactions on the account and summary
    labelWelcome.textContent = `Good evening, ${
      currAccount.owner.split(" ")[0]
    }`;
    displayTransactions(currAccount.movements);
    summaryBankAccount(currAccount);
    //change the opacity so main part of the application is shown
    containerApp.style.opacity = 100;
  }
  //clear input fields and lose focus from them
  inputLoginUsername.value = "";
  inputLoginUsername.blur();
  inputLoginPin.value = "";
  inputLoginPin.blur();
});

//This is needed for resolving sorting part
let oldOrder = [];
let sorted = false;
//Transfer money from current account to another one
btnTransfer.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const username = inputTransferTo.value.trim();
  const amount = Number(inputTransferAmount.value);
  const account = accounts.find(function (account) {
    return account.username === username;
  });
  //Check:
  //1: if account where we want to transfer money exists
  //2: if we put positive transfer amount
  //3: if we don't transfer to same account
  //3: if the person has enough balance in its account to do transfer
  if (
    account &&
    amount > 0 &&
    account != currAccount &&
    currAccount.balance >= amount
  ) {
    //Put new withdrawal row in transfer list and show it
    //Also update internal list of transactions for current user
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--withdrawal">${
        currAccount.movements.length + 1
      } withdrawal</div>
      <div class="movements__value">${-amount}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    currAccount.movements.push(-amount);
    if (sorted) oldOrder.push(-amount);
    //Calculate new balance and new total out transaction volume
    //Also update internal list of transactions for receiving user
    currAccount.sumOut -= amount;
    currAccount.balance -= amount;
    labelSumOut.textContent = currAccount.sumOut + "$";
    labelBalance.textContent = currAccount.balance + "$";
    account.movements.push(amount);
  }
  //clear input fields and lose focus from them
  inputTransferAmount.value = "";
  inputTransferAmount.blur();
  inputTransferTo.value = "";
  inputTransferTo.blur();
});

//Close the account
btnClose.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const username = inputCloseUsername.value.trim();
  const pin = inputClosePin.value;
  //check if account exists
  if (currAccount.username === username && currAccount.pin === Number(pin)) {
    //Remove account from the list
    const accIndex = accounts.findIndex(function (account) {
      return account.username === username && account.pin === Number(pin);
    });
    accounts.splice(accIndex, 1);
    console.log(accounts);
    //change the opacity so main part of the application is not shown
    containerApp.style.opacity = 0;
  }
  //clear input fields and lose focus from them
  inputCloseUsername.value = "";
  inputCloseUsername.blur();
  inputClosePin.value = "";
  inputClosePin.blur();
});

//Request loan from the bank
btnLoan.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  //Bank will only allow the loan if there is at least 1 deposit which is atleast 10% of the requested loan amount
  if (
    currAccount.movements.some(function (value) {
      return value / amount >= 0.1;
    })
  ) {
    //Put new deposit row in transfer list and show it
    //Also update internal list of transactions for current user
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--deposit">${
        currAccount.movements.length + 1
      } deposit</div>
      <div class="movements__value">${amount}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    currAccount.movements.push(amount);
    if (sorted) oldOrder.push(amount);
    //Calculate new balance, new interest and new total out transaction volume
    //Also update internal list of transactions for receiving user
    currAccount.sumIn += amount;
    currAccount.sumInterest += (amount * currAccount.interestRate) / 100;
    currAccount.balance += amount;
    labelSumIn.textContent = currAccount.sumIn + "$";
    labelSumInterest.textContent = currAccount.sumInterest + "$";
    labelBalance.textContent = currAccount.balance + "$";
    currAccount.movements.push(amount);
  }
  //clear input fields and lose focus from them
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

//Sorts all the deposits and withdrawals and show them
//Return to original order if sort button is pressed again
btnSort.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const currMovements = [...currAccount.movements];
  console.log(currMovements, currAccount.movements, oldOrder);
  if (!sorted) {
    //List was unsorted
    oldOrder = [...currAccount.movements];
    currAccount.movements.sort(function (a, b) {
      return a - b;
    });
    sorted = true;
  } else {
    //We had sorted list, return old one
    currAccount.movements = [...oldOrder];
    oldOrder = [];
    sorted = false;
  }
  //display sorted or original list again
  displayTransactions(currAccount.movements);
});

//Display all the transactions initially stored for the person logged in
const displayTransactions = function (transactions) {
  //Deleting old stuff
  //innerHTML shows all the HTML under the selected element
  containerMovements.innerHTML = "";
  transactions.forEach(function (transaction, i) {
    const transType = transaction > 0 ? "deposit" : "withdrawal";
    //Copied from HTML file, date part was removed for now
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${transType}">${
      i + 1
    } ${transType}</div>
      <div class="movements__value">${transaction}</div>
    </div>`;
    //Inserting stuff into HTML
    //for options in first argument check documentation
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Calculates deposits, withdrawals, total sum and interest rate of logged person
const summaryBankAccount = function (account) {
  let deposit = 0;
  let withdrawal = 0;
  let interest = 0;
  let total = 0;
  account.movements.forEach(function (value) {
    value > 0
      ? ((interest += (value * account.interestRate) / 100),
        (deposit += value),
        (total += value))
      : ((withdrawal += value), (total += value));
  });
  labelSumIn.textContent = deposit + "$";
  labelSumOut.textContent = withdrawal + "$";
  labelSumInterest.textContent = interest + "$";
  labelBalance.textContent = total + "$";
  //Store calculated values in object
  account.sumIn = deposit;
  account.sumOut = withdrawal;
  account.sumInterest = interest;
  account.balance = total;
};
