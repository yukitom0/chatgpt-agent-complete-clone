/**
 * This module simulates read-only connectors for external services such as
 * Gmail and Google Calendar. In a real implementation these functions
 * would authenticate with the respective APIs and return live data. For
 * demonstration purposes they return static sample data structures.
 */

async function fetchGmail() {
  // Simulated list of emails with minimal metadata. In practice you would use
  // the Gmail API and return full message objects.
  return [
    {
      id: 'msg-001',
      from: 'example1@example.com',
      subject: 'Welcome to ChatGPT Agent clone',
      snippet: 'Thanks for trying out this demo. Let us know what you think!'
    },
    {
      id: 'msg-002',
      from: 'alerts@system.local',
      subject: 'Daily report ready',
      snippet: 'Your daily report has been generated and is available for download.'
    }
  ];
}

async function fetchCalendar() {
  // Simulated list of upcoming calendar events. Real implementation would
  // query the Calendar API and return actual events.
  return [
    {
      id: 'event-001',
      title: 'Team Stand-up',
      start: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
      location: 'Conference Room A'
    },
    {
      id: 'event-002',
      title: 'Project Kickoff',
      start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
      location: 'Zoom'
    }
  ];
}

module.exports = {
  fetchGmail,
  fetchCalendar
};
