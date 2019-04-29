'use strict';

const factorial = (n) => n ? n * factorial(n - 1n) : 1n;
const combination2 = (n, k) => factorial(n) / factorial(k) / factorial(n - k);

const combi = Array(101).fill(null).map(() => Array(101));
function combination(n , k) {
  if(combi[n][k] !== undefined) return combi[n][k];

  let p = 1;
  const min = k < n - k ? k : n - k;
  for (let i = 1; i <= min; i++) {
    p = p * (n - i + 1) / i; 
  }

  return combi[n][k] = p;
}

function solve(L = 10, U = 18, B = 17) {
  if(!U) return 0;

  let s = 0;
  for (let K = 0; K < (B < L ? B : L); K++) {
    s += combination(L, K) + solve(L - K, U - 1, B);
  }
  return s;
}


(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;

  const [T, N, M] = (await line()).split(' ').map((v) => v | 0);
  for (let i = 0; i < 0; i++) {
    const [N] = (await line()).split(' ').map((v) => v | 0);
    for (var words = []; words.length < N; words.push(await line()));

    console.log(`Case #${i+1}: ${solve(words)}`);
  }
  console.log(`Case #${+1}: ${solve() / 18**10}`);

  if (process.env.USER === 'dpustovarov') {
    console.timeEnd();
    console.debug(process.memoryUsage());
  }
})();
