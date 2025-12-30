1. What is JWT?

JWT (JSON Web Token) is a stateless authentication token used to securely transmit information between client and server.
It has three parts: Header (algorithm), Payload (claims), and Signature (verification).

2. How does JWT authentication work?

User logs in and receives a signed JWT from the server.
Client sends this token in the Authorization header for protected API requests.

3. Advantages and disadvantages of JWT over sessions

JWT is stateless, scalable, and suitable for distributed systems.
However, tokens cannot be easily revoked and are risky if compromised.

4. Where should JWT be stored on the client?

JWT can be stored in HttpOnly cookies (most secure), localStorage, or memory.
Best practice is access token in memory and refresh token in HttpOnly cookies.

5. Difference between access token and refresh token

Access token is short-lived and used to access APIs.
Refresh token is long-lived and used to generate new access tokens.

6. How do you handle JWT expiration?

Access tokens expire quickly for security.
Refresh tokens are used to obtain a new access token without re-login.

7. What is RBAC?

Role-Based Access Control restricts system access based on user roles.
Different roles have different permissions in the application.

8. How do you implement authorization in an API?

Verify JWT to authenticate the user.
Check user role or permissions before allowing access to routes.