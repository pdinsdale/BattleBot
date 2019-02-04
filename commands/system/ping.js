module.exports = { name: 'ping', async run(client, message, args) {
    
    const m = await message.channel.send("Pinging the Client...");
    m.edit(`Pong! Latency: **${m.createdTimestamp - message.createdTimestamp}ms** \nAPI Latency: **${Math.round(client.ping)}ms**`);
}};