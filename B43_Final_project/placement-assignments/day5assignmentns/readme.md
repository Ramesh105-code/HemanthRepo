
### 1. What is Node.js? How does it differ from browser JavaScript?

Node.js is a **JavaScript runtime built on Chrome’s V8 engine** that allows JS to run on the server.
Unlike browser JS, Node.js can **access the file system, network, and OS APIs** and has no DOM.

---

### 2. What is the event loop in Node.js? Explain how it works.

The event loop is a mechanism that **handles asynchronous operations** in Node.js.
It continuously checks the **call stack**, processes **callback queues**, and executes tasks in different phases like timers, I/O, and microtasks.

---

### 3. What is non-blocking I/O? How does Node.js achieve it?

Non-blocking I/O allows operations to start and **continue without waiting** for completion.
Node.js achieves this using **callbacks, Promises, and the event loop** with async system APIs.

---

### 4. Explain the difference between synchronous and asynchronous code.

Synchronous code **blocks execution** until a task finishes.
Asynchronous code allows **other tasks to run** while waiting for operations like I/O or timers.

---

### 5. What are callbacks? What is callback hell?

Callbacks are functions passed as arguments to be executed later.
Callback hell occurs when **nested callbacks** make code hard to read, debug, and maintain.

---

### 6. What are Promises? How do they solve callback hell?

Promises represent the **future result** of an async operation.
They solve callback hell by enabling **chained `.then()` and `.catch()`** with better readability.

---

### 7. What is async/await? How does it work internally?

`async/await` is syntactic sugar over Promises for writing async code synchronously.
Internally, `await` **pauses execution until the Promise resolves or rejects**.

---

### 8. What is the difference between `process.nextTick()` and `setImmediate()`?

`process.nextTick()` executes **before the event loop continues** (microtask queue).
`setImmediate()` runs in the **check phase**, after I/O events.

---

### 9. What are streams in Node.js? Name the types of streams.

Streams are used to **handle large data efficiently** in chunks.
Types: **Readable, Writable, Duplex, Transform**.

---

### 10. What is the Buffer class in Node.js?

Buffer is used to handle **binary data** directly in memory.
It is mainly used when working with **files, streams, and network data**.

