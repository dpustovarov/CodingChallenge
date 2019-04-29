'use strict';

function solve(P, Q, rows) {
    let X = new Set([0, Q]);
    let Y = new Set([0, Q]);
    rows.forEach(([x, y, d]) => {
      if(d === 'W') X.add(x - 1);
      if(d === 'E') X.add(x + 1);
      if(d === 'S') Y.add(y - 1);
      if(d === 'N') Y.add(y + 1);
    });
    X = [...X].sort((a, b) => a - b);
    Y = [...Y].sort((a, b) => a - b);

    let xc = new Array(X.length).fill(0);
    let yc = new Array(Y.length).fill(0);
    rows.forEach(([x, y, d]) => {
        if (d === 'W')
            for (let i = 0; i < X.length; i++) {
                if (X[i] >= x) break; 
                xc[i]++;
            }
        else if (d === 'E')
            for (let i = X.length - 1; i >= 0; i--) {
                if (X[i] <= x) break; 
                xc[i]++;
            }
        else if (d === 'S')
            for (let i = 0; i < Y.length; i++) {
                if (Y[i] >= y) break; 
                yc[i]++;
            }
        else if (d === 'N')
            for (let i = Y.length - 1; i >= 0; i--) {
                if (Y[i] <= y) break; 
                yc[i]++;
            }
    });
  let xm = Math.max(...xc);
  let ym = Math.max(...yc);
  return [X.find((v, i) => xc[i] === xm), Y.find((v, i) => yc[i] === ym)];
}

(async() => {
    console.time();

    const rl = require('readline').createInterface(process.stdin);
    const generator = (async function*() {
        for await (const line of rl) yield line;
    })();
    const line = async() => (await generator.next()).value;
    const intList = async() => (await line()).split(' ').map((v) => v | 0);

    const T = await line() | 0;
    for (let i = 0; i < T; i++) {
        const [P, Q] = await intList();
        for (var rows = [], m; rows.length < P; rows.push([m[0] | 0, m[1] | 0, m[2]])) {
            m = (await line()).split(' ');
        }

        console.log(`Case #${i + 1}: ${solve(P, Q, rows).join(' ')}`);
    }

    if (process.env.USER === 'dpustovarov') console.timeEnd();
    console.warn(process.memoryUsage());
    process.exit();
})();