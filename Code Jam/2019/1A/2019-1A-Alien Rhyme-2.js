'use strict';

function solve(words) {
  const trie = [{}];

  words.forEach((v) => {
    let n = 0;
    [...v].reverse().forEach((v) => {
      if (!trie[n][v]) trie[n][v] = trie.length;
      n = trie[n][v];
      if (!trie[n]) trie.push({});
    });
    trie[n][null] = null;
  });

  return words.length - go(0);

  function go(n) {
    if (n === null) return 1;
    const count = Object.values(trie[n]).reduce((s, v) => s + go(v), 0);
    return count >= 2 && n !== 0 ? count - 2 : count;
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

    console.log(`Case #${i+1}: ${solve(words)}`);
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
