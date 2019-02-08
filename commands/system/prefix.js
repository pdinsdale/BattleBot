const fs = require("fs");

module.exports = { name: 'prefix', description: 'Changes the bot\'s prefix', usage: '[New prefix]', args: '[New prefix] => Can be a single character or multiple characters', modonly: true, async run(client, message, args) {
   
    // Gets new prefix from message
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    config.prefix = newPrefix;

    // If no prefix provided, display this
    if(!args[0]) {
        return message.reply("Please input a proper prefix!")
    }
        else{
            // Write to config.json and display message
            message.channel.send(`Prefix successfully changed, ${message.author}!`).catch(console.error);
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        }
}};