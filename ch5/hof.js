/*
CHAPTER 5 — Higher-Order Functions & Callback Flow (next)
Goal: get comfortable passing functions around as data before we touch arrays / map / filter.
5.1 Mental map
Functions are just values → can be stored, passed, returned.
Caller decides when to invoke the callback; callee decides how.
*/


function greet(name, formatter) {
  console.log('Hello ' + formatter(name));
}

function upper(s) { return s.toUpperCase(); }
function lower(s) { return s.toLowerCase(); }

greet('Ada', upper); // ??? -> Hello ADA
greet('Ada', lower); // ??? -> Hello ada

//5.3 Challenge
//Write one line that calls greet so it prints exactly:
greet('Ada', function(s) { return s + s; }); // -> Hello AdaAda
