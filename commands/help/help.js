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
            .addField(`${client.config.prefix}stars`, 'Adds the role for that faction')
            .addField(`${client.config.prefix}shines`, 'Adds the role for that faction')
            .addField(`${client.config.prefix}results [year] [month]`, 'Displays the results of the specified Faction Battle')
            .addField(`${client.config.prefix}factions`, '(Mod only command) Displays the current amount of users in each faction');

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
            if(message.member.user.id !== client.config.ownerID) return;

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
            .addField(`${client.config.prefix}purge [Number 2-100] [@User]`, 'Purges the stated number of messages in a channel or from a mentioned user');
            
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
            .addField(`${client.config.prefix}poll [Question]`, '(Mod only command) Creates a 2-reaction poll for the provided Yes-or-No question')

            message.channel.send(embedMisc);
            break;
        default:
            message.reply('Please specify a proper category!');
    }
}};