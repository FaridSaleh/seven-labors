# JavaScript Hoisting - Complete Guide

A comprehensive guide to understanding how hoisting works in JavaScript for variables, functions, and classes.

## Table of Contents

- [Overview](#overview)
- [Variable Hoisting](#variable-hoisting)
- [Function Hoisting](#function-hoisting)
- [Class Hoisting](#class-hoisting)
- [Temporal Dead Zone (TDZ)](#temporal-dead-zone-tdz)
- [Hoisting Order](#hoisting-order)
- [Common Pitfalls](#common-pitfalls)
- [Best Practices](#best-practices)
- [Summary Table](#summary-table)

## Overview

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the compilation phase. Understanding hoisting is crucial for writing predictable JavaScript code and avoiding common bugs.

**Key Concept**: Declarations are hoisted, but initializations are not.

## Variable Hoisting

### var Hoisting

```javascript
console.log(x); // Output: undefined
var x = 5;
console.log(x); // Output: 5
```

**What happens:**

1. `var x` declaration is hoisted to the top
2. `x = 5` initialization stays in place
3. Before initialization, `x` is `undefined`

**Equivalent to:**

```javascript
var x; // Declaration hoisted
console.log(x); // undefined
x = 5; // Initialization
console.log(x); // 5
```

### let and const Hoisting

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;
console.log(x); // Output: 5
```

**What happens:**

1. `let x` declaration is hoisted to the top
2. `x = 5` initialization stays in place
3. Before initialization, `x` is in Temporal Dead Zone (TDZ)

**Equivalent to:**

```javascript
let x; // Declaration hoisted (but in TDZ)
console.log(x); // ReferenceError (TDZ)
x = 5; // Initialization
console.log(x); // 5
```

### Multiple Declarations

```javascript
var x = 1;
console.log(x); // Output: 1
var x = 2;
console.log(x); // Output: 2
```

**What happens:**

1. Both `var x` declarations are hoisted
2. Only the last initialization (`x = 2`) takes effect

**Equivalent to:**

```javascript
var x; // First declaration hoisted
var x; // Second declaration hoisted (ignored)
x = 1; // First initialization
console.log(x); // 1
x = 2; // Second initialization
console.log(x); // 2
```

## Function Hoisting

### Function Declarations

```javascript
sayHello(); // Output: "Hello!"

function sayHello() {
  console.log("Hello!");
}
```

**What happens:**

1. Entire function declaration is hoisted
2. Function can be called before its declaration

**Equivalent to:**

```javascript
function sayHello() {
  // Entire function hoisted
  console.log("Hello!");
}
sayHello(); // "Hello!"
```

### Function Expressions

```javascript
sayHello(); // TypeError: sayHello is not a function

var sayHello = function () {
  console.log("Hello!");
};
```

**What happens:**

1. `var sayHello` declaration is hoisted
2. Function assignment stays in place
3. Before assignment, `sayHello` is `undefined`

**Equivalent to:**

```javascript
var sayHello; // Declaration hoisted
sayHello(); // TypeError (sayHello is undefined)
sayHello = function () {
  // Assignment
  console.log("Hello!");
};
```

### Arrow Functions

```javascript
sayHello(); // TypeError: sayHello is not a function

const sayHello = () => {
  console.log("Hello!");
};
```

**What happens:**

1. `const sayHello` declaration is hoisted (but in TDZ)
2. Arrow function assignment stays in place
3. Before assignment, `sayHello` is in TDZ

**Equivalent to:**

```javascript
const sayHello; // Declaration hoisted (TDZ)
sayHello(); // ReferenceError (TDZ)
sayHello = () => { // Assignment
  console.log("Hello!");
};
```

## Class Hoisting

### Class Declarations

```javascript
const person = new Person("John"); // ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) {
    this.name = name;
  }
}
```

**What happens:**

1. `class Person` declaration is hoisted (but in TDZ)
2. Class cannot be used before declaration

**Equivalent to:**

```javascript
const Person; // Declaration hoisted (TDZ)
const person = new Person("John"); // ReferenceError (TDZ)
Person = class { // Assignment
  constructor(name) {
    this.name = name;
  }
};
```

### Class Expressions

```javascript
const person = new Person("John"); // ReferenceError: Cannot access 'Person' before initialization

const Person = class {
  constructor(name) {
    this.name = name;
  }
};
```

**What happens:**

1. `const Person` declaration is hoisted (but in TDZ)
2. Class assignment stays in place
3. Before assignment, `Person` is in TDZ

## Temporal Dead Zone (TDZ)

### What is TDZ?

The Temporal Dead Zone is the period between entering scope and the actual declaration where variables exist but cannot be accessed.

### TDZ Examples

```javascript
// TDZ starts here
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5; // TDZ ends here
console.log(x); // 5
```

### TDZ with Functions

```javascript
function example() {
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 5;
  console.log(x); // 5
}
```

### TDZ with Parameters

```javascript
function example(x = y, y = 1) {
  console.log(x, y);
}

example(); // ReferenceError: Cannot access 'y' before initialization
```

## Hoisting Order

### Declaration Order

JavaScript hoists declarations in this order:

1. **Function declarations** (highest priority)
2. **Variable declarations** (lower priority)

### Example

```javascript
console.log(typeof x); // "function" (function declaration wins)

var x = 1;

function x() {
  console.log("I'm a function");
}

console.log(typeof x); // "number" (variable assignment overwrites function)
```

**What happens:**

1. `function x()` is hoisted first
2. `var x` is hoisted second (ignored because function already exists)
3. `x = 1` overwrites the function

**Equivalent to:**

```javascript
function x() {
  // Function declaration hoisted first
  console.log("I'm a function");
}
var x; // Variable declaration hoisted (ignored)
console.log(typeof x); // "function"
x = 1; // Variable assignment overwrites function
console.log(typeof x); // "number"
```

### Function vs Variable Priority

```javascript
console.log(typeof example); // "function"

var example = "I'm a variable";

function example() {
  console.log("I'm a function");
}

console.log(typeof example); // "string"
```

## Common Pitfalls

### Pitfall 1: Using Variables Before Declaration

```javascript
// ❌ Bad - relies on hoisting
console.log(name); // undefined
var name = "John";

// ✅ Good - declare before use
var name = "John";
console.log(name); // "John"
```

### Pitfall 2: Function Expression vs Declaration

```javascript
// ❌ Bad - function expression not hoisted
sayHello(); // TypeError
var sayHello = function () {
  console.log("Hello");
};

// ✅ Good - function declaration is hoisted
sayHello(); // "Hello"
function sayHello() {
  console.log("Hello");
}
```

### Pitfall 3: Block Scope Confusion

```javascript
// ❌ Confusing - var is function-scoped, not block-scoped
if (true) {
  var x = 5;
}
console.log(x); // 5 (x is accessible outside the block)

// ✅ Clear - let is block-scoped
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

### Pitfall 4: Multiple Declarations

```javascript
// ❌ Confusing - multiple var declarations
var x = 1;
var x = 2;
console.log(x); // 2

// ✅ Clear - let prevents redeclaration
let y = 1;
let y = 2; // SyntaxError: Identifier 'y' has already been declared
```

## Best Practices

### 1. Use let and const Instead of var

```javascript
// ❌ Avoid var
var name = "John";

// ✅ Use const for values that won't change
const name = "John";

// ✅ Use let for values that will change
let count = 0;
```

### 2. Declare Variables at the Top

```javascript
// ❌ Bad - scattered declarations
function example() {
  console.log(x);
  var x = 1;
  console.log(y);
  let y = 2;
}

// ✅ Good - all declarations at the top
function example() {
  var x;
  let y;

  console.log(x);
  x = 1;
  console.log(y);
  y = 2;
}
```

### 3. Use Function Declarations for Hoisting

```javascript
// ❌ Bad - function expression not hoisted
const sayHello = function () {
  console.log("Hello");
};

// ✅ Good - function declaration is hoisted
function sayHello() {
  console.log("Hello");
}
```

### 4. Be Aware of TDZ

```javascript
// ❌ Bad - accessing variable in TDZ
console.log(x);
let x = 5;

// ✅ Good - declare before use
let x = 5;
console.log(x);
```

## Summary Table

| Declaration Type         | Hoisted | Initial Value | TDZ    | Redeclaration |
| ------------------------ | ------- | ------------- | ------ | ------------- |
| **var**                  | ✅ Yes  | `undefined`   | ❌ No  | ✅ Yes        |
| **let**                  | ✅ Yes  | Uninitialized | ✅ Yes | ❌ No         |
| **const**                | ✅ Yes  | Uninitialized | ✅ Yes | ❌ No         |
| **function declaration** | ✅ Yes  | Function      | ❌ No  | ✅ Yes        |
| **function expression**  | ❌ No   | `undefined`   | ❌ No  | ✅ Yes        |
| **arrow function**       | ❌ No   | Uninitialized | ✅ Yes | ❌ No         |
| **class declaration**    | ✅ Yes  | Uninitialized | ✅ Yes | ❌ No         |
| **class expression**     | ❌ No   | Uninitialized | ✅ Yes | ❌ No         |

## Key Principles

1. **Declarations are hoisted, initializations are not**
2. **Function declarations are hoisted completely**
3. **Variable declarations are hoisted but not initialized**
4. **let/const have Temporal Dead Zone (TDZ)**
5. **var initializes to undefined, let/const are uninitialized**
6. **Function declarations take priority over variable declarations**
7. **Block scope (let/const) vs function scope (var)**
8. **TDZ prevents access before declaration for let/const**

## Common Patterns

### Avoiding Hoisting Issues

```javascript
// Use strict mode to catch more errors
"use strict";

// Declare all variables at the top
let name, age, city;

// Initialize variables
name = "John";
age = 30;
city = "New York";

// Use variables
console.log(name, age, city);
```

### Function Hoisting for Utilities

```javascript
// Function declarations can be used anywhere in scope
function formatName(first, last) {
  return `${first} ${last}`;
}

// Use immediately
const fullName = formatName("John", "Doe");
```

### Module Pattern with Hoisting

```javascript
// Function declarations are hoisted, so this works
const result = calculate(5, 3);

function calculate(a, b) {
  return a + b;
}
```

Understanding hoisting helps you write more predictable JavaScript code and avoid common pitfalls related to variable and function declarations.
