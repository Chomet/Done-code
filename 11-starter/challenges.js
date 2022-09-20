//1
const j1 = [3, 5, 2, 12, 7];
const j2 = [9, 16, 6, 8, 3];
const k1 = [4, 1, 15, 8, 3];
const k2 = [10, 5, 6, 1, 4];

const checkDogs = function (j, k) {
  let onlyDogs = j.slice(1, 3).concat(k);
  onlyDogs.forEach(function (dogAge, i) {
    if (dogAge > 2) {
      console.log(`Dog number ${i + 1} is an adult and is ${dogAge} years old`);
    } else console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

console.log(checkDogs(j1, k1));

//2
const j3 = [5, 2, 4, 1, 15, 8, 3];
const k3 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (jk) {
  let noAdults = 0;
  const totalAge = jk.reduce(function (acc, age) {
    if (age < 3) {
      return acc;
    } else {
      humanAge = 16 + age * 4;
      noAdults++;
      return acc + humanAge;
    }
  });
  return totalAge / noAdults;
};
console.log(calcAverageHumanAge(j3));
console.log(calcAverageHumanAge(k3));

//3
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach(function (dog) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);
const dogSarah = dogs.find(function (dog) {
  return dog.owners.includes("Sarah");
});
console.log(dogSarah.curFood > dogSarah.recommendedFood);
const tooMuch = dogs
  .filter(function (dog) {
    return dog.curFood > dog.recommendedFood;
  })
  .flatMap(function (dog) {
    return dog.owners;
  });
console.log(tooMuch);
console.log(
  dogs.some(function (dog) {
    return dog.curFood === dog.recommendedFood;
  })
);
const dogsCopy = [...dogs].sort(function (a, b) {
  return a.recommendedFood - b.recommendedFood;
});
console.log(dogsCopy);
