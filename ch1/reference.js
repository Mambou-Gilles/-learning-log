const a = { count: 1 };
let b = a;               // same reference
b = { ...b };            // NEW object *before* a changes
a.count = 2;             // mutate original, b unaffected
console.log(b.count);    // → 1

// b and a are references to the same object in memory
// Changing a.count also changes b.count because they point to the same object
// If we had done b = { count: 1 }, then b would point to a different object

// Primitive values (like numbers, strings, booleans) are copied by value
// Objects (including arrays and functions) are copied by reference