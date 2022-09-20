//1
const massMark = 95;
const massJohn = 85;
const heightMark = 1.88;
const heightJohn = 1.76;
let markBMI = massMark / heightMark ** 2;
let johnBMI = massJohn / heightJohn ** 2;
let markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

//2
if (markHigherBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})`);
} else {
    console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})`);
}

//3
const dolphinsScore = (103 + 108 + 89) / 3;
const koalasScore = (99 + 91 + 110) / 3;

if (dolphinsScore > koalasScore && dolphinsScore >= 100) {
    console.log("Dolphins wins!");
} else if (koalasScore > dolphinsScore && koalasScore >= 100) {
    console.log("Koalas wins!");
} else if (dolphinsScore === koalasScore && dolphinsScore >= 100 && koalasScore >= 100) {
    console.log("It's a draw!");
} else {
    console.log("No trophy!");
}

//4
const bill = Number(prompt("How much is the bill"));
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip} and the total value is ${bill + tip}`);