// Example 1: Basic method vs function invocation
console.log("=== Example 1 ===");
var name = "global";

var person = {
  name: "Alice",
  sayName: function () {
    console.log(this.name);
  },
};

person.sayName(); // Guess: ?
var sayName = person.sayName;
sayName(); // Guess: ?

// Example 2: Arrow function vs normal function
console.log("\n=== Example 2 ===");
var user = {
  name: "Bob",
  normalMethod: function () {
    console.log("Normal:", this.name);
  },
  arrowMethod: () => {
    console.log("Arrow:", this.name);
  },
};

user.normalMethod(); // Guess: ?
user.arrowMethod(); // Guess: ?

// Example 3: Nested functions
console.log("\n=== Example 3 ===");
var obj = {
  name: "Charlie",
  outer: function () {
    console.log("Outer:", this.name);

    function inner() {
      console.log("Inner:", this.name);
    }

    inner();
  },
};

obj.outer(); // Guess: ?

// Example 4: Arrow function in nested context
console.log("\n=== Example 4 ===");
var container = {
  name: "David",
  outer: function () {
    console.log("Outer:", this.name);

    const inner = () => {
      console.log("Inner arrow:", this.name);
    };

    inner();
  },
};

container.outer(); // Guess: ?

// Example 5: setTimeout with different function types
console.log("\n=== Example 5 ===");
var timer = {
  name: "Eve",
  start: function () {
    setTimeout(function () {
      console.log("setTimeout normal:", this.name);
    }, 100);

    setTimeout(() => {
      console.log("setTimeout arrow:", this.name);
    }, 200);
  },
};

timer.start(); // Guess: ?
