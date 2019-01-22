const Discord = require("discord.js");

module.exports = { name: 'command-name', async run(client, message, args) {


    let [category] = args; 
    
    if (!args[0]) {
        const embedHelp = new Discord.RichEmbed()
        .setTitle("BattleBot Help")
        .setAuthor(message.member.user.tag, message.author.avatarURL)
        .setColor("#4199c2")
        .setDescription("Your guide to all of BattleBot's commands! Be sure to ping or DM Phoenix#0408 with any questions, comments, or feedback!")
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL)
        .setTimestamp()
        .addField('Categories:', `Use \`${client.config.prefix}help [category]\` to see all the commands for that category!`)
        .addField('Factions', 'Commands related to Faction Battles')
        .addField('Fun', 'Just for fun')
        .addField('Info', 'Information commands')
        .addField('Roles', 'Commands for distributing roles')
        .addField('Moderation', 'Moderation commands')
        .addField('Misc.', 'Commands that don\'t really fit anywhere else');

        message.channel.send(embedHelp);
    } else switch (category.toLowerCase()) {
        case 'factions': case 'faction':
            const embedFactions = new Discord.RichEmbed()
            .setTitle('Battlebot Help: Factions')
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setColor('#4199c2')
            .setDescription('All the Faction Battle commands')
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
            .addField(`${client.config.prefix}results [year] [month]`, 'Displays the results of the specified Faction Battle')
            .addField(`${client.config.prefix}factions`, '(Mod only command) Displays the current amount of users in each faction as well as how many 1-Ups each faction has')
            .addField(`${client.config.prefix}1ups [faction] [operation] [number]`, '(Mod only command) Controls the 1-Up database. Operations include: \`add\`, \`subtract\`')
            .addField(`${client.config.prefix}clear [database]`, '(Mod only command) Clears the specified database. Databases include: \`1-Ups\`');

            message.channel.send(embedFactions);
            break;
        case 'fun':
            const embedFun = new Discord.RichEmbed()
            .setTitle('Battlebot Help: Fun')
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setColor('#4199c2')
            .setDescription('All the Fun/Random commands')
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
            .addField(`${client.config.prefix}8ball [Question]`, 'Provides randomly generated responses to an asked question')
            .addField(`${client.config.prefix}ascii [Text]`, 'Uses the provided text to make ASCII art. For best results, use with smaller words and phrases.')
            .addField(`${client.config.prefix}slots`, 'Plays a quick game of slots');

            message.channel.send(embedFun);
            break;
        case 'info':
            const embedInfo = new Discord.RichEmbed()
            .setTitle('Battlebot Help: Info')
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setColor('#4199c2')
            .setDescription('All the Information commands')
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
            .addField(`${client.config.prefix}botinfo`, 'Gives information on the bot')
            .addField(`${client.config.prefix}serverinfo`, 'Gives information on the server')
            .addField(`${client.config.prefix}userinfo [@User]`, 'Gives information on the mentioned user. If no one is mentioned, falls back to the author')
            .addField(`${client.config.prefix}changelog`, `Gives information on the latest update to BattleBot: ${client.version}`)

            message.channel.send(embedInfo);
            break;
        case 'moderation':

        if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
        return message.reply("You don't have permissions to use this!");

            const embedMod = new Discord.RichEmbed()
            .setTitle('Battlebot Help: Moderation')
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setColor('#4199c2')
            .setDescription('All the Moderation commands')
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
            .addField(`${client.config.prefix}kick [@User] [reason]`, 'Kicks the mentioned user. Can be used with or without a stated reason')
            .addField(`${client.config.prefix}ban [@User] [reason]`, 'Bans the mentioned user. Can be used with or without a stated reason')
            .addField(`${client.config.prefix}mute [@User]`, 'Gives the mentioned user the Brick Block role')
            .addField(`${client.config.prefix}purge [Number 2-100] [@User]`, 'Purges the stated number of messages in a channel or from a mentioned user')
            .addField(`${client.config.prefix}blacklist [Word/Phrase/Link]`, 'Blacklists the given word/phrase/link. Any member who uses a blacklisted item will be automatically kicked');
            
            message.channel.send(embedMod);
            break;
        case 'misc': case 'misc.': case 'miscellaneous':
            const embedMisc = new Discord.RichEmbed()
            .setTitle('Battlebot Help: Miscellaneous')
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setColor('#4199c2')
            .setDescription('All the commands that don\'t fit in any other category')
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
            .addField(`${client.config.prefix}ping`, 'Pings the bot and displays it in Latency and API Latency format')
            .addField(`${client.config.prefix}prefix [New prefix]`, '(Mod only command) Changes the bot\'s prefix')
            .addField(`${client.config.prefix}setnickname [New nickname]`, '(Mod only command) Changes the nickname for BattleBot')
            .addField(`${client.config.prefix}setavatar [Image]`, '(Mod only command) (Post image in same message as command) Sets the avatar for BattleBot')
            .addField(`${client.config.prefix}ranks`, '(Mod only command) Shows a list of selected roles and their member counts')
            .addField(`${client.config.prefix}poll [Question]`, '(Mod only command) Creates a 2-reaction poll for the provided Yes-or-No question');

            message.channel.send(embedMisc);
            break;
        case 'role': case 'roles':
            const embedRole = new Discord.RichEmbed()
            .setTitle('Battlebot Help: Roles')
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setColor('#4199c2')
            .setDescription('All the commands for distributing roles!')
            .setFooter(`Created and maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setThumbnail(client.user.displayAvatarURL)
            .setTimestamp()
            .addField(`${client.config.prefix}stars`, `Adds the role for ${client.faction1}`)
            .addField(`${client.config.prefix}shines`, `Adds the role for ${client.faction2}`)
            .addField(`${client.config.prefix}smashbros`, 'Adds the Frequent Fighter role which can be pinged if you\'re looking for an SSBU game');

            message.channel.send(embedRole);
            break;
        default:
            message.reply('Please specify a proper category!');
    }
}};