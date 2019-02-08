const Discord = require('discord.js');

module.exports = { name: 'results', description: 'Displays the results of the specified Faction Battle', aliases: ['r', 'result'], usage: '[year] [month]', args: '[year] => between 2017 and 2019 \n[month] => between January and December \nNOTE: The server was not around before September, 2017!', modonly: false, async run(client, message, args) {

    // If no args[0] or args[1], display this
    if(!args[0] || !args[1]) return message.reply(`Proper Usage: \`${client.config.prefix}results [year] [month]\``);

    // Sets args to year and month
    let [year, month] = args;
    
    // Makes sure the year provided is actaully executable in this command
    if (year > 2019) return message.reply('Battle has not yet taken place');
    if (year < 2017) return message.reply('We weren\'t around back then :haa:');

    // Setting the basis and constants for embeds
    const resultsEmbed = new Discord.RichEmbed()
    .setAuthor(message.member.user.tag, message.author.avatarURL)
    .setColor('#02f044')
    .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
    .setTimestamp();

    // Results stuff, not going through it all
    switch (year) {
        case '2017':
            switch (month.toLowerCase()) {
                default:
                message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
                break;
            case 'september': case 'sept':
                resultsEmbed.setTitle('September 2017 Faction Battle Results')
                .setThumbnail('https://i.imgur.com/kTjdqhl.png') // Place holder; can't find it
                .addField('Mushroom Kingdom vs. Koopa Troop', 'Winner: Koopa Troop') // Check Timeline
                .addField('Points Distribution', 'Mushroom Kingdom: 45 users \nKoopa Troop: 53 users') // Check Timeline
                message.channel.send(resultsEmbed);
                break;
            case 'october': case 'oct':
                resultsEmbed.setTitle('October 2017 Faction Battle Results')
                .setThumbnail('https://i.imgur.com/kTjdqhl.png') // Place holder; Can't find it
                .addField('Dry Bones vs. Boo', 'Winner: Boo')
                .addField('Points Distribution', 'Dry Bones: 67 users \nBoo: 85 users') // Check Timeline
                message.channel.send(resultsEmbed);
                break;
            case 'november': case 'nov':
                resultsEmbed.setTitle('November 2017 Faction Battle Results')
                .setThumbnail('https://i.imgur.com/71nSImy.png')
                .addField('Pauline vs. DK: New Donk City Elections', 'Winner: Pauline') // Check Timeline
                .addField('Points Distribution', 'Pauline: 107 votes \nDK: 58 votes')
                message.channel.send(resultsEmbed);
                break;
            case 'december': case 'dec':
                resultsEmbed.setTitle('December 2017 Faction Battle Results')
                .setThumbnail('https://i.imgur.com/kTjdqhl.png')
                .addField('Penguins vs. Shiverians: The Great Race', 'Winner: Penguins') // Check Timeline
                .addField('Points Distribution', 'Penguins: 88 racers \nShiverians: 54 racers')
                message.channel.send(resultsEmbed);
                break;
            }
        case '2018':
            if (message.content.includes ("2017"))
            return;
            switch (month.toLowerCase()) {
                default:
                message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
                break;
            case 'january': case 'jan':
                resultsEmbed.setTitle("January 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/0ncjDn2.png")
                .addField("Chain Chomp vs. Poochy: Year of the Dog", 'Winner: Chain Chomp')
                .addField("Points Distribution", "Chain Chomp: 92 pups \nPoochy: 79 pups");
                message.channel.send(resultsEmbed);
                break;
            case 'february': case 'feb':
                resultsEmbed.setTitle("February 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/CRtQjxA.png")
                .addField("Mario vs. Bowser: Mushroom Kingdom Bachelor", 'Winner: Neither (Tie)')
                .addField("Points Distribution", "Mario: 149 votes + 49 bonus points = 198 points \nBowser: 143 votes + 55 bonus points = 198 points");
                message.channel.send(resultsEmbed);
                break;
            case 'march': case 'mar':
                resultsEmbed.setTitle("March 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/3PBQmaH.png")
                .addField("Luigi vs. Yoshi: The Great Bake-Off", 'Winner: Luigi')
                .addField("Points Distribution", "Luigi: 111 votes + 55 bonus points = 166 points \nYoshi: 84 votes + 56 bonus points = 140 points");
                message.channel.send(resultsEmbed);
                break;
            case 'april': case 'apr':
                resultsEmbed.setTitle("April 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/MnKi5nW.png")
                .addField("Wario vs. Waluigi: Fools in Court", 'Winner: Waluigi')
                .addField("Points Distribution", "Wario: 100 votes + 77 bonus points = 177 points \nWaluigi: 186 votes + 46 bonus points = 233 points");
                message.channel.send(resultsEmbed);
                break;
            case 'may':
                resultsEmbed.setTitle("May 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/9VO5zZB.png")
                .addField("Diddy Kong vs. Funky Kong: The Hunt for Cranky", 'Winner: Funky Kong')
                .addField("Points Distribution", "Diddy Kong: 97 votes + 117 bonus points = 214 points \nFunky Kong: 143 votes + 152 bonus points = 295 points");
                message.channel.send(resultsEmbed);
                break;
            case 'june':
                resultsEmbed.setTitle("June 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/emIYkzE.png")
                .addField("The Koopalings: Battle Royale", 'Winner: Larry')
                .addField("Points Distribution", "Larry: 59 votes + 11 bonus points = 70 points \nLemmy: 33 votes + 3 bonus points = 36 points \n Iggy: 41 votes + 13 bonus points = 54 points \n Wendy: 15 votes + 16 bonus points = 31 points \n Ludwig: 43 votes + 25 bonus points = 68 points \n Morton: 15 votes + 3 bonus points = 18 points \n Roy: 30 votes + 3 bonus points = 33 points");
                message.channel.send(resultsEmbed);
                break;
            case 'july':
                resultsEmbed.setTitle("July 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/HRHjqm1.png")
                .addField("Peach vs. Daisy: Royale Party Battle", 'Winner: Daisy')
                .addField("Points Distribution", "Princess Peach: 117 votes + 55 bonus points = 172 points > 17,278 GUESTS \nPrincess Daisy: 145 votes + 31 bonus points = 176 points > 17,599 GUESTS");
                message.channel.send(resultsEmbed);
                break;
            case 'august': case 'aug':
                resultsEmbed.setTitle("August 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/3fTFHdv.png")
                .addField("Jimmy T vs. Ashley: Mega Microgame Makers", 'Winner: Ashley')
                .addField("Points Distribution", "Ashley: 114 supporters + 79 bonus microgames = 192 MICROGAMES MADE! \nJimmy T: 92 supporters + 71 bonus microgames = 153 MICROGAMES MADE!");
                message.channel.send(resultsEmbed);
                break;
            case 'september': case 'sept':
                resultsEmbed.setTitle("September 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/JO76zRI.png")
                .addField("Mushroom Kingdom vs. Koopa Troop: Anniversary Calamity", 'Winner: Koopa Troop')
                .addField("Points Distribution", "Mushroom Kingdom: 122 votes + 38 bonus points = 160 TOTAL POINTS \nKoopa Troop: 150 votes + 25 bonus points = 175 TOTAL POINTS");
                message.channel.send(resultsEmbed);
                break;
            case 'october': case 'oct':
                resultsEmbed.setTitle("October 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/qTdfavX.png")
                .addField("Luigi vs. King Boo: A Frightening Wager", 'Winner: King Boo')
                .addField("Points Distribution", "Luigi: 168 votes + 49 bonus points = 217 POUNDS OF GOLD \nKing Boo: 94 votes + 165 bonus points = 259 POUNDS OF GOLD");
                message.channel.send(resultsEmbed);
                break;
            case 'november': case 'nov':
                resultsEmbed.setTitle("November 2018 Faction Battle Results")
                .setThumbnail("https://cdn.discordapp.com/attachments/415992268391055380/508679678911840256/kvk_icon.png")
                .addField("King vs. Kong  (Bowser and Bowser Jr. vs. Donkey Kong and Diddy Kong)", 'Winner: King (Bowser and Bowser Jr.)')
                .addField("Points Distribution", "Bowser and Bowser Jr.: 134 votes + 71 bonus points =  205 TOTAL POINTS \nDonkey Kong and Diddy Kong: 87 votes + 15 bonus points = 102 TOTAL POINTS");
                message.channel.send(resultsEmbed);
                break;
            case 'december': case 'dec':
                resultsEmbed.setTitle("December 2018 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/en2M2yX.png")
                .addField("King K. Rool Boss Battle: How K. Rool Stole the Holidays (Staff vs. Users)", 'Winner: Users')
                .addField("Points Distribution", "King K. Rool: 0/1000 HP");
                message.channel.send(resultsEmbed);
                break;
            }
        case '2019':
            if (message.content.includes ("2017"))
            return;
            if (message.content.includes ("2018"))
            return;
            switch (month.toLowerCase()) {
                default:
                message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
                break;
            case 'january': case 'jan':
                resultsEmbed.setTitle("January 2019 Faction Battle Results")
                .setThumbnail("https://i.imgur.com/gnroT8L.png")
                .addField("Koopa the Quick vs. Il Piantissimo: The New Year's Dash (Mario 64 vs. Sunshine)", 'Winner: Koopa the Quick (Mario 64)')
                .addField("Points Distribution", "Koopa the Quick: 12 1-UPS + 3 BONUS 1-UPS =  15 1-UPS \nIl Piantissimo: 11 1-UPS");
                message.channel.send(resultsEmbed);
                break;
            case 'february': case 'feb':
                resultsEmbed.setTitle("February 2019 Faction Battle Results")
                .setThumbnail("https://cdn.discordapp.com/attachments/528709361372102680/541112532572831764/icon_ml.png")
                .addField("Mario vs. Luigi: Bouquet Brawlout", 'Winner: Not yet determined')
                .addField("Points Distribution", "Mario: ¯\\_(ツ)_/¯ \nLuigi: ¯\\_(ツ)_/¯")
                message.reply('Battle currently ongoing!');
                break;
            }
    }
}};