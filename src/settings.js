const keyFile = require('./up-world-calendar.json');

const key = keyFile.private_key;
const serviceAcctEmail = keyFile.client_email;
const timezone = 'UTC-05';
const calendarID = '1upworldserver@gmail.com';
const calendarURL = 'https://calendar.google.com/calendar/embed?src=1upworldserver%40gmail.com&ctz=America%2FNew_York';

module.exports.keyFile = keyFile;
module.exports.key = key;
module.exports.serviceAcctEmail = serviceAcctEmail;
module.exports.timezone = timezone;
module.exports.calendarID = calendarID;
module.exports.calendarURL = calendarURL;
