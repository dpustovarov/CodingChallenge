'use strict';

function Case() {
  let dic = 'ABCDE'.split('');
  const bundles = [119, 23, 5, 1, 0];
  let requests = new Array(bundles[0]).fill(null).map((v, i) => i);
  let responses = [];
  const answer = [];

  this.done = () => answer.length >= bundles.length - 1;
  this.request = () => requests[responses.length] * bundles.length + answer.length + 1;
  this.response = (L) => {
    responses.push(L);
    if (responses.length < requests.length) return;

    const map = {};
    dic.forEach((v) => map[v] = 0);
    responses.forEach((v) => map[v]++);

    const letter = dic.find((v) => map[v] === bundles[answer.length + 1]);
    dic = dic.filter((v) => v !== letter);
    requests = requests.filter((v, i) => responses[i] === letter);
    responses = [];
    answer.push(letter);
  };
  this.solve = () => (answer.push(dic.pop()), answer);
}

(async () => {
  console.time();

  const rl = require('readline').createInterface(process.stdin);
  const generator = (async function* () {
    for await (const line of rl) yield line;
  })();
  const line = async () => (await generator.next()).value;
  const intList = async () => (await line()).split(' ').map((v) => v | 0);

  // Interactive tasks
  const [T, F] = await intList();
  for (let i = 0; i < T; i++) {
    for (var c = new Case(); !c.done(); c.response(await line())) console.log(c.request());
    console.log(c.solve().join(''));
    if (await line() !== 'Y') process.exit();
  }

  // if (process.env.USER === 'dpustovarov') console.timeEnd();
  console.warn(process.memoryUsage());
  process.exit();
})();
