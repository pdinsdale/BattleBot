const fs = require("fs");

module.exports = { name: 'prefix', async run(client, message, args) {

    // No mod? GOOD! DON'T MESS WITH THIS UNLESS ABSOLUTELY NECESSARY!
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");
   
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