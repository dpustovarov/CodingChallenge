'use strict';

function solve(values) {
  const result = Array(values.length + 1);

  for (var i = 1; i < values.length; i++) {
    if (values[i - 1] !== values[i]) break;
  }

  result[i] = gcd(values[i - 1], values[i]);
  result[i - 1] = values[i - 1] / result[i];
  for (let k = i - 2; k >= 0; k--) {
    result[k] = result[k + 2];
  }

  for (; i < values.length; i++) {
    result[i + 1] = values[i] / result[i];
  }

  const dic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const map = {};
  result.forEach((v) => map[v] = true);
  Object.keys(map).sort((a, b) => a - b).forEach((v, i) => map[v] = dic[i]);

  return result.map((v) => map[v]).join('');
}

function gcd(a, b) {
  if (a === b) return a;
  if (a === 0n) return b;
  if (b === 0n) return a;
  if (~a & 1n) return b & 1n ? gcd(a >> 1n, b) : gcd(a >> 1n, b >> 1n) << 1n;
  if (~b & 1n) return gcd(a, b >> 1n);

  return a > b ? gcd((a - b) >> 1n, b) : gcd((b - a) >> 1n, a);
}

(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;
  const intList = async () => (await line()).split(' ').map((v) => v | 0);
  const bigIntList = async () => (await line()).split(' ').map((v) => BigInt(v));

  const T = await line() | 0;
  for (let i = 0; i < T; i++) {
    const [N, L] = await intList();

    console.log(`Case #${i+1}: ${solve(await bigIntList())}`);
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
