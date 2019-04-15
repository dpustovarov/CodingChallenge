'use strict';

function decrypt(values) {
  const result = Array(values.length + 1);

  let i = 1;
  for (; i < values.length; i++) {
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
  if (a === 0) return b;
  if (b === 0) return a;
  if (~a & 1) return b & 1 ? gcd(a >> 1, b) : gcd(a >> 1, b >> 1) << 1;
  if (~b & 1) return gcd(a, b >> 1);

  return a > b ? gcd((a - b) >> 1, b) : gcd((b - a) >> 1, a);
}

let expect = 'numberOfCases';
let total;
let counter = 0;

const readline = require('readline');
const rl = readline.createInterface(process.stdin, null);
rl.on('line', function(line) {
  if (expect === 'numberOfCases') {
    total = parseInt(line);
    expect = 'case';

  } else if (expect === 'case') {
    const m = line.split(' ').map((v) => parseInt(v)); // not used
    expect = 'arguments';

  } else if (expect === 'arguments') {
    console.log(`Case #${++counter}: ${decrypt(line.split(' ').map((v) => parseInt(v)))}`);
    expect = 'case';

    if (counter >= total) rl.close();
  }

}).on('close', function() {
  process.exit(0);
});
