const fs = require("fs");

const MAPPINGS = {
  MOVE1: {
    A: "rock",
    B: "paper",
    C: "scissors",
  },
  MOVE2: {
    X: "rock",
    Y: "paper",
    Z: "scissors",
  },
  RESULT: {
    X: "lose",
    Y: "draw",
    Z: "win",
  },
};

const GAME_RESULT = {
  "rock::paper": "lose",
  "rock::scissors": "win",
  "scissors::rock": "lose",
  "scissors::paper": "win",
  "paper::rock": "win",
  "paper::scissors": "lose",
};

const GAME_SCORE = {
  RESULT: {
    win: 6,
    draw: 3,
    lose: 0,
  },
  SHAPE: {
    rock: 1,
    paper: 2,
    scissors: 3,
  },
};

function part1() {
  const input = fs.readFileSync("./input.txt").toString().split("\n");

  let sum = 0;
  for (const game of input) {
    const [move1, space, move2] = game.split("");
    const type1 = MAPPINGS.MOVE1[move1];
    const type2 = MAPPINGS.MOVE2[move2];
    const result = gameResult(type2, type1);
    const tempSum = GAME_SCORE.SHAPE[type2] + GAME_SCORE.RESULT[result];
    sum += tempSum;
  }
  console.log({ part1: sum });
}

function part2() {
  const input = fs.readFileSync("./input.txt").toString().split("\n");

  let sum = 0;
  for (const game of input) {
    const [move1, space, move2] = game.split("");
    const opponentMove = MAPPINGS.MOVE1[move1];
    const desiredResult = MAPPINGS.RESULT[move2];
    console.log({ opponentMove, desiredResult });
    const result = calculateMove(opponentMove, desiredResult);
    console.log({ move: result });
    const tempSum = GAME_SCORE.SHAPE[result] + GAME_SCORE.RESULT[desiredResult];
    console.log({
      calculation: `${GAME_SCORE.SHAPE[result]} + ${GAME_SCORE.RESULT[desiredResult]}`,
    });
    sum += tempSum;
  }
  console.log({ part2: sum });
}

function gameResult(type1, type2) {
  if (type1 === type2) {
    return "draw";
  }

  const key = `${type1}::${type2}`;
  return GAME_RESULT[key];
}

function calculateMove(opponentMove, desiredResult) {
  if (desiredResult === "draw") {
    return opponentMove;
  }
  return Object.keys(GAME_RESULT).reduce((acc, key) => {
    if (acc) {
      return acc;
    }

    const result = desiredResult === "win" ? "lose" : "win";
    const [move1, move2] = key.split("::");
    if (move1 === opponentMove && GAME_RESULT[key] === result) {
      acc = move2;
      return acc;
    }

    return acc;
  }, null);
}

part2();
