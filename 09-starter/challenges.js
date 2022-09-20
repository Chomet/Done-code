//1
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnabry",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnabry", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2019",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);
const [munichGK, ...fieldPlayers] = players1;
console.log(munichGK, fieldPlayers);
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

function printGoals(...players) {
  console.log(players);
  console.log(`${players.length} players have scored`);
}
printGoals("Muller", "Lewandowski", "Perisic");
console.log();

team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

//2
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}
let averageOdd = 0;
for (const bets of Object.values(game.odds)) {
  averageOdd += bets;
}
averageOdd /= Object.values(game.odds).length;
console.log(averageOdd);
console.log(`Odds of victory ${game.team1}: ${game.odds.team1}`);
console.log(`Odds of draw: ${game.odds.x}`);
console.log(`Odds of victory ${game.team2}: ${game.odds.team2}`);
const scorers = {};
for (const scorer of game.scored) {
  if (scorers[scorer]) scorers[scorer]++;
  else scorers[scorer] = 1;
}
console.log(scorers);

//3
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "� Substitution"],
  [47, "⚽ GOAL"],
  [61, "� Substitution"],
  [64, "� Yellow card"],
  [69, "� Red card"],
  [70, "� Substitution"],
  [72, "� Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "� Yellow card"],
]);
const events = [...new Set(gameEvents.values())];
console.log(events);
gameEvents.delete(64);
console.log(`Event happened every ${90 / gameEvents.size} minutes`);
for (const [key, value] of gameEvents) {
  if (key < 46) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else console.log(`[SECOND HALF] ${key}: ${value}`);
}

//4
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const input = document.querySelector("textarea").value;
  const separated = input.split("\n");
  for (const [i, str] of separated.entries()) {
    let [a, b] = str.trim().toLowerCase().split("_");
    const camelCase = a + b[0].toUpperCase() + b.slice(1);
    console.log(camelCase.padEnd(20, " ") + "+".repeat(i + 1));
  }
});

//5
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const rows = flights.split("+");
for (const i of rows) {
  let [descr, start, finish, time] = i.split(";");
  descr = descr.replace(/_/g, " ").slice(1);
  start = start.slice(0, 3).toUpperCase();
  finish = finish.slice(0, 3).toUpperCase();
  time = time.replace(":", "h");
  console.log(
    `${((descr.includes("Delayed") ? "+ " : "") + descr).padStart(
      19
    )} from ${start} to ${finish} (${time})`
  );
  /*if (descr.includes("Delayed")) {
    console.log(
      `${("+ " + descr).padStart(19)} from ${start} to ${finish} (${time})`
    );
  } else {
    console.log(`${descr.padStart(19)} from ${start} to ${finish} (${time})`);
  }*/
}
