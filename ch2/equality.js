/*

CHAPTER 2 — Equality & Object.is (today)
Goal: stop guessing and predict what any comparison returns.
2.1 Mental map
== : loose (coercion) – ignore it forever.
=== : strict (no coercion) – use 99 % of time.
Object.is : same as === except for two edge cases:
– NaN vs NaN → true
– +0 vs -0 → false


*/// 2.2 Reference vs Value
// Primitive values (number, string, boolean, null, undefined, symbol, bigint)
// are compared by value.   


console.log(1 === 1);            // true
console.log('a' === 'a');        // true
console.log({} === {});          // false -> This condition will always return 'false' since JavaScript compares objects by reference, not value.
console.log([] === []);          // false -> This condition will always return 'false' since JavaScript compares objects by reference, not value.
console.log(function(){} === function(){}); // false -> This condition will always return 'false' since JavaScript compares objects by reference, not value.
console.log(null === null);        // true
console.log(undefined === undefined); // true
console.log(NaN === NaN);         // false -> This condition will always return 'false' since NaN is not equal to anything, including itself.
console.log(0 === -0);           // true    -> This condition will always return 'true' since +0 and -0 are considered equal in JavaScript. 
console.log(Object.is(NaN, NaN));// false ??? -> This condition will always return 'true' since Object.is correctly identifies that NaN is the same as NaN.
console.log(Object.is(0, -0));   // true ??? -> This condition will always return 'false' since Object.is correctly identifies that +0 and -0 are different values.
console.log(Object.is(0, 0));     // true
console.log(Object.is(-0, -0));   // true   


//Challenge
const obj = { n: 1 };
const other = obj;
console.log(obj === other); // true

obj.n = 2;
console.log(other.n); // 2