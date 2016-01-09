// enable hot reload
declare const module: any;
if (module.hot) {
  module.hot.accept();
}

// famous library to try out typing with
import * as _ from "underscore";

// no type definition for external js lib
// so we define it in `shims.d.ts` shim
import * as es5_shim from "es5-shim";
console.log(es5_shim, "test");

// import external lib without caring about type
import "es5-shim/es5-sham";

// more fun with types
let test = [1, 2, 3, 4, 5];

console.log("filter:", _.filter(test, e => e > 2));

_.filter(test, e => e > 3);

function sliceLastNumberArray (arrayToSlice: number[]): number[] {
  return test.slice(-1);
}

let lastElement = sliceLastNumberArray(test);

console.log(lastElement);

import A from "./a";

A("Bobby");

document.getElementById("content").innerHTML = "Hey hey";

// allow async functions
import "regenerator/runtime";

// apply css, remove and add new css, then revert back
require("./app.scss").use();
async function testAsyncAwait () {
  let result = await new Promise((resolve) => {
    setTimeout(() => {
      require("./app.scss").unuse();
      require("./app-shifty-shfive.scss").use();
      resolve(`shifty-shfive=${5 + 5}`);
      setTimeout(() => {
        require("./app-shifty-shfive.scss").unuse();
        require("./app.scss").use();
      }, 1000);
    }, 1000);
  });
  console.log(result);
}

testAsyncAwait();
