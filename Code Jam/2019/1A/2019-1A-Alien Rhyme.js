'use strict';

// Wrong Answer
function solve(words) {
  const list = words.map((v) => [...v].reverse().join('')).sort();

  const max = list.reduce((s, v) => Math.max(s, v.length), 0);
  for (let m = max; m > 0; m--) {
    for (let i = list.length - 1, c; i >= 0; i--) {
      if (c !== list[i][m - 1] && rhyme(list[i], list[i + 1], m)) {
        c = list[i][m - 1];
        list.splice(i, 2);
      }
    }
  }

  return words.length - list.length;

  function rhyme(a, b, max) {
    if (!a || !b) return false;

    for (let i = 0; i < max; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;

  const T = await line() | 0;
  for (let i = 0; i < T; i++) {
    const N = await line() | 0;
    for (var words = []; words.length < N; words.push(await line()));

    console.log(`Case #${i + 1}: ${solve(words)}`);
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  // console.warn(process.memoryUsage());
  process.exit();
})();
