module.exports = {
    name: "help",
    description: "Gives information on the bot's commands!",
    aliases: ["h"],
    usage: "[command name / category]",
    args: "[command name / category] => Any of the command names or categories listed in the help command",
    async run(client, message, args, Discord) {

    // Setting up stuff for dynamic help
    const data = [];
    const commands = client.commands;
    const specify = args[0];
    const command = commands.get(specify) || commands.find((c) => c.aliases && c.aliases.includes(specify));

    // Setting up embed constants
    const helpEmbed = new Discord.RichEmbed()
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp()
    .setAuthor(message.member.user.tag, message.author.avatarURL)
    .setColor("#4199c2")
    .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL);

    function commandStuff(cmdname) {
        helpEmbed.addField(`${client.guildConfig.prefix}${(cmdname)} ${commands.get((cmdname)).usage}`, `${commands.get((cmdname)).description}`);
    }
    
    if (!specify) {
        // Normal help
        helpEmbed.setTitle("BattleBot Help")
        .setDescription("Your guide to all of BattleBot's commands! Be sure to ping or DM Phoenix#0408 with any questions, comments, or feedback!")
        .addField("Categories:", `Use \`${client.guildConfig.prefix}help [category]\` to see all the commands for that category!`)
        .addField("Battles", "Commands related to Faction Battles")
        .addField("Fun", "Just for fun")
        .addField("Info", "Information commands")
        .addField("Roles", "Commands for distributing roles")
        .addField("Moderation", "Moderation commands")
        .addField("System", "Commands for controlling the client")
        .addField("Misc.", "Commands that don't really fit anywhere else");
        message.channel.send(helpEmbed);

    } else { switch (specify) {
        case "battles": case "battle":
            helpEmbed.setTitle("Battlebot Help: Battles")
            .setDescription(`All the Faction Battle commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("results");
            commandStuff("factions");
            commandStuff("1ups");
            commandStuff("clear");
            message.channel.send(helpEmbed);
            break;
        case "fun":
            helpEmbed.setTitle("Battlebot Help: Fun")
            .setDescription(`All the Fun/Random commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("8ball");
            commandStuff("ascii");
            commandStuff("slots");
            message.channel.send(helpEmbed);
            break;
        case "info": case "information":
            helpEmbed.setTitle("Battlebot Help: Info")
            .setDescription(`All the Information commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("botinfo");
            commandStuff("serverinfo");
            commandStuff("userinfo");
            commandStuff("changelog");
            message.channel.send(helpEmbed);
            break;
        case "moderation": case "mod":
            helpEmbed.setTitle("Battlebot Help: Moderation")
            .setDescription(`All the Moderation commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("ban");
            commandStuff("kick");
            commandStuff("mute");
            commandStuff("purge");
            commandStuff("blacklist");
            message.channel.send(helpEmbed);
            break;
        case "misc": case "misc.": case "miscellaneous":
            helpEmbed.setTitle("Battlebot Help: Miscellaneous")
            .setDescription(`All the commands that don't fit in any other category! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("ranks");
            commandStuff("poll");
            message.channel.send(helpEmbed);
            break;
        case "role": case "roles":
            helpEmbed.setTitle("Battlebot Help: Roles")
            .setDescription(`All the commands for distributing roles! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("mario");
            commandStuff("luigi");
            commandStuff("yoshi");
            commandStuff("peach");
            commandStuff("bowser");
            commandStuff("wario");
            commandStuff("toad");
            helpEmbed.addBlankField();
            commandStuff("crown");
            commandStuff("smashbros");
            message.channel.send(helpEmbed);
            break;
        case "system":
            helpEmbed.setTitle("BattleBot Help: System")
            .setDescription(`All the commands for controlling exactly what goes on with BattleBot! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`);
            commandStuff("ping");
            commandStuff("setnickname");
            commandStuff("setavatar");
            commandStuff("set");
            message.channel.send(helpEmbed);
            break;
        default:
            // If above doesn't match args, display this
            if (!command) {
                return message.reply("Please specify a proper command or category!");
            }

            // Pushing the name of the command to the data array to be displayed later
            data.push(`**Command Name:** \n\`${command.name}\`\n`);

            // If the command has aliases, a description, or a usage, push that to the data array
            if (command.aliases) {
                data.push(`**Aliases:** \n\`${command.aliases.join(", ")}\`\n`);
            }
            if (command.description) {
                data.push(`**Description:** \n\`${command.description}\`\n`);
            }
            if (command.usage) {
                data.push(`**Usage:** \n\`${client.guildConfig.prefix}${command.name} ${command.usage}\`\n`);
            }
            if (command.args) {
                data.push(`**Accepted Arguments:** \n\`${command.args}\`\n`);
            }
            if (command.modonly === true) {
                data.push("\n**Only Executable By Those With The Moderator Role!**");
            }
            if (command.enabled === false) {
                data.push("\n**This Command is Currently Disabled! Sorry for the Inconvenience!**");
            }
            
            message.channel.send(data, {split: true});
            break;
    }}
}};