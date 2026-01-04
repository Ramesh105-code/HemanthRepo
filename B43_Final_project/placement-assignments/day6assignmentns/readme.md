1. What are core modules in Node.js? Name at least 10.

Core modules are built-in Node.js modules that come with Node and don’t need installation.

Examples (10+):
fs, path, http, https, os, events, stream, crypto, url, util, cluster, child_process

2. Explain the fs module. Difference between fs and fs/promises?

fs provides callback-based and sync file system operations.

fs/promises provides the promise-based API, used with async/await.

 fs/promises is cleaner and avoids callback nesting.

3. What is the path module used for?

The path module is used to work with file and directory paths in a platform-independent way (Windows/Linux).

Examples: path.join(), path.resolve(), path.extname()

4. Explain the EventEmitter class. How do you use it?

EventEmitter allows objects to emit and listen to custom events.

Usage:

const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("event", () => console.log("Triggered"));
emitter.emit("event");

5. Difference between on() and once()?

on() → Listener runs every time the event is emitted

once() → Listener runs only once, then auto-removed

6. How does error handling work with EventEmitters?

Errors are emitted using the "error" event

If no "error" listener exists, Node.js crashes

Always add:

emitter.on("error", err => console.error(err));

7. What is the cluster module? Why use it?

The cluster module allows Node.js to use multiple CPU cores by creating worker processes.

Used to:

Improve performance

Handle high traffic

8. What are child processes? When would you spawn one?

Child processes allow Node.js to run system commands or scripts.

Used when:

CPU-heavy tasks

Running shell commands

Parallel execution

9. Difference between spawn, exec, and fork?
Method	Use Case
spawn	Long-running processes, streams output
exec	Short commands, buffers output
fork	Spawns a Node.js script with IPC
