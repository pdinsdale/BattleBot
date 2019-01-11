
// Fixed!!! Embed multiple switch statements in order to reach desired result

const Discord = require('discord.js');

module.exports = { name: 'command-name', async run(client, message, args) {

    if(!args[0]) return message.reply(`Proper Usage: \`${client.config.prefix}results [year] [month]\``);
    if(!args[1]) return message.reply(`Proper Usage: \`${client.config.prefix}results [year] [month]\``);
    let [year, month] = args;
    if (year > 2019) return message.reply('Battle has not yet taken place');
    if (year < 2017) return message.reply('We weren\'t around back then :haa:');

    switch (year) {
        default:
        message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
        break;
        case '2017':
            switch (month.toLowerCase()) {
                case 'september':
                const embedSept17 = new Discord.RichEmbed()
                .setTitle('September 2017 Faction Battle Results')
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor('#02f044')
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail('https://i.imgur.com/kTjdqhl.png') // Place holder; can't find it
                .setTimestamp()
                .addField('Mushroom Kingdom vs. Koopa Troop', 'Winner: Koopa Troop') // Check Timeline
                .addField('Points Distribution', 'Mushroom Kingdom: 45 users \n Koopa Troop: 53 users') // Check Timeline
                message.channel.send(embedSept17);
                break;
            case 'october':
                const embedOct17 = new Discord.RichEmbed()
                .setTitle('October 2017 Faction Battle Results')
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor('#02f044')
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail('https://i.imgur.com/kTjdqhl.png') // Place holder; Can't find it
                .setTimestamp()
                .addField('Dry Bones vs. Boo', 'Winner: Boo')
                .addField('Points Distribution', 'Dry Bones: 67 users \n Boo: 85 users') // Check Timeline
                message.channel.send(embedOct17);
                break;
            case 'november':
                const embedNov17 = new Discord.RichEmbed()
                .setTitle('November 2017 Faction Battle Results')
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor('#02f044')
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail('https://i.imgur.com/71nSImy.png')
                .setTimestamp()
                .addField('Pauline vs. DK: New Donk City Elections', 'Winner: Pauline') // Check Timeline
                .addField('Points Distribution', 'Pauline: 107 votes \n DK: 58 votes')
                message.channel.send(embedNov17);
                break;
            case 'december':
                const embedDec17 = new Discord.RichEmbed()
                .setTitle('December 2017 Faction Battle Results')
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor('#02f044')
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail('https://i.imgur.com/kTjdqhl.png')
                .setTimestamp()
                .addField('Penguins vs. Shiverians: The Great Race', 'Winner: Penguins') // Check Timeline
                .addField('Points Distribution', 'Penguins: 88 racers \n Shiverians: 54 racers')
                message.channel.send(embedDec17);
                break;
            }
        case '2018':
            switch (month.toLowerCase()) {
                case 'january':
                const embedJan18 = new Discord.RichEmbed()
                .setTitle("January 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/0ncjDn2.png")
                .setTimestamp()
                .addField("Chain Chomp vs. Poochy: Year of the Dog", 'Winner: Chain Chomp')
                .addField("Points Distribution", "Chain Chomp: 92 pups \n Poochy: 79 pups");
                message.channel.send(embedJan18);
                break;
            case 'february':
                const embedFeb18 = new Discord.RichEmbed()
                .setTitle("Februay 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/CRtQjxA.png")
                .setTimestamp()
                .addField("Mario vs. Bowser: Mushroom Kingdom Bachelor", 'Winner: Neither (Tie)')
                .addField("Points Distribution", "Mario: 149 votes + 49 bonus points = 198 points \n Bowser: 143 votes + 55 bonus points = 198 points");
                message.channel.send(embedFeb18);
                break;
            case 'march':
                const embedMar18 = new Discord.RichEmbed()
                .setTitle("March 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/3PBQmaH.png")
                .setTimestamp()
                .addField("Luigi vs. Yoshi: The Great Bake-Off", 'Winner: Luigi')
                .addField("Points Distribution", "Luigi: 111 votes + 55 bonus points = 166 points \n Yoshi: 84 votes + 56 bonus points = 140 points");
                message.channel.send(embedMar18);
                break;
            case 'april':
                const embedApr18 = new Discord.RichEmbed()
                .setTitle("April 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/MnKi5nW.png")
                .setTimestamp()
                .addField("Wario vs. Waluigi: Fools in Court", 'Winner: Waluigi')
                .addField("Points Distribution", "Wario: 100 votes + 77 bonus points = 177 points \n Waluigi: 186 votes + 46 bonus points = 233 points");
                message.channel.send(embedApr18);
                break;
            case 'may':
                const embedMay18 = new Discord.RichEmbed()
                .setTitle("May 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/9VO5zZB.png")
                .setTimestamp()
                .addField("Diddy Kong vs. Funky Kong: The Hunt for Cranky", 'Winner: Funky Kong')
                .addField("Points Distribution", "Diddy Kong: 97 votes + 117 bonus points = 214 points \n Funky Kong: 143 votes + 152 bonus points = 295 points");
                message.channel.send(embedMay18);
                break;
            case 'june':
                const embedJune18 = new Discord.RichEmbed()
                .setTitle("June 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/emIYkzE.png")
                .setTimestamp()
                .addField("The Koopalings: Battle Royale", 'Winner: Larry')
                .addField("Points Distribution", "Larry: 59 votes + 11 bonus points = 70 points \n Lemmy: 33 votes + 3 bonus points = 36 points \n Iggy: 41 votes + 13 bonus points = 54 points \n Wendy: 15 votes + 16 bonus points = 31 points \n Ludwig: 43 votes + 25 bonus points = 68 points \n Morton: 15 votes + 3 bonus points = 18 points \n Roy: 30 votes + 3 bonus points = 33 points");
                message.channel.send(embedJune18);
                break;
            case 'july':
                const embedJuly18 = new Discord.RichEmbed()
                .setTitle("July 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/HRHjqm1.png")
                .setTimestamp()
                .addField("Peach vs. Daisy: Royale Party Battle", 'Winner: Daisy')
                .addField("Points Distribution", "Princess Peach: 117 votes + 55 bonus points = 172 points > 17,278 GUESTS \n Princess Daisy: 145 votes + 31 bonus points = 176 points > 17,599 GUESTS");
                message.channel.send(embedJuly18);
                break;
            case 'august':
                const embedAug18 = new Discord.RichEmbed()
                .setTitle("August 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/3fTFHdv.png")
                .setTimestamp()
                .addField("Jimmy T vs. Ashley: Mega Microgame Makers", 'Winner: Ashley')
                .addField("Points Distribution", "Ashley: 114 supporters + 79 bonus microgames = 192 MICROGAMES MADE! \n Jimmy T: 92 supporters + 71 bonus microgames = 153 MICROGAMES MADE!");
                message.channel.send(embedAug18);
                break;
            case 'september':
                if (message.content.includes ("2017"))
                return;
                const embedSept18 = new Discord.RichEmbed()
                .setTitle("September 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/JO76zRI.png")
                .setTimestamp()
                .addField("Mushroom Kingdom vs. Koopa Troop: Anniversary Calamity", 'Winner: Koopa Troop')
                .addField("Points Distribution", "Mushroom Kingdom: 122 votes + 38 bonus points = 160 TOTAL POINTS \n Koopa Troop: 150 votes + 25 bonus points = 175 TOTAL POINTS");
                message.channel.send(embedSept18);
                break;
            case 'october':
                if (message.content.includes ("2017"))
                return;
                const embedOct18 = new Discord.RichEmbed()
                .setTitle("October 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://i.imgur.com/qTdfavX.png")
                .setTimestamp()
                .addField("Luigi vs. King Boo: A Frightening Wager", 'Winner: King Boo')
                .addField("Points Distribution", "Luigi: 168 votes + 49 bonus points = 217 POUNDS OF GOLD \n King Boo: 94 votes + 165 bonus points = 259 POUNDS OF GOLD");
                message.channel.send(embedOct18);
                break;
            case 'november':
                if (message.content.includes ("2017"))
                return;
                const embedNov18 = new Discord.RichEmbed()
                .setTitle("November 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://cdn.discordapp.com/attachments/415992268391055380/508679678911840256/kvk_icon.png")
                .setTimestamp()
                .addField("King vs. Kong  (Bowser and Bowser Jr. vs. Donkey Kong and Diddy Kong)", 'Winner: King (Bowser and Bowser Jr.)') // Not sure yet
                .addField("Points Distribution", "Bowser and Bowser Jr.: 134 votes + 71 bonus points =  205 TOTAL POINTS \n Donkey Kong and Diddy Kong: 87 votes + 15 bonus points = 102 TOTAL POINTS");
                message.channel.send(embedNov18);
                break;
            case 'december':
                if (message.content.includes ("2017"))
                return;
                const embedDec18 = new Discord.RichEmbed()
                .setTitle("December 2018 Faction Battle Results")
                .setAuthor(message.member.user.tag, message.author.avatarURL)
                .setColor("#02f044")
                .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
                .setThumbnail("https://cdn.discordapp.com/attachments/415992268391055380/517918989205372928/icon_kr.png")
                .setTimestamp()
                .addField("King K. Rool Boss Battle (Staff vs. Users)", 'Winner: Users')
                .addField("Points Distribution", "King K. Rool: 0/1000 HP");
                message.channel.send(embedDec18);
                break;
            }
        case '2019':
            switch (month.toLowerCase()) {
                case 'january':
                if (message.content.includes ("2017"))
                return;
                if (message.content.includes ("2018"))
                return;
                message.reply('Battle currently ongoing');
                break;
            }
    }
}};