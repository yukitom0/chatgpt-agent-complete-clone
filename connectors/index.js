/**
 * Stub connectors for read-only access to third-party services.
 * In a real agent, these would integrate with external APIs such as Gmail or Google Calendar.
 */

async function fetchGmail() {
  // Simulate reading messages from Gmail
  console.log('Fetching Gmail data (read-only)...');
  return [];
}

async function fetchCalendar() {
  // Simulate reading events from Google Calendar
  console.log('Fetching calendar events (read-only)...');
  return [];
}

module.exports = { fetchGmail, fetchCalendar };
