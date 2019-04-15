'use strict';

function ownWay(way) {
  return [...way].map((v) => v === 'S' ? 'E' : 'S').join('');
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
    const N = parseInt(line); // not used
    expect = 'arguments';

  } else if (expect === 'arguments') {
    console.log(`Case #${++counter}: ${ownWay(line)}`);
    expect = 'case';

    if (counter >= total) rl.close();
  }

}).on('close', function() {
  process.exit(0);
});
