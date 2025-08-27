const schedule = require('node-schedule');

// Schedule a job to run every 5 minutes
schedule.scheduleJob('*/5 * * * *', () => {
  console.log('Scheduled task executed at ' + new Date().toISOString());
});
