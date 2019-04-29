'use strict';

const req = [42, 210];
function request(i) {
  return req[i];
}

function solve(responses) {
  const R = new Array(6);

  let v = responses[1];
  R[3] = v >> 52n & 0x7Fn;
  R[4] = v >> 42n & 0x7Fn;
  R[5] = v >> 35n & 0x7Fn;

  v = responses[0] - (R[3] << 10n) - (R[4] << 8n) - (R[5] << 7n);
  R[0] = v >> 42n & 0x7Fn;
  R[1] = v >> 21n & 0x7Fn;
  R[2] = v >> 14n & 0x7Fn;

  return R.map((v) => v & 0x7Fn);
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
    for (var responses = []; responses.length < req.length; responses.push(BigInt(await line()))) {
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
