1. What is Express.js? Why use it over plain Node.js?

Express.js is a minimal, unopinionated web framework built on top of Node.js that simplifies building HTTP servers and APIs.

Why Express over plain Node.js?

Plain Node.js (http module):

Low-level

Manual routing

Manual request parsing

Verbose error handling

Express provides:

Simple routing (app.get, app.post)

Middleware system

Request/response helpers

Easier error handling

Large ecosystem



2. What is middleware in Express? Explain the middleware chain.

Middleware is a function that has access to:

req (request)

res (response)

next (next middleware)

(req, res, next) => { ... }

Middleware Chain

Middleware executes in the order it’s registered

Each middleware:

Ends the request–response cycle OR

Calls next() to pass control

app.use(authMiddleware);
app.use(logMiddleware);
app.get('/users', handler);


➡️ If next() is not called, the chain stops.

3. Types of middleware in Express
1️⃣ Application-level middleware

Applied to the whole app

app.use(express.json());

2️⃣ Router-level middleware

Applied to specific routes

const router = express.Router();
router.use(authMiddleware);

3️⃣ Error-handling middleware

Has 4 arguments

(err, req, res, next) => {}


Used for centralized error handling.

4. How does error handling work in Express?
Synchronous errors

Automatically caught

throw new Error("Error");

Asynchronous errors

Must be passed to next()

try {
  await doSomething();
} catch (err) {
  next(err);
}

Error-handling middleware

Must be defined last

Signature with 4 parameters

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

5. Difference between app.use() and app.all()
Feature	app.use()	app.all()
HTTP Methods	All	All
Path matching	Prefix-based	Exact
Middleware?	Yes	Route handler
Calls next()?	Yes	Optional
app.use('/api', middleware); // runs for all /api/*
app.all('/login', handler);  // runs for all methods on /login

6. Routing in Express & route parameters

Routing maps HTTP methods + paths to handlers.

app.get('/users', handler);

Route parameters

Dynamic values in URLs

app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
});


URL:

/users/42 → req.params.id === "42"

7. Route handlers vs middleware
Middleware

Can modify request/response

Must call next() (or end request)

app.use(authMiddleware);

Route Handlers

Final function that sends response

app.get('/users', (req, res) => {
  res.json(users);
});


➡️ Route handlers terminate the request cycle.

8. How do you handle file uploads in Express?

Using multer

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded');
});

Features

Multipart form parsing

File size limits

Storage configuration (disk / memory)

9. What is morgan? Logging strategies?

Morgan is an HTTP request logger middleware.

app.use(morgan('dev'));

Logging strategies

Development: dev

Production: combined

Log to file using streams

Correlate logs with request IDs

Centralized logging (ELK, Datadog)

10. How would you structure a large Express application?
Recommended Structure
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── models/
 ├── middlewares/
 ├── utils/
 ├── config/
 ├── app.js
 └── server.js

