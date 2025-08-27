# chatgpt-agent-complete-clone

This repository is a skeleton implementation inspired by OpenAI's ChatGPT Agent mode. It demonstrates how an orchestrator can coordinate multiple specialized workers to perform tasks such as browser automation, code execution, terminal commands, read-only data retrieval from external services, task scheduling, and HTTP request signing.

## Features

- **Orchestrator (Express server)** – routes requests to different workers and exposes REST endpoints:
  - `GET /run-python` – runs the Python worker for data processing and returns the output.
  - `GET /run-browser` – executes the browser worker which uses Playwright to automate a headless browser.
  - `GET /run-terminal?cmd=...` – runs a command in the terminal worker; defaults to `ls -la` when no command is provided.
  - `GET /fetch-gmail` – fetches sample Gmail data via the connectors module.
  - `GET /fetch-calendar` – fetches sample calendar events via the connectors module.
  - `POST /schedule-python` – schedules the Python worker using a cron expression sent in the request body.
  - `GET /health` – returns a simple health status for the orchestrator.

- **Browser Worker** – uses Playwright to launch a Chromium instance, navigate to a web page, and perform interactions. Extend this worker to perform more complex automation tasks.

- **Python Worker** – a simple Python script that can be extended to perform data analysis, generate reports, or run arbitrary code safely in a sandbox.

- **Terminal Worker** – executes shell commands and returns the output, simulating limited terminal access within the agent.

- **Connectors** – provides read-only access to external services (e.g., Gmail and calendar). In this skeleton, connectors return sample data; in a real implementation they would integrate with APIs under strict scopes.

- **Scheduler** – demonstrates how to schedule recurring jobs using `node-schedule`. It logs a timestamped message every 5 minutes and can be triggered via the orchestrator endpoint.

- **HTTP Signing** – includes a simple signer implementation using the `crypto` module to sign outgoing HTTP requests, following the concept of HTTP message signatures.

## Directory Structure

- `orchestrator/` – Express server that orchestrates tasks and exposes HTTP endpoints.
- `browser_worker/` – Node script for headless browser automation via Playwright.
- `python_worker/` – Python script and associated requirements for the Python worker.
- `terminal_worker/` – Node script that runs shell commands.
- `scheduler/` – Demonstrates scheduling recurring tasks using `node-schedule`.
- `connectors/` – Placeholder module to fetch external data (Gmail and calendar) in a read-only manner.
- `http_signing/` – Contains a signer for signing HTTP requests.
- `.gitignore` – Specifies files and directories to ignore in version control.
- `package.json` – Defines project metadata, dependencies, and scripts to run different workers.
- `agent_clone.zip` – Original archive of the provided skeleton for reference.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the orchestrator server:

   ```bash
   npm start
   ```

3. Invoke the various endpoints using `curl` or a browser (assuming default port 3000):

   ```bash
   curl http://localhost:3000/run-python
   curl http://localhost:3000/run-browser
   curl http://localhost:3000/run-terminal?cmd=echo%20hello
   curl http://localhost:3000/fetch-gmail
   curl http://localhost:3000/fetch-calendar
   curl -X POST -H "Content-Type: application/json" -d '{"cron":"*/5 * * * *"}' http://localhost:3000/schedule-python
   ```

This project is for educational and demonstration purposes. It does not implement all security, error handling, or production considerations that a full ChatGPT Agent mode would require.
