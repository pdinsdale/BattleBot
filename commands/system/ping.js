// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  // Finds the difference in milliseconds between when a message is sent and when a message is edited, effectively calculating ping from the user's side
  // Also includes the true api latency returned from the library
  const m = await message.channel.send('Pinging the Client...');
  m.edit(`Pong! Latency: **${m.createdTimestamp - message.createdTimestamp}ms** \nAPI Latency: **${Math.round(client.ws.ping)}ms**`);
};

module.exports.conf = {
  guildOnly: false,
  aliases: ['p'],
  permLevel: 'User',
};

module.exports.help = {
  name: 'ping',
  category: 'system',
  description: 'Pings the client',
  usage: 'ping',
};
