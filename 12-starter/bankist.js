"use strict";
/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

//This is needed for resolving sorting part
let oldOrder = [];
let sorted = false;

//Login to the account
let currAccount;
let timeoutValue;
let accInterval;
btnLogin.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const username = inputLoginUsername.value.trim();
  const pin = inputLoginPin.value;
  //check if account exists
  let oldAccount = currAccount;
  currAccount = accounts.find(function (account) {
    return account.username === username && account.pin === +pin;
  });
  if (currAccount) {
    if (currAccount !== oldAccount && oldAccount) logout(oldAccount);
    //Starting timeout
    timeoutValue = 600;
    accInterval = setInterval(() => printInterval(currAccount), 1000);
    labelTimer.textContent = "10:00";
    //display welcome message, all the transactions on the account and summary
    const currentTime = new Date();
    labelDate.textContent = new Intl.DateTimeFormat(currAccount.locale).format(
      currentTime
    );
    const timeOfDay = function () {
      if (currentTime.getHours() >= 6 && currentTime.getHours() <= 12)
        return "morning";
      else if (currentTime.getHours() >= 13 && currentTime.getHours() <= 20)
        return "afternoon";
      else return "evening";
    };
    labelWelcome.textContent = `Good ${timeOfDay()}, ${
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

//Transfer money from current account to another one
btnTransfer.addEventListener("click", function (e) {
  //prevent refresh of webpage, just for testing
  e.preventDefault();
  const username = inputTransferTo.value.trim();
  const amount = +inputTransferAmount.value;
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
    const dateOfTransaction = new Date();
    const timeOfYear = new Intl.DateTimeFormat(currAccount.locale).format(
      dateOfTransaction
    );
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--withdrawal">${
        currAccount.movements.length + 1
      } withdrawal</div>
      <div class="movements__date">${timeOfYear}</div>
      <div class="movements__value">${new Intl.NumberFormat(
        currAccount.locale
      ).format(-amount.toFixed(2))}$</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    currAccount.movements.push(-amount);
    currAccount.movementsDates.push(dateOfTransaction);
    if (sorted) oldOrder.push(-amount);
    //Calculate new balance and new total out transaction volume
    //Also update internal list of transactions for receiving user
    currAccount.sumOut -= amount;
    currAccount.balance -= amount;
    labelSumOut.textContent =
      new Intl.NumberFormat(currAccount.locale).format(
        currAccount.sumOut.toFixed(2)
      ) + "$";
    labelBalance.textContent =
      new Intl.NumberFormat(currAccount.locale).format(
        currAccount.balance.toFixed(2)
      ) + "$";
    account.movements.push(amount);
    account.movementsDates.push(dateOfTransaction);
    //restarts the timer
    restartTimeout();
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
  if (currAccount.username === username && currAccount.pin === +pin) {
    //Remove account from the list
    const accIndex = accounts.findIndex(function (account) {
      return account.username === username && account.pin === +pin;
    });
    accounts.splice(accIndex, 1);
    logout(currAccount);
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
  const amount = +inputLoanAmount.value;
  //Bank will only allow the loan if there is at least 1 deposit which is atleast 10% of the requested loan amount
  if (
    currAccount.movements.some(function (value) {
      return value / amount >= 0.1;
    })
  ) {
    //Put new deposit row in transfer list and show it
    //Also update internal list of transactions for current user
    const dateOfTransaction = new Date();
    const timeOfYear = new Intl.DateTimeFormat(currAccount.locale).format(
      dateOfTransaction
    );
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--deposit">${
        currAccount.movements.length + 1
      } deposit</div>
      <div class="movements__date">${timeOfYear}</div>
      <div class="movements__value">${new Intl.NumberFormat(
        currAccount.locale
      ).format(amount.toFixed(2))}$</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    currAccount.movementsDates.push(dateOfTransaction);
    if (sorted) oldOrder.push(amount);
    //Calculate new balance, new interest and new total out transaction volume
    //Also update internal list of transactions for receiving user
    currAccount.sumIn += amount;
    currAccount.sumInterest += (amount * currAccount.interestRate) / 100;
    currAccount.balance += amount;
    labelSumIn.textContent =
      new Intl.NumberFormat(currAccount.locale).format(
        currAccount.sumIn.toFixed(2)
      ) + "$";
    labelSumInterest.textContent =
      new Intl.NumberFormat(currAccount.locale).format(
        currAccount.sumInterest.toFixed(2)
      ) + "$";
    labelBalance.textContent =
      new Intl.NumberFormat(currAccount.locale).format(
        currAccount.balance.toFixed(2)
      ) + "$";
    currAccount.movements.push(amount);
    //restarts the timer
    restartTimeout();
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
  const datesOfTransaction = currAccount.movementsDates;
  transactions.forEach(function (transaction, i) {
    const transType = transaction > 0 ? "deposit" : "withdrawal";
    const dateOfTransaction = new Date(datesOfTransaction[i]);
    const timeOfYear = new Intl.DateTimeFormat(currAccount.locale).format(
      dateOfTransaction
    );
    //Copied from HTML file, date part was removed for now
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${transType}">${
      i + 1
    } ${transType}</div>
      <div class="movements__date">${timeOfYear}</div>
      <div class="movements__value">${new Intl.NumberFormat(
        currAccount.locale
      ).format(transaction.toFixed(2))}$</div>
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
  labelSumIn.textContent =
    new Intl.NumberFormat(account.locale).format(deposit.toFixed(2)) + "$";
  labelSumOut.textContent =
    new Intl.NumberFormat(account.locale).format(withdrawal.toFixed(2)) + "$";
  labelSumInterest.textContent =
    new Intl.NumberFormat(account.locale).format(interest.toFixed(2)) + "$";
  labelBalance.textContent =
    new Intl.NumberFormat(account.locale).format(total.toFixed(2)) + "$";
  //Store calculated values in object
  account.sumIn = deposit;
  account.sumOut = withdrawal;
  account.sumInterest = interest;
  account.balance = total;
};

//Logouts the account after inactivity period or login to new account
const logout = function (account) {
  //clear input fields and lose focus from them
  if (sorted) {
    //We had sorted list, return old one
    account.movements = [...oldOrder];
    oldOrder = [];
    sorted = false;
  }
  labelWelcome.textContent = "Log in to get started";
  inputLoginUsername.value = "";
  inputLoginUsername.blur();
  inputLoginPin.value = "";
  inputLoginPin.blur();
  inputTransferAmount.value = "";
  inputTransferAmount.blur();
  inputTransferTo.value = "";
  inputTransferTo.blur();
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  inputCloseUsername.value = "";
  inputCloseUsername.blur();
  inputClosePin.value = "";
  inputClosePin.blur();
  containerApp.style.opacity = 0;
  clearInterval(accInterval);
  timeoutValue = 600;
};

//Countdown timer until logoff
const printInterval = function (account) {
  timeoutValue--;
  labelTimer.textContent = `${String(Math.trunc(timeoutValue / 60)).padStart(
    2,
    0
  )}:${String(timeoutValue % 60).padStart(2, 0)}`;
  if (timeoutValue === 0) logout(account);
};

//Restarts the timeout after every positive action
const restartTimeout = function () {
  //Starting timeout
  clearInterval(accInterval);
  timeoutValue = 600;
  accInterval = setInterval(() => printInterval(currAccount), 1000);
  labelTimer.textContent = "10:00";
};
