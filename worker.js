// worker.js
const axios = require('axios');
const { users } = require('./storage');

let isRunning = false;

function startWorker() {
  if (isRunning) return;
  isRunning = true;

  setInterval(async () => {
    try {
      const res = await axios.get('https://randomuser.me/api/');
      const user = res.data.results[0];

      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        addedAt: new Date().toISOString(),
      };

      users.push(newUser);
    } catch (err) {
    }
  }, 10 * 1000);
}

module.exports = { startWorker };
