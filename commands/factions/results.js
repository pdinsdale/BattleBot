module.exports = {
  name: 'results',
  description: 'Displays the results of the specified Faction Battle',
  aliases: ['r', 'result'],
  usage: '[year] [month]',
  args: '[year] => between 2017 and 2019 \n[month] => between January and December \nNOTE: The server was not around before September, 2017!',
  async run(client, message, args, Discord) {
    // If no args[0] or args[1], display this
    if (!args[0] || !args[1]) {
      return message.reply(`Proper Usage: \`${client.guildConfig.prefix}results [year] [month]\``);
    }

    // Sets args to year and month
    const [year, month] = args;

    // Makes sure the year provided is actaully executable in this command
    if (year > 2019) {
      return message.reply('Battle has not yet taken place');
    }
    if (year < 2017) {
      return message.reply("We weren't around back then :haa:");
    }

    // Setting the basis and constants for embeds
    const resultsEmbed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setColor('#02f044')
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setTimestamp();

    function resultsFunc(date, thumbnail, matchup, name, winner, points1, points2) {
      resultsEmbed.setTitle(`${(date)} Faction Battle Results`)
        .setThumbnail(`${(thumbnail)}`)
        .addField(`${(matchup)}: ${(name)}`, `Winner: ${(winner)}`)
        .addField('Points Distribution', `${(points1)}\n${(points2)}`);
      message.channel.send(resultsEmbed);
    }

    // Results stuff, not going through it all
    switch (year) {
      default:
        message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
        break;
      case '2017':
        switch (month.toLowerCase()) {
          default:
            message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
            break;
          case 'september': case 'sept':
            resultsFunc('September 2017', 'https://i.imgur.com/kTjdqhl.png', 'Mushroom Kingdom vs. Koopa Troop', ' ', 'Koopa Troop', 'Mushroom Kingdom: 45 users', 'Koopa Troop: 53 users');
            break;
          case 'october': case 'oct':
            resultsFunc('October 2017', 'https://i.imgur.com/kTjdqhl.png', 'Dry Bones vs. Boo', ' ', 'Boo', 'Dry Bones: 67 users', 'Boo: 85 users');
            break;
          case 'november': case 'nov':
            resultsFunc('November 2017', 'https://i.imgur.com/71nSImy.png', 'Pauline vs. DK', 'New Donk City Elections', 'Pauline', 'Pauline: 107 votes', 'DK: 58 votes');
            break;
          case 'december': case 'dec':
            resultsFunc('December 2017', 'https://i.imgur.com/kTjdqhl.png', 'Penguins vs. Shiverians', 'The Great Race', 'Penguins', 'Penguins: 88 racers', 'Shiverians: 54 racers');
            break;
        }
        break;
      case '2018':
        switch (month.toLowerCase()) {
          default:
            message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
            break;
          case 'january': case 'jan':
            resultsFunc('January 2018', 'https://i.imgur.com/0ncjDn2.png', 'Chain Chomp vs. Poochy', 'Year of the Dog', 'Chain Chomp', 'Chain Chomp: 92 pups', 'Poochy: 79 pups');
            break;
          case 'february': case 'feb':
            resultsFunc('February 2018', 'https://i.imgur.com/CRtQjxA.png', 'Mario vs. Bowser', 'Mushroom Kingdom Bachelor', 'Neither (Tie)', 'Mario: 149 votes + 49 bonus points = 198 points', 'Bowser: 143 votes + 55 bonus points = 198 points');
            break;
          case 'march': case 'mar':
            resultsFunc('March 2018', 'https://i.imgur.com/3PBQmaH.png', 'Luigi vs. Yoshi', 'The Great Bake-Off', 'Luigi', 'Luigi: 111 votes + 55 bonus points = 166 points', 'Yoshi: 84 votes + 56 bonus points = 140 points');
            break;
          case 'april': case 'apr':
            resultsFunc('April 2018', 'https://i.imgur.com/MnKi5nW.png', 'Wario vs. Waluigi', 'Fools in Court', 'Waluigi', 'Wario: 100 votes + 77 bonus points = 177 points', 'Waluigi: 186 votes + 46 bonus points = 233 points');
            break;
          case 'may':
            resultsFunc('May 2018', 'https://i.imgur.com/9VO5zZB.png', 'Diddy Kong vs. Funky Kong', 'The Hunt for Cranky', 'Funky Kong', 'Diddy Kong: 97 votes + 117 bonus points = 214 points', 'Funky Kong: 143 votes + 152 bonus points = 295 points');
            break;
          case 'june':
            resultsFunc('June 2018', 'https://i.imgur.com/emIYkzE.png', 'The Koopalings', 'Battle Royale', 'Larry', 'Larry: 59 votes + 11 bonus points = 70 points\nLemmy: 33 votes + 3 bonus points = 36 points\nIggy: 41 votes + 13 bonus points = 54 points\nWendy: 15 votes + 16 bonus points = 31 points', 'Ludwig: 43 votes + 25 bonus points = 68 points\nMorton: 15 votes + 3 bonus points = 18 points\nRoy: 30 votes + 3 bonus points = 33 points');
            break;
          case 'july':
            resultsFunc('July 2018', 'https://i.imgur.com/HRHjqm1.png', 'Peach vs. Daisy', 'Royale Party Battle', 'Daisy', 'Princess Peach: 117 votes + 55 bonus points = 172 points > 17,278 GUESTS', 'Princess Daisy: 145 votes + 31 bonus points = 176 points > 17,599 GUESTS');
            break;
          case 'august': case 'aug':
            resultsFunc('August 2018', 'https://i.imgur.com/3fTFHdv.png', 'Jimmy T vs. Ashley', 'Mega Microgame Makers', 'Ashley', 'Ashley: 114 supporters + 79 bonus microgames = 192 MICROGAMES MADE!', 'Jimmy T: 92 supporters + 71 bonus microgames = 153 MICROGAMES MADE!');
            break;
          case 'september': case 'sept':
            resultsFunc('September 2018', 'https://i.imgur.com/JO76zRI.png', 'Mushroom Kingdom vs. Koopa Troop', 'Anniversary Calamity', 'Koopa Troop', 'Mushroom Kingdom: 122 votes + 38 bonus points = 160 TOTAL POINTS', 'Koopa Troop: 150 votes + 25 bonus points = 175 TOTAL POINTS');
            break;
          case 'october': case 'oct':
            resultsFunc('October 2018', 'https://i.imgur.com/qTdfavX.png', 'Luigi vs. King Boo', 'A Frightening Wager', 'King Boo', 'Luigi: 168 votes + 49 bonus points = 217 POUNDS OF GOLD', 'King Boo: 94 votes + 165 bonus points = 259 POUNDS OF GOLD');
            break;
          case 'november': case 'nov':
            resultsFunc('November 2018', 'https://cdn.discordapp.com/attachments/415992268391055380/508679678911840256/kvk_icon.png', 'King vs. Kong', '(Bowser and Bowser Jr. vs. Donkey Kong and Diddy Kong)', 'King (Bowser and Bowser Jr.)', 'King: 134 votes + 71 bonus points =  205 TOTAL POINTS', 'Kong: 87 votes + 15 bonus points = 102 TOTAL POINTS');
            break;
          case 'december': case 'dec':
            resultsFunc('December 2018', 'https://i.imgur.com/en2M2yX.png', 'King K. Rool Boss Battle', 'How K. Rool Stole the Holidays (Staff vs. Users)', 'Users', 'King K. Rool: 0/1000 HP', 'Users took him down through events');
            break;
        }
        break;
      case '2019':
        switch (month.toLowerCase()) {
          default:
            message.reply('Please specify a year and month between September 2017 and now, and check your spelling!');
            break;
          case 'january': case 'jan':
            resultsFunc('January 2019', 'https://i.imgur.com/gnroT8L.png', 'Koopa the Quick vs. Il Piantissimo', "The New Year's Dash (Mario 64 vs. Sunshine)", 'Koopa the Quick (Mario 64)', 'Koopa the Quick: 12 1-UPS + 3 BONUS 1-UPS =  15 1-UPS', 'Il Piantissimo: 11 1-UPS');
            break;
          case 'february': case 'feb':
            resultsEmbed.setTitle('February 2019 Faction Battle Results')
              .setThumbnail('https://cdn.discordapp.com/attachments/528709361372102680/541112532572831764/icon_ml.png');
            message.reply('Battle currently ongoing!');
            break;
        }
    }

    return console.log(`${message.author.tag} used the results command to check ${args[1]}, ${args[0]}'s faction results`);
  },
};
