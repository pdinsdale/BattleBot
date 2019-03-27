module.exports = {
  name: 'ping',
  category: 'system',
  description: 'Pings the bot and displays it in Latency and API Latency format',
  aliases: ['p'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Pings client... noting else I can say here
    const m = await message.channel.send('Pinging the Client...');
    m.edit(`Pong! Latency: **${m.createdTimestamp - message.createdTimestamp}ms** \nAPI Latency: **${Math.round(client.ping)}ms**`);
  },
};
