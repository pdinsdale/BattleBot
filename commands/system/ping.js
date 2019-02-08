module.exports = { name: 'ping', description: 'Pings the bot and displays it in Latency and API Latency format', aliases: ['p'], usage: ' ', modonly: false, async run(client, message, args) {
    
    // Pings client... noting else I can say here
    const m = await message.channel.send("Pinging the Client...");
    m.edit(`Pong! Latency: **${m.createdTimestamp - message.createdTimestamp}ms** \nAPI Latency: **${Math.round(client.ping)}ms**`);
}};