//1
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const dolphinAverage1 = calcAverage(44, 23, 71);
const koalasAverage1 = calcAverage(65, 54, 49);
const dolphinAverage2 = calcAverage(85, 54, 41);
const koalasAverage2 = calcAverage(23, 34, 27);

function checkWinner(dolphinAverage, koalasAverage) {
    if (dolphinAverage > koalasAverage * 2) {
        console.log(`Dolphins win (${dolphinAverage} vs ${koalasAverage})`);
    } else if (koalasAverage > dolphinAverage * 2) {
        console.log(`Koalas win (${koalasAverage}) vs ${dolphinAverage})`);
    } else {
        console.log(`No winner, Dolphins got ${dolphinAverage}, Koalas got ${koalasAverage}`);
    }
}

checkWinner(dolphinAverage1, koalasAverage1);
checkWinner(dolphinAverage2, koalasAverage2);

//2
function calcTip(bill) {
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15;
    } else return bill * 0.2;
}
const bills = new Array(125, 555, 44);
const tips = new Array(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]));
const total = new Array(bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]);
console.log(total);

//3
const mark = {
    name: "Mark",
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}
const john = {
    name: "John",
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
}

if (john.calcBMI() > mark.calcBMI()) {
    console.log(`${john.name} BMI (${john.bmi}) is larger than ${mark.name} BMI (${mark.bmi})!`);
} else {
    console.log(`${mark.name} BMI (${mark.bmi}) is larger than ${john.name} BMI (${john.bmi})!`);
}

//4
const billsArray = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipsArray = [];
const totalArray = [];
for (let i = 0; i < billsArray.length; i++) {
    let tip = calcTip(billsArray[i]);
    tipsArray.push(tip);
    totalArray.push(tip + billsArray[i]);
}
console.log(tipsArray);
console.log(totalArray);

function calcAverageArray(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++)
        total = total + array[i];
    return total / array.length;
}
console.log(calcAverageArray(billsArray));
console.log(calcAverageArray(tipsArray));
console.log(calcAverageArray(totalArray));