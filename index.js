const express = require('express');
const { addJob } = require('./queue/jobQueue');
const { users } = require('./storage');
const startWorker = require('./queue/worker');

const app = express();
app.use(express.json());

app.post('/add-user', (req, res) => {
  addJob({ type: 'fetch-random-user' });
  res.status(200).json({ message: 'Job added to queue' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  startWorker();
});
