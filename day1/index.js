const fs = require("fs");

async function main() {
  const input = fs.readFileSync("./input.txt").toString();

  let maxElf = 0;
  let tempElf = 0;
  const arr = input.split("\n");
  const sumArr = [];
  for (const calory of arr) {
    const c = parseFloat(calory);
    if (isNaN(c)) {
      sumArr.push(tempElf);
      if (maxElf < tempElf) {
        maxElf = tempElf;
      }
      tempElf = 0;
    } else {
      tempElf += c;
    }
  }
  sumArr.push(tempElf);
  console.log(maxElf);
  console.log(sumArr.sort((a, b) => b - a));
  console.log("result => ", sumArr[0] + sumArr[1] + sumArr[2]);
}

main();
