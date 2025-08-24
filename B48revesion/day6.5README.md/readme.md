

## Q1

console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

**Output:**

1
4
3
2

**Explanation:**

* console.log(1) → synchronous → prints `1`.
* setTimeout(..., 0) → callback is pushed to **macro-task queue** (executed later).
* Promise.resolve().then(...) → callback goes to **micro-task queue**, which runs before macro-tasks.
* console.log(4) → synchronous → prints `4`.
* Then micro-task (`3`) runs before macro-task (`2`).

---

## Q2

console.log(a);
var a = 10;
console.log(b);
let b = 20;


**Output:**

undefined
ReferenceError: Cannot access 'b' before initialization

**Explanation:**

* `var` is **hoisted** with an initial value of `undefined`. So first log prints `undefined`.
* `let` is also hoisted but stays in the **Temporal Dead Zone (TDZ)** until declaration is executed. Accessing `b` before initialization throws a `ReferenceError`.

---

## Q3
function foo() {
  console.log(this);
}
foo();
const obj = { foo };
obj.foo();

**Output:**
global object (in browser → Window / in Node → globalThis or undefined in strict mode)
{ foo: [Function: foo] }

**Explanation:**

* First call `foo()` → regular function call, `this` refers to **global object** (or `undefined` in strict mode).
* Second call `obj.foo()` → method call, `this` refers to `obj`.

## Q4

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}

**Output (after \~100ms):**

3
3
3
0
1
2


**Explanation:**

* `var` is **function-scoped** → all callbacks share same `i`. After loop, `i = 3`, so all log `3`.
* `let` is **block-scoped** → each iteration has its own `j`. So logs `0, 1, 2`.

## Q5

const obj = { a: 1 };
Object.freeze(obj);
obj.a = 100;
console.log(obj.a);

**Output:**

1

**Explanation:**
`Object.freeze()` makes the object immutable → properties cannot be changed. Assignment to `a` fails silently (or throws in strict mode).

## Q6

const obj1 = { name: "Alice" };
const obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name);

**Output:**

Bob

**Explanation:**
Objects are assigned by **reference**, not copy. Both `obj1` and `obj2` refer to the same memory location. Changing through `obj2` reflects in `obj1`.

## Q7

const obj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj };
shallowCopy.b.c = 42;
console.log(obj.b.c);

**Output:**

42


**Explanation:**
Spread (`...`) creates a **shallow copy**. The nested object `b` is still referenced. Mutating `shallowCopy.b.c` also changes `obj.b.c`.

## Q8

function foo(x, y, z) {
  console.log(x, y, z);
}
foo(...[1, 2]);
foo(...[1, 2, 3, 4]);


**Output:**

1 2 undefined
1 2 3

**Explanation:**

* First call → array has only 2 elements → `z` becomes `undefined`.
* Second call → extra arguments ignored → only first 3 values passed.

## Q9

function foo(a, b, c) {
  arguments[0] = 99;
  console.log(a, arguments[1]);
}
foo(1, 2, 3);

**Output:**

99 2

**Explanation:**
In non-strict mode, `arguments` object is linked with function parameters.

* `arguments[0] = 99` updates `a`.
* `arguments[1]` corresponds to `b = 2`.

## Q10

console.log(typeof null);
console.log(null instanceof Object);
console.log([] instanceof Array);
console.log([] instanceof Object);

**Output:**

object
false
true
true

**Explanation:**

* `typeof null` → legacy quirk in JavaScript → returns `"object"`.
* `null` is not an instance of `Object`.
* Arrays are special objects → `[] instanceof Array` is `true`.
* Arrays inherit from `Object` → `[] instanceof Object` is `true`.


