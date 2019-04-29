'use strict';

function solve(P, Q, rows) {
  const A = new Array(2).fill(null).map(() => new Array(Q + 1).fill(null));
  rows.forEach(([x, y, d]) => {
    if (d === 'W')(A[0][0]++, A[0][x]--);
    if (d === 'E')(A[0][x + 1]++);
    if (d === 'S')(A[1][0]++, A[1][y]--);
    if (d === 'N')(A[1][y + 1]++);
  });

  return A.map((v) => {
    let p = 0;
    return v.reduce((m, v, i, a) => {
      if (v === null) return m;
      p = a[i] += p;
      if (a[m] < a[i]) m = i;
      return m;
    }, 0);
  });
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
    const [P, Q] = await intList();
    for(var rows = []; rows.length < P; rows.push((await line()).split(' ').map((v, i) => i < 2 ? v | 0 : v)));

    console.log(`Case #${i + 1}: ${solve(P, Q, rows).join(' ')}`);
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
