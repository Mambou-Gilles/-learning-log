let x = 1;

function foo() {
  console.log(x); // -> 1
}

function bar() {
  x = 2;
  foo();          // foo declared outside, so x = 1
}

bar();