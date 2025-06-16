// index.js
const express = require('express');
const { users } = require('./storage');
const { startWorker } = require('./worker');

const app = express();
app.use(express.json());

const PORT = 3000;
let isJobStarted = false;

app.post('/start-job', (req, res) => {
  if (!isJobStarted) {
    startWorker();
    isJobStarted = true;
    res.send({ message: 'Job started: a new user will be added every 10 seconds.' });
  } else {
    res.send({ message: 'Job is already running.' });
  }
});

app.get('/users', (req, res) => {
  res.send({ total: users.length, users });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
