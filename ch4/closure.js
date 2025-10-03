/*
CHAPTER 4 — Closures (today)
Goal: see why inner functions “remember” variables even after the outer function ends.
4.1 Mental map
Every function carries a hidden [[Environment]] reference to the scope in which it was created.
As long as that inner function is reachable, the whole scope (and its variables) stays alive → closure.
*/

function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const inc = makeCounter();
inc(); // ??? -> 1
inc(); // ??? -> 2
inc(); // ??? ->3


//Challenge: Add one line at the bottom so the final log is 1 (i.e. a fresh counter starts):

const newInc = makeCounter();
newInc(); //-> 1