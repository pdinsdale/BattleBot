const fs = require("fs");

module.exports = { name: 'prefix', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");
   
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    config.prefix = newPrefix;

if(!args[0]) {
    return message.reply("Please input a proper prefix!")
   }
    else{
        message.channel.send(`Prefix successfully changed, ${message.author}!`).catch(console.error);
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    }
}};