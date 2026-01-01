

1. What is CORS? Why does it exist?

   CORS is a browser security feature that controls requests between different origins. It exists to prevent unauthorized access to user data from other websites.

2. What is the Same-Origin Policy?

   It is a security rule that allows web pages to access resources only from the same protocol, domain, and port.

3. What are preflight requests? When do they occur?

   Preflight requests are OPTIONS requests sent by the browser to check server permissions. They occur for non-simple methods, custom headers, or JSON requests.

4. How do you configure CORS in Express?

   CORS is configured using the cors middleware to allow specific origins, methods, and headers.

5. What is CSRF? How do you prevent it?

   CSRF is an attack where a user is tricked into performing actions without consent. It is prevented using CSRF tokens and SameSite cookies.

6. What is XSS? How do you prevent it?

   XSS is an attack where malicious scripts are injected into web pages. It is prevented by escaping input and using Content Security Policy.

7. What is SQL Injection? How do you prevent it?

   SQL Injection allows attackers to run malicious SQL queries. It is prevented using parameterized queries and input validation.

8. What are rate limiting and throttling? Why are they important?

   Rate limiting restricts request counts and throttling slows excessive requests. They prevent API abuse and server overload.

9. What is the principle of least privilege?

   It means giving users or systems only the minimum permissions needed to perform their tasks.


