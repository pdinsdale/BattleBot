const keyFile = require('./up-world-calendar.json');

const key = keyFile.private_key;
const serviceAcctId = keyFile.client_email;
const timezone = 'UTC-05';
const calendarId = {
  primary: '1upworldserver@gmail.com',
};
const calendarUrl = 'https://calendar.google.com/calendar/embed?src=1upworldserver%40gmail.com&ctz=America%2FNew_York';

module.exports.key = key;
module.exports.serviceAcctId = serviceAcctId;
module.exports.timezone = timezone;
module.exports.calendarId = calendarId;
module.exports.calendarUrl = calendarUrl;
