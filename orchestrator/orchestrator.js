const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();

// An example endpoint that triggers the Python worker
app.get('/run-python', (req, res) => {
  exec('python3 python_worker/worker.py', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Orchestrator listening on port ${port}`);
});
