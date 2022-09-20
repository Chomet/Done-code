// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    value: Number(prompt("Degrees celsius:")),
  };

  console.log(measurement);
  console.table(measurement);
  console.warn(measurement.value);
  console.error(measurement.value);

  return measurement.value + 273;
};
console.log(measureKelvin());

function printForecast(arr) {
  let endString = "...";
  for (let i = 0; i < arr.length; i++) {
    endString += `${arr[i]} in ${i + 1} days...`;
  }
  return endString;
}
console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
