'use strict';

const mod = [5, 7, 9, 11, 13, 16, 17];
function request(k, length = 18) {
  return Array(length).fill(mod[k]);
}

function solve(responses, M) {
  const remainders = responses.map((v, i) => v.reduce((s, v) => s + v, 0) % mod[i]);
  for (let k = 0; k <= M; k++) {
    if (remainders.every((v, i) => v === k % mod[i])) return k;
  }
}

(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;
  const intList = async () => (await line()).split(' ').map((v) => v | 0);

  const [T, N, M] = await intList();
  for (let i = 0; i < T; i++) {
    for (var responses = []; responses.length < mod.length; responses.push(await intList())) {
      console.log(request(responses.length).join(' '));
    }

    console.warn(responses);
    console.log(solve(responses, M));
    if (await line() != 1) process.exit();
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
