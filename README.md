
# Node.js In-Memory Queue and Worker System

This project demonstrates how to implement a simple job queue and worker system using only Node.js and Express. It uses an in-memory array instead of Redis to store both jobs and fetched user data.

---

## Folder Structure

```

queue-system/
├── index.js             # Express server and API routes
├── storage.js           # In-memory user storage array
├── queue/
│   ├── jobQueue.js      # Job queue logic using array
│   └── worker.js        # Worker that processes jobs
├── package.json

````

---

##  Module Descriptions

### 1. `index.js`
- Sets up the Express server
- Defines the REST API endpoints:
  - `POST /add-user` to add a job to the queue
  - `GET /users` to retrieve all users
- Starts the background worker

### 2. `storage.js`
- Exports a single array `users` to store user objects fetched by the worker.

### 3. `queue/jobQueue.js`
- Contains the job queue using a simple array
- Functions:
  - `addJob(job)` — add a job
  - `getNextJob()` — get and remove the next job
  - `hasJobs()` — check if any job exists

### 4. `queue/worker.js`
- Runs every 5 seconds
- Checks for queued jobs
- Fetches a random user using `https://randomuser.me/api/`
- Stores the result in the `users` array

---

##  Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd queue-system
````



### 3. Start the server

```bash
node index.js
```

The server will run on: `http://localhost:3000`

---

##  API Endpoints

### 1. `POST /add-user`

Adds a job to the queue. The job will be processed by the worker.

* **URL:** `http://localhost:3000/add-user`
* **Method:** `POST`
* **Request Body:** none
* **Response:**

```json
{
  "message": "Job added to queue"
}
```

---

### 2. `GET /users`

Returns the list of users fetched and stored by the worker.

* **URL:** `http://localhost:3000/users`
* **Method:** `GET`
* **Response:**

```json
[
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "addedAt": "2025-06-16T09:55:00.000Z"
  }
]
```

---

##  How It Works

1. You send a `POST /add-user` request.
2. A job is added to the queue (`jobQueue` array).
3. A worker is already running in the background (`worker.js`).
4. Every 5 seconds, the worker checks the queue:

   * If a job exists, it fetches a random user via API
   * Then it stores the result in the `users` array from `storage.js`
5. You can retrieve all users via `GET /users`.

---

##  Testing with Postman

### Step 1: Add a job

**POST** `http://localhost:3000/add-user`
(No body required)

### Step 2: Wait 5–10 seconds

### Step 3: Fetch users

**GET** `http://localhost:3000/users`

---

##  Limitations

* Data is stored in-memory only (resets on server restart)
* No job persistence, retry, or priority system
* Not suitable for production environments


