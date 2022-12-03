const fs = require("fs");

function part1() {
  const rucksacks = fs.readFileSync("./input.txt").toString().split("\n");
  let sum = 0;
  for (let r of rucksacks) {
    let shared = null;
    const arr = r.split("");
    const middle = Math.round(arr.length / 2);
    const first = arr.slice(0, middle).reduce((acc, e) => {
      acc[e] = 1;
      return acc;
    }, {});
    for (let i = middle; i < arr.length; i++) {
      if (first[arr[i]]) {
        shared = arr[i];
      }
    }
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    const alpha = (lower + upper).split("");

    alpha.forEach((e, index) => {
      if (e === shared) {
        console.log(`${shared} ==> ${index + 1}`);
        sum += index + 1;
      }
    });
  }
  console.log({ sum });
}

function part2() {
  const rucksacks = fs.readFileSync("./input.txt").toString().split("\n");
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const alpha = (lower + upper).split("");

  let sum = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const group = rucksacks.slice(i, i + 3);
    const results = [group[0]];
    for (let i = 1; i < group.length; i++) {
      const a = group[i].split("");
      const compare = results[i - 1].split("");
      const tmp = [];
      a.forEach((c) => {
        if (compare.includes(c)) {
          tmp.push(c);
        }
      });
      results.push(tmp.join(""));
    }

    const shared = results[results.length - 1][0];

    alpha.forEach((e, index) => {
      if (e === shared) {
        console.log(`${shared} ==> ${index + 1}`);
        sum += index + 1;
      }
    });
    console.log({ res: shared });
  }
  console.log({ sum });
}

// part1();
part2();
