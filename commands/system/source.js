module.exports = {
    name: "source",
    description: "Gets the specified message and displays it's code blocks form",
    aliases: ["sc"],
    usage: "[channel] [message id]",
    args: "[channel] => (Optional) The channel that the message is from. If no channel is mentioned, falls back to the channel the command originated from \n[message id] => The id of any message",
    async run(client, message, args, Discord) {

    let channel = message.mentions.channels.first() || message.channel;
    let messageID = args[1];

    if (!args[0]) {
        return message.reply(`Proper Usage: \`${client.guildConfig.prefix}source [channel] [message id]\``);
    }
    if (!args[1]) {
        messageID = args[0];
    }

    channel.fetchMessage(messageID)
        .then((msg) => message.channel.send(`Content for Message ID: \`${messageID}\`\nIn Channel: ${channel}\n\`\`\`${msg.content}\`\`\``))
            .catch((err) => { message.reply("You must mention a **valid message id**! If the message you want is **not from this channel**, you must **mention a channel as well**! You must also make sure I can **view the channel**!"); 
            console.log(err);
        });
}};