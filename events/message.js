const Discord = require("discord.js");
const eco = require("discord-economy");
const cooldowns = new Discord.Collection();

module.exports = (client, message) => {

    // Send a messsage to the user's DM if the client detects a message from there
    if (message.channel.type === "dm") {
        return message.author.send("I do **NOT** respond to commands in DMs! Please go to <#355186664869724161> in 1-Up World to use my commands!").catch(console.error);
    }

    // Ignore all bots
    if (message.author.bot) {
        return;
    }

    // Blacklist so no stupid spam bot can wreak havoc on 1-Up World
    let found = false;
    for (let i in client.blacklisted) {
        if (message.content.toLowerCase().includes(client.blacklisted[i].toLowerCase())) {
            found = true;
    }}

    if (found) {
        message.delete();
        message.member.kick("Spam Bot / Raider");
    }

    // When bot is mentioned, display this message
    if (message.isMentioned(client.user)) {
        if (message.channel.parentID === "356505464944459778" || message.channel.parentID === "415992061955932160" || message.channel.parentID === "356505383700922370") {
            return;
        } else {
            message.channel.send(`Hey ${message.author}! I'm ${client.user}, a bot made by <@${client.config.ownerID}> for the 1-Up World Discord server! I mainly handle Faction Battle stuff along with distributing roles but I've got other fun commands! Use \`.help\` to see a full list! Remember to ping or DM Phoenix with any questions, comments, or feedback!`);
        }}

    function roles(roleName) {
        message.guild.roles.find((r) => r.name === (roleName));
        }
        client.roles = roles;
     
    function remove(role) {
        if (message.member.roles.has((role).id)) {
            message.member.removeRole((role)).catch((err) => console.log(err));
        }
    }
    client.remove = remove;
     
    const guildConfig = client.settings.ensure(message.guild.id, client.defaultSettings);
    client.guildConfig = guildConfig;

    // Ignore messages not starting with the prefix
    if (message.content.indexOf(client.guildConfig.prefix) !== 0) {
        return;
    }

    // Our standard argument/command name definition.
    const args = message.content.slice(client.guildConfig.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data and aliases from the client.commands Enmap
    const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) {
        return;
    }

    // If user doesn't have proper permissions, do this stuff
    if (cmd.modonly && !message.member.roles.some((r) => [client.guildConfig.modrole].includes(r.name)) ) {
        if (message.author.id !== message.guild.owner.id) {
        return message.reply("You need to have the Moderator role to use this!");
    }}
    if (cmd.owneronly && message.author.id !== client.config.ownerID) {
        return; 
    }
    if (cmd.no1uw && message.guild.id === "355119082808541184") {
        return;
    }
    if (cmd.enabled === false) {
        return message.reply("This command is currently disabled!");
    }
    
    if (!cooldowns.has(cmd.name)) {
        cooldowns.set(cmd.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(cmd.name);
    const cooldownAmount = (cmd.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait **${timeLeft.toFixed(1)} more second(s)** before reusing the \`${cmd.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Run the command
    cmd.run(client, message, args, Discord, eco);
};