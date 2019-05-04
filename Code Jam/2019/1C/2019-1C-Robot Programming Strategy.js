'use strict';

function solve(A, robots) {
  const prog = [];

  for (let i = 0; i < 500; i++) {
    const move = {};
    robots.forEach((v) => {
      move[v[i % v.length]] = true;
    });
    if (move.R && move.P && move.S) return false;
    else if (move.R && move.P) {
      prog.push('P');
      robots = robots.filter((v) => v[i % v.length] === 'P');
    } else if (move.P && move.S) {
      prog.push('S');
      robots = robots.filter((v) => v[i % v.length] === 'S');
    } else if (move.S && move.R) {
      prog.push('R');
      robots = robots.filter((v) => v[i % v.length] === 'R');
    } else if (move.R) {
      prog.push('P');
      break;
    } else if (move.P) {
      prog.push('S');
      break;
    } else if (move.S) {
      prog.push('R');
      break;
    }
  }

  return prog;
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
    const [A] = await intList();
    for (var robots = []; robots.length < A; robots.push(await line()));

    const s = solve(A, robots);
    console.log(`Case #${i + 1}: ${!s ? 'IMPOSSIBLE' : s.join('')}`);
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
