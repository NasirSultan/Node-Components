
# JWT

## Overview

This project is a minimal example of how to implement JWT-based authentication using Access Tokens and Refresh Tokens in a Node.js + Express backend.

It demonstrates:

* User login
* Issuing and verifying JWT access tokens
* Securely refreshing expired access tokens using a refresh token
* Protecting API routes with token validation
* Handling token expiration gracefully

---

## Features

* Login: Authenticates a user and returns both access and refresh tokens.
* Token Refresh: Allows users to request a new access token using a valid refresh token.
* Protected Routes: Requires a valid access token to access user-specific resources.
* Access Control: Automatically blocks access to protected endpoints if the access token is expired or invalid.
* Fresh Token Check: Distinguishes between freshly logged-in users and those using refreshed tokens (optional feature).

---

## API Endpoints

| Method | Route        | Description                                 | Requires Token |
| ------ | ------------ | ------------------------------------------- | -------------- |
| POST   | `/login`     | Authenticates user and returns tokens       | No             |
| POST   | `/refresh`   | Issues new access token using refresh token | Yes (Refresh)  |
| GET    | `/protected` | Tests access token validity and freshness   | Yes (Access)   |
| GET    | `/user`      | Returns user profile data                   | Yes (Access)   |

---

## Token Details

* **Access Token**:

  * Short-lived (e.g. 1 minutes)
  * Sent in every request to protected APIs
  * Contains user identity and a `fresh` flag

* **Refresh Token**:

  * Long-lived (e.g. 7 days)
  * Used only to generate a new access token
  * Sent only to the `/refresh` endpoint

---

## Usage

1. Start the server
2. Call `/login` to receive both tokens
3. Use the access token to call protected APIs
4. When access token expires, call `/refresh` with the refresh token to get a new one
5. Continue using the new access token

---

## Requirements

* Node.js (v16 or higher)
* dotenv
* express
* jsonwebtoken

---

## Security Note

* Never expose refresh tokens in localStorage or frontend JavaScript.
* Store refresh tokens in HttpOnly secure cookies in production.
* Always validate and expire refresh tokens on the server side.

