/*
CHAPTER 6 — Array Methods: map / filter / reduce (next)
Goal: learn to think in transformations instead of loops.
6.1 Mental map
map → 1-to-1 length, new array.
filter → ≤ original length, new array.
reduce → collapses to any single value (number, object, array, etc.).
*/

const nums = [1, 2, 3, 4];

const doubled = nums.map(n => n * 2);
console.log(doubled); // ??? -> [2,4,6,8]

const evens   = nums.filter(n => n % 2 === 0);
console.log(evens);   // ??? -> [2, 4]

const sum     = nums.reduce((acc, n) => acc + n, 0);
console.log(sum);     // ??? -> 10

/*6.3 Challenge
One expression: produce the sum of the squares of the even numbers (answer should be 20).
You may chain the methods but no intermediate variables.*/
const result = nums
    .filter(n => n % 2 === 0) // Step 0: Keep only even numbers -> [2, 4]
    .map(n => n * n)       // Step 1: Square each even number -> [4, 16]
    .reduce((acc,cur) => acc +  cur, 0); // Step 2: Sum the squared numbers -> 4 + 16 = 20
console.log(result); // -> 20