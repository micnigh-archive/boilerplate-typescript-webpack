import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";

import "es5-shim";
import "es5-shim/es5-sham";
import "regenerator/runtime";

import HelloWorld from "./component/HelloWorld";

let appStyle = require("./app.scss").use();

console.log("test test");

ReactDOM.render(
  <HelloWorld name="Test"/>,
  document.getElementById("content")
);
