'use strict';

function solve(R, C) {
  const [r, c] = [R - 1, C - 1];

  const galaxy = Array(R).fill(null).map((row, i) => Array(C).fill(null).map((col, j) =>
    r + c + Math.min(i, j) + Math.min(r - i, c - j) + Math.min(i, c - j) + Math.min(r - i, j)
  ));

  let [x, y] = [0, 0];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (galaxy[i][j] > galaxy[x][y]) [x, y] = [i, j];
    }
  }

  const path = [];
  for (; x !== null;) {
    path.push([x + 1, y + 1]);

    galaxy[x][y] = null;
    for (let i = 0; i <= r; i++) galaxy[i][y] && galaxy[i][y]--;
    for (let i = 0; i <= c; i++) galaxy[x][i] && galaxy[x][i]--;
    for (let i = -Math.min(x, y); i <= Math.min(r - x, c - y); i++) galaxy[x + i][y + i] && galaxy[x + i][y + i]--;
    for (let i = -Math.min(x, c - y); i <= Math.min(r - x, y); i++) galaxy[x + i][y - i] && galaxy[x + i][y - i]--;

    let [m, n] = [null, null];
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (galaxy[i][j] === null) continue;
        if (i === x || j === y || i - j === x - y || i + j === x + y) continue;
        if (m === null || galaxy[i][j] > galaxy[m][n]) [m, n] = [i, j];
      }
    }
    [x, y] = [m, n];
  }

  return path.length === R * C ? path : [];
}

(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;
  const intList = async () => (await line()).split(' ').map((v) => v | 0);

  const T = await line() | 0;
  for (let i = 0; i < T; i++) {
    const [R, C] = await intList();

    const solution = solve(R, C);
    console.log(`Case #${i + 1}: ${solution.length ? 'POSSIBLE' : 'IMPOSSIBLE'}`);
    solution.forEach(([i, j]) => console.log(`${i} ${j}`));
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
