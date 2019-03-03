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
        .addField('Categories:', `Use \`${client.guildConfig.prefix}help [category]\` to see all the commands for that category!`)
        .addField('Battles', 'Commands related to Faction Battles')
        .addField('Fun', 'Just for fun')
        .addField('Info', 'Information commands')
        .addField('Roles', 'Commands for distributing roles')
        .addField('Moderation', 'Moderation commands')
        .addField('System', 'Commands for controlling the client')
        .addField('Misc.', 'Commands that don\'t really fit anywhere else');
        message.channel.send(helpEmbed);

    } else switch (specify) {
        case 'battles': case 'battle':
            helpEmbed.setTitle('Battlebot Help: Battles')
            .setDescription(`All the Faction Battle commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}${client.guildConfig.faction1Cmd}`, `${commands.get(`${client.guildConfig.faction1Cmd}`).description} ${client.guildConfig.faction1}`)
            .addField(`${client.guildConfig.prefix}${client.guildConfig.faction2Cmd}`, `${commands.get(`${client.guildConfig.faction2Cmd}`).description} ${client.guildConfig.faction2}`)
            .addField(`${client.guildConfig.prefix}results [year] [month]`, `${commands.get('results').description}`)
            .addField(`${client.guildConfig.prefix}factions`, `${commands.get('factions').description}`)
            .addField(`${client.guildConfig.prefix}1ups [faction] [operation] [number]`, `${commands.get('1ups').description}`)
            .addField(`${client.guildConfig.prefix}clear [database]`, `${commands.get('clear').description}`);
            message.channel.send(helpEmbed);
            break;
        case 'fun':
            helpEmbed.setTitle('Battlebot Help: Fun')
            .setDescription(`All the Fun/Random commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}8ball [Question]`, `${commands.get('8ball').description}`)
            .addField(`${client.guildConfig.prefix}ascii [Text]`, `${commands.get('ascii').description}`)
            .addField(`${client.guildConfig.prefix}slots`, `${commands.get('slots').description}`);
            message.channel.send(helpEmbed);
            break;
        case 'info': case 'information':
            helpEmbed.setTitle('Battlebot Help: Info')
            .setDescription(`All the Information commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}botinfo`, `${commands.get('botinfo').description}`)
            .addField(`${client.guildConfig.prefix}serverinfo`, `${commands.get('serverinfo').description}`)
            .addField(`${client.guildConfig.prefix}userinfo [@User]`, `${commands.get('userinfo').description}`)
            .addField(`${client.guildConfig.prefix}changelog`, `${commands.get('changelog').description}`);
            message.channel.send(helpEmbed);
            break;
        case 'moderation': case 'mod':
            helpEmbed.setTitle('Battlebot Help: Moderation')
            .setDescription(`All the Moderation commands! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}ban [@User] [reason]`, `${commands.get('ban').description}`)
            .addField(`${client.guildConfig.prefix}kick [@User] [reason]`, `${commands.get('kick').description}`)
            .addField(`${client.guildConfig.prefix}mute [@User]`, `${commands.get('mute').description}`)
            .addField(`${client.guildConfig.prefix}purge [Number 2-100] [@User]`, `${commands.get('purge').description}`)
            .addField(`${client.guildConfig.prefix}blacklist [Word/Phrase/Link]`, `${commands.get('blacklist').description}`);
            message.channel.send(helpEmbed);
            break;
        case 'misc': case 'misc.': case 'miscellaneous':
            helpEmbed.setTitle('Battlebot Help: Miscellaneous')
            .setDescription(`All the commands that don\'t fit in any other category! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}ranks`, `${commands.get('ranks').description}`)
            .addField(`${client.guildConfig.prefix}poll [Question]`, `${commands.get('poll').description}`);
            message.channel.send(helpEmbed);
            break;
        case 'role': case 'roles':
            helpEmbed.setTitle('Battlebot Help: Roles')
            .setDescription(`All the commands for distributing roles! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}${client.guildConfig.faction1Cmd}`, `${commands.get(`${client.guildConfig.faction1Cmd}`).description} ${client.guildConfig.faction1}`)
            .addField(`${client.guildConfig.prefix}${client.guildConfig.faction2Cmd}`, `${commands.get(`${client.guildConfig.faction2Cmd}`).description} ${client.guildConfig.faction2}`)
            .addField(`${client.guildConfig.prefix}crown [@User]`, `${commands.get('crown').description}`)
            .addField(`${client.guildConfig.prefix}smashbros`, `${commands.get('smashbros').description}`);
            message.channel.send(helpEmbed);
            break;
        case 'system':
            helpEmbed.setTitle('BattleBot Help: System')
            .setDescription(`All the commands for controlling exactly what goes on with BattleBot! Use \`${client.guildConfig.prefix}help [command name]\` to get more info on the specified command!`)
            .addField(`${client.guildConfig.prefix}ping`, `${commands.get('ping').description}`)
            .addField(`${client.guildConfig.prefix}setnickname [New nickname]`, `${commands.get('setnickname').description}`)
            .addField(`${client.guildConfig.prefix}setavatar [Image]`, `${commands.get('setavatar').description}`)
            .addField(`${client.guildConfig.prefix}set [configuration] [new setting]`, `${commands.get('set').description}`);
            message.channel.send(helpEmbed);
            break;
        default:
            // If above doesn't match args, display this
            if (!command) return message.reply('Please specify a proper command or category!');

            // Pushing the name of the command to the data array to be displayed later
            data.push(`**Command Name:** \n\`${command.name}\`\n`);

            // If the command has aliases, a description, or a usage, push that to the data array
            if (command.aliases) data.push(`**Aliases:** \n\`${command.aliases.join(', ')}\`\n`);
            if (command.description) data.push(`**Description:** \n\`${command.description}\`\n`);
            if (command.usage) data.push(`**Usage:** \n\`${client.guildConfig.prefix}${command.name} ${command.usage}\`\n`);
            if (command.args) data.push(`**Accepted Arguments:** \n\`${command.args}\`\n`);
            if (command.modonly === true) data.push('\n**Only Executable By Those With The Moderator Role!**');
            
            message.channel.send(data, {split: true});
            break;
    }
}};