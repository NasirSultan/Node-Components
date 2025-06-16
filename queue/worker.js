const axios = require('axios');
const { users } = require('../storage');
const { getNextJob, hasJobs } = require('./jobQueue');

function startWorker() {
  setInterval(async () => {
    if (!hasJobs()) return;

    getNextJob();

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
      // handle error silently
    }
  }, 20000);
}

module.exports = startWorker;
