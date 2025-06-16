// queue/jobQueue.js
const jobQueue = [];

function addJob(job) {
  jobQueue.push(job);
}

function getNextJob() {
  return jobQueue.shift(); // FIFO
}

function hasJobs() {
  return jobQueue.length > 0;
}

module.exports = {
  addJob,
  getNextJob,
  hasJobs,
};
