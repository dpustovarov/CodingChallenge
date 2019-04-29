'use strict';

function solve(words) {
  const trie = new Map();

  words.forEach((v) => {
    let node = trie;
    [...v].reverse().forEach((v) => {
      if (!node.get(v)) node.set(v, new Map());
      node = node.get(v);
    });
    node.set(null, new Map());
  });

  return words.length - go(trie);

  function go(node) {
    if (!node.size) return 1;
    const count = [...node.values()].reduce((s, v) => s + go(v), 0);
    return count >= 2 && node !== trie ? count - 2 : count;
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
