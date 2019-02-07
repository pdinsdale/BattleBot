const Discord = require("discord.js");

module.exports = { name: 'help', description: 'Gives information on the bot\'s commands!', aliases: ['h'], usage: '[command name / category]', async run(client, message, args) {

    // Setting up stuff for dynamic help
    const data = [];
    const commands = client.commands;
    const specify = args[0];
    const command = commands.get(specify) || commands.find(c => c.aliases && c.aliases.includes(specify));

    // Setting up embed constants
    const helpEmbed = new Discord.RichEmbed()
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp()
    .setAuthor(message.member.user.tag, message.author.avatarURL)
    .setColor("#4199c2")
    .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
    
    if (!specify) {
        // Normal help
        helpEmbed.setTitle("BattleBot Help")
        .setDescription("Your guide to all of BattleBot's commands! Be sure to ping or DM Phoenix#0408 with any questions, comments, or feedback!")
        .addField('Categories:', `Use \`${client.config.prefix}help [category]\` to see all the commands for that category!`)
        .addField('Battles', 'Commands related to Faction Battles')
        .addField('Fun', 'Just for fun')
        .addField('Info', 'Information commands')
        .addField('Roles', 'Commands for distributing roles')
        .addField('Moderation', 'Moderation commands')
        .addField('Misc.', 'Commands that don\'t really fit anywhere else');
        message.channel.send(helpEmbed);

    } else switch (specify) {
        case 'battles': case 'battle':
            helpEmbed.setTitle('Battlebot Help: Battles')
            .setDescription(`All the Faction Battle commands! Use \`${client.config.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.config.prefix}marigolds`, `Adds the faction role for ${client.faction1}`)
            .addField(`${client.config.prefix}lilies`, `Adds the faction role for ${client.faction2}`)
            .addField(`${client.config.prefix}results [year] [month]`, 'Displays the results of the specified Faction Battle')
            .addField(`${client.config.prefix}factions`, '(Mod only command) Displays the current amount of users in each faction as well as how many 1-Ups each faction has')
            .addField(`${client.config.prefix}1ups [faction] [operation] [number]`, '(Mod only command) Controls the 1-Up database. Operations include: \`add\`, \`subtract\`')
            .addField(`${client.config.prefix}clear [database]`, '(Mod only command) Clears the specified database. Databases include: \`1-Ups\`');
            message.channel.send(helpEmbed);
            break;
        case 'fun':
            helpEmbed.setTitle('Battlebot Help: Fun')
            .setDescription(`All the Fun/Random commands! Use \`${client.config.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.config.prefix}8ball [Question]`, 'Provides randomly generated responses to an asked question')
            .addField(`${client.config.prefix}ascii [Text]`, 'Uses the provided text to make ASCII art. For best results, use with smaller words and phrases.')
            .addField(`${client.config.prefix}slots`, 'Plays a quick game of slots');
            message.channel.send(helpEmbed);
            break;
        case 'info': case 'information':
            helpEmbed.setTitle('Battlebot Help: Info')
            .setDescription('All the Information commands')
            .addField(`${client.config.prefix}botinfo`, 'Gives information on the bot')
            .addField(`${client.config.prefix}serverinfo`, 'Gives information on the server')
            .addField(`${client.config.prefix}userinfo [@User]`, 'Gives information on the mentioned user. If no one is mentioned, falls back to the author')
            .addField(`${client.config.prefix}changelog`, `Gives information on the latest update to BattleBot: ${client.version}`);
            message.channel.send(helpEmbed);
            break;
        case 'moderation': case 'mod':

        if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
        return message.reply("You don't have permissions to use this!");

            helpEmbed.setTitle('Battlebot Help: Moderation')
            .setDescription('All the Moderation commands')
            .addField(`${client.config.prefix}kick [@User] [reason]`, 'Kicks the mentioned user. Can be used with or without a stated reason')
            .addField(`${client.config.prefix}ban [@User] [reason]`, 'Bans the mentioned user. Can be used with or without a stated reason')
            .addField(`${client.config.prefix}mute [@User]`, 'Gives the mentioned user the Brick Block role')
            .addField(`${client.config.prefix}purge [Number 2-100] [@User]`, 'Purges the stated number of messages in a channel or from a mentioned user')
            .addField(`${client.config.prefix}blacklist [Word/Phrase/Link]`, 'Blacklists the given word/phrase/link. Any member who uses a blacklisted item will be automatically kicked');
            message.channel.send(helpEmbed);
            break;
        case 'misc': case 'misc.': case 'miscellaneous':
            helpEmbed.setTitle('Battlebot Help: Miscellaneous')
            .setDescription('All the commands that don\'t fit in any other category')
            .addField(`${client.config.prefix}ping`, 'Pings the bot and displays it in Latency and API Latency format')
            .addField(`${client.config.prefix}prefix [New prefix]`, '(Mod only command) Changes the bot\'s prefix')
            .addField(`${client.config.prefix}setnickname [New nickname]`, '(Mod only command) Changes the nickname for BattleBot')
            .addField(`${client.config.prefix}setavatar [Image]`, '(Mod only command) (Post image as attachment in same message) Sets the avatar for BattleBot')
            .addField(`${client.config.prefix}ranks`, '(Mod only command) Shows a list of selected roles and their member counts')
            .addField(`${client.config.prefix}poll [Question]`, '(Mod only command) Creates a 2-reaction poll for the provided Yes-or-No question');
            message.channel.send(helpEmbed);
            break;
        case 'role': case 'roles':
            helpEmbed.setTitle('Battlebot Help: Roles')
            .setDescription('All the commands for distributing roles!')
            .addField(`${client.config.prefix}marigolds`, `Adds the faction role for ${client.faction1}`)
            .addField(`${client.config.prefix}lilies`, `Adds the faction role for ${client.faction2}`)
            .addField(`${client.config.prefix}smashbros`, 'Adds the Frequent Fighter role which can be pinged if you\'re looking for an SSBU game');
            message.channel.send(helpEmbed);
            break;
        default:
            // If above doesn't match args, display this
            if (!command) return message.reply('Please specify a proper command or category!');

            // Pushing the name of the command to the data array to be displayed later
            data.push(`**Name:** \`${command.name}\``);

            // If the command has aliases, a description, or a usage, push that to the data array
            if (command.aliases) data.push(`**Aliases:** \`${command.aliases.join(', ')}\``);
            if (command.description) data.push(`**Description:** \`${command.description}\``);
            if (command.usage) data.push(`**Usage:** \`${client.config.prefix}${command.name} ${command.usage}\``);
            
            message.channel.send(data, {split: true});
            break;
    }
}};