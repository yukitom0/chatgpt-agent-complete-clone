const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const schedule = require('node-schedule');
const { fetchGmail, fetchCalendar } = require('../connectors');
const remoteComputer = require('../remote_computer');

const app = express();
app.use(express.json());

// Run Python worker
app.get('/run-python', (req, res) => {
  exec('python3 python_worker/worker.py', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

// Run browser worker
app.get('/run-browser', (req, res) => {
  exec('node browser_worker/browser_worker.js', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

// Run terminal worker with optional cmd query parameter
app.get('/run-terminal', (req, res) => {
  const cmd = req.query.cmd;
  const command = cmd ? `node terminal_worker/worker.js ${cmd}` : 'node terminal_worker/worker.js';
  exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

// Fetch Gmail sample data
app.get('/fetch-gmail', async (req, res) => {
  try {
    const emails = await fetchGmail();
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Gmail data' });
  }
});

// Fetch Calendar sample data
app.get('/fetch-calendar', async (req, res) => {
  try {
    const events = await fetchCalendar();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
})
  // Remote GUI operation endpoints
// Open LibreOffice on the remote VM and optionally load a document.
app.post('/remote-open-libreoffice', async (req, res) => {
  const { documentPath } = req.body || {};
  try {
    await remoteComputer.openLibreOffice(documentPath);
    res.json({ message: 'Launched LibreOffice Writer remotely' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Open a browser on the remote VM at the specified URL.
app.post('/remote-open-browser', async (req, res) => {
  const { url } = req.body || {};
  try {
    await remoteComputer.openBrowser(url);
    res.json({ message: 'Launched browser remotely' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


// Schedule Python worker using a cron expression in request body
appp.post('/schedule-python', (req, res) => {
  
  if (!cron) {
    return res.status(400).json({ error: 'cron expression required' });
  }
  try {
    
      exec('python3 python_worker/worker.py', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
        if (error) {
          console.error('Scheduled Python worker error:', error);
        } else {
          console.log('Scheduled Python worker output:', stdout);
        }
      });
    });
    res.json({ message: 'Python worker scheduled', nextInvocation: job.nextInvocation() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to schedule Python worker' });
  }
});

// Health endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Orchestrator listening on port ${port}`);
});
