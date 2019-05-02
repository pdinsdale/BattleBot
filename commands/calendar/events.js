module.exports = {
  name: 'events',
  category: 'calendar',
  description: 'Lists the calendar events',
  aliases: ['event'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const eventsArray = [];
    const params = {};
    return client.cal.Events.list(client.calConfig.calendarId.primary, params, {})
      .then((json) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < json.length; i++) {
          const event = {
            id: json[i].id,
            start: json[i].start,
            end: json[i].end,
          };
          eventsArray.push(event);
        }
        return message.channel.send(`List of all events on calendar ${eventsArray}`);
      }).catch((err) => {
        console.log('Error: listAllEventsInCalendar', err.message);
      });
  },
};
