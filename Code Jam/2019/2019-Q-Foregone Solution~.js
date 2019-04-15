'use strict';

function pair(sum) {
  let first = '';
  let second = '';

  [...sum].forEach((v) => {
    first += v === '4' ? '3' : v;
    second += v === '4' ? '1' : '0';
  });

  return [first, second.replace(/^0+/, '')];
}

let expect = 'numberOfCases';
let total;
let counter = 0;

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', function(line) {
  if (expect === 'numberOfCases') {
    total = parseInt(line);
    expect = 'case';

  } else if (expect === 'case') {
    console.log(`Case #${++counter}: ${pair(line).join(' ')}`);
    expect = 'case';

    if (counter >= total) rl.close();
  }

}).on('close', function() {
  process.exit(0);
});
