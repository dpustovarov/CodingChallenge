'use strict';

const size = 7;
const requests = [2 * 3 * size, 5 * 6 * size];
function request(i) {
  return requests[i];
}

function solve(responses) {
  const R = new Array(6+1);

  const mask = BigInt((1 << size) - 1); 
  let r = BigInt(requests[1]); let v = responses[1];
  for (let i = 4n; i <= 6n; i++) 
    R[i] = v >> r / i & mask;
    
  r = BigInt(requests[0]); v = responses[0];
  for (let i = 4n; i <= 6n; i++) 
    v -= R[i] << r / i;
  for (let i = 1n; i <= 3n; i++) 
    R[i] = v >> r / i & mask;

  R.shift();
  return R;
}

(async() => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function*() {
    for await (const line of rl) yield line;
  })();
  const line = async() => (await generator.next()).value;
  const intList = async() => (await line()).split(' ').map((v) => v | 0);

  // Interactive tasks
  const [T, W] = await intList();

  for (let i = 0; i < T; i++) {
    for (var responses = []; responses.length < requests.length; responses.push(BigInt(await line()))) {
      console.log(request(responses.length));
    }

    console.warn(responses);
    console.log(solve(responses).join(' '));
    if (await line() != 1) process.exit();
  }

  if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
