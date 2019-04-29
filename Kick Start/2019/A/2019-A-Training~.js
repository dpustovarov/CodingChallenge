'use strict';

function minTraining(N, P, S) {
  const so = S.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < P; i++) {
    sum += so[i];
  }
  let training = so[P - 1] * P - sum;

  for (let i = P; i < N; i++) {
    sum += so[i] - so[i - P];
    training = Math.min(training, so[i] * P - sum);
  }

  return training;
}

let expect = 'numberOfCases';
let total;
let counter = 0;

let N; let P;

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', function(line) {
  if (expect === 'numberOfCases') {
    total = parseInt(line);
    expect = 'case';

  } else if (expect === 'case') {
    const m = line.split(' ').map((v) => parseInt(v));
    N = m[0];
    P = m[1];
    expect = 'arguments';

  } else if (expect === 'arguments') {
    console.log(`Case #${++counter}: ${minTraining(N, P, line.split(' ').map((v) => parseInt(v)))}`);
    expect = 'case';

    if (counter >= total) rl.close();
  }
}).on('close', function() {
  process.exit(0);
});
