'use strict';

function request(){
}

function solve() {
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
    const [R, C] = await intList();

    console.log(`Case #${i+1}: ${solve(R, C)}`);
  }

  // Interactive tasks
  const [T, M] = await intList();
  for (let i = 0; i < T; i++) {
    for (var responses = []; responses.length < M; responses.push(await bigIntList())) {
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
