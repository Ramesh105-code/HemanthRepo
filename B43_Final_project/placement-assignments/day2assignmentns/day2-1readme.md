Here’s a **complete answer** with theory **and** a working **Express middleware code** for Basic Authentication + cookie-based session handling.

---

 **1. What is HTTPS? How does it differ from HTTP?**

**HTTPS (Hypertext Transfer Protocol Secure)** is HTTP layered over **TLS/SSL encryption**, providing secure communication between a client and server. It encrypts all traffic — headers, query strings, and data — preventing eavesdropping and tampering. HTTPS typically uses port **443**, while plain **HTTP uses port 80** and sends data in clear text, vulnerable to interception. 

---

**2. Explain SSL/TLS. What is the SSL handshake process?**

**SSL/TLS** are cryptographic protocols used to secure communications over networks. TLS has replaced SSL but the term “SSL” is still commonly used. TLS authenticates both parties and encrypts data. 

**TLS (SSL) handshake high-level steps:**

1. **ClientHello:** Client sends supported TLS versions and cipher suites.
2. **ServerHello:** Server chooses protocol & cipher, sends its **certificate**.
3. **Certificate verification:** Client verifies server certificate with a trusted Certificate Authority.
4. **Key exchange:** Client generates a **session key**, encrypts it with server’s public key.
5. **Secure session begins:** Both sides use the shared symmetric key to encrypt traffic.
6. Communication is now encrypted with the symmetric session key. 

---

**3. What is encryption? Symmetric vs Asymmetric encryption**

**Encryption** transforms readable data into unreadable coded text to protect it.

**Symmetric encryption:**

* **One shared secret key** for encryption & decryption.
* Fast and efficient for bulk data.
* Example: AES.
* Used for actual message encryption after a handshake.

**Asymmetric encryption:**

* Uses **two keys** — public (encrypt) and private (decrypt).
* Slower but supports secure key exchange.
* Commonly used during TLS handshake to share session keys. 

---

 **4. What are certificates? What is a Certificate Authority (CA)?**

**Certificates** (often X.509) bind a public key to an identity (domain). They prove the server is who it claims to be.
A **Certificate Authority (CA)** is a trusted third party that **issues and signs certificates** so browsers trust them. Examples include Let’s Encrypt, DigiCert,etc.

---

 **5. Difference between authentication and authorization**

* **Authentication:** Verifies *who you are* (e.g., login with username/password).
* **Authorization:** Determines *what you’re allowed to do* (permissions/roles).

  Authentication comes *before* authorization in a secure system.

---

**6. Explain session-based authentication. How do sessions work?**

**Session‐based auth** stores user state on the server (session ID, user info). When a user logs in:

1. Server creates a **session record** (in memory/db) with a unique ID.
2. Sends the **session ID cookie** to the client.
3. Client includes this cookie on future requests.
4. Server looks up the session ID to verify the user.
5. Server can invalidate the session at any time. 

This approach is **stateful** because the server must remember the session. 

---

 **7. What are cookies? Security attributes (HttpOnly, Secure, SameSite)?**

A **cookie** is a small piece of data stored by a browser to maintain state between requests. 

**Security attributes:**

* **HttpOnly:** Not accessible via JavaScript (`document.cookie`), which helps prevent XSS attacks. 
* **Secure:** Sent *only* over HTTPS, preventing exposure over insecure connections. 
* **SameSite:** Controls cross-site cookie sending to mitigate CSRF:

  * `Strict`: only same-site navigation.
  * `Lax`: allows top-level GET navigations.
  * `None`: allow all (must be Secure). 

---

**8. What is token-based authentication? How does it differ from session-based auth?**

**Token-based auth** issues a signed token (e.g., JWT) upon login. Client stores the token (often in cookies or localStorage) and sends it with each request. Server verifies the token signature but stores *no session state*. 

**Key difference:**

* **Session-based:** Server stores state in server memory/db.
* **Token-based:** Stateless; server only verifies token signature. 

---

**Machine Coding: Express Basic Authentication with Cookies**

Below is a **minimal Express server** with **Basic Authentication**, **login endpoint**, and a **protected route** using cookies for session tracking.

---

 