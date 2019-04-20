'use strict';

function solve(rows, R, C) {
  console.time('s');
  const dist = Array(R).fill(null).map(() => Array(C).fill(Infinity));
  const breadth = [];
  rows.forEach((row, i) => row.forEach((col, j) => col && (dist[i][j] = 0, breadth.push([i, j]))));
  let min = 0; let max = breadth.length ? 0 : (R >> 1) + (C >> 1);
  console.timeLog('s');
  for (; breadth.length; ) {
    const [i, j] = breadth.shift();
    max = Math.max(max, dist[i][j]);
    if (max < dist[i][j]) max = dist[i][j];
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([di, dj]) => {
      const [x, y] = [i + di, j + dj];
      if (x < 0 || y < 0 || x >= R || y >= C || dist[x][y] !== Infinity) return;
      dist[x][y] = dist[i][j] + 1;
      breadth.push([x, y]);
    });
  }
  console.timeLog('s');

  for (; min < max; ) {
    console.time('a');
    const K = min + max >> 1;
    let sx = -Infinity; let sn = Infinity;
    let dx = -Infinity; let dn = Infinity;
    dist.forEach((row, i) => row.forEach((col, j) => {
      if (col <= K) return;
      sx = Math.max(sx, i + j); sn = Math.min(sn, i + j);
      dx = Math.max(dx, i - j); dn = Math.min(dn, i - j);
    }));
    console.timeLog('a');
    rows.some((row, i) => row.some((col, j) => {
      const [s, d] = [i + j, i - j];
      return sx - s <= K && sn - s >= -K && dx - d <= K && dn - d >= -K;
    } )) ? max = K : min = K + 1;
    console.timeEnd('a');
  }
  console.timeEnd('s');

  return min;
}

(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;
  const intList = async () => (await line()).split(' ').map((v) => v | 0);
  const intLine = async () => (await line()).split('').map((v) => v | 0);

  const T = await line() | 0;
  for (let i = 0; i < T; i++) {
    console.time('t');
    const [R, C] = await intList();
    for (var rows = []; rows.length < R; rows.push(await intLine()));
    console.timeLog('t');

    console.log(`Case #${i + 1}: ${solve(rows, R, C)}`);
    console.timeEnd('t');
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
