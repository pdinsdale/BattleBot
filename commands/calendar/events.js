module.exports = {
  name: 'events',
  category: 'calendar',
  description: 'Lists the calendar events',
  aliases: ['event'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const params = {};
    client.cal.Events.list(client.calConfig.calendarId.primary, params)
      .then((json) => {
        message.channel.send(json);
      }).catch(err => {
        message.channel.send(err.message);
      });
  },
};
