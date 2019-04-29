'use strict';

function solve(N, K, C, D) {
  let count = 0;

  for (let i = 0; i < N; i++) {
    let mc = 0; let md = 0;
    for (let j = i; j < N; j++) {
      if(mc < C[j]) mc = C[j];
      if(md < D[j]) md = D[j];
      if(Math.abs(mc - md) <= K) count++;
    }
  }

  return count;
}

(async() => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function*() {
    for await (const line of rl) yield line;
  })();
  const line = async() => (await generator.next()).value;
  const intList = async() => (await line()).split(' ').map((v) => v | 0);
  const bigIntList = async() => (await line()).split(' ').map((v) => BigInt(v));

  const T = await line() | 0;
  for (let i = 0; i < T; i++) {
    const [N, K] = await intList();
    const C = await intList();
    const D = await intList();

    console.log(`Case #${i+1}: ${solve(N, K, C, D)}`);
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
