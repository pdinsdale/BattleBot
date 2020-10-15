// eslint-disable-next-line consistent-return
module.exports.run = async (client, message, args, level, Discord) => {
  // Find the mentioned user's friend code. If a user is not mentioned, falls back to the author
  const member = message.mentions.members.first() || message.member;

  // Build initial friendcode embed
  const owner = await client.fetchOwner();
  const embed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ format: 'gif' }))
    .setTitle(`${member.displayName}'s Friend Code`)
    .setColor('#4199c2')
    .setTimestamp()
    .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL());

  // Ensure the author has an entry in the friendCodes Enmap
  const fc = client.friendCodes.ensure(message.author.id, {});

  // If a member is mentioned, get their friendcode, set it as the description of the embed and send the embed
  // If the friend code is not found, error on no code found
  if (member === message.mentions.members.first()) {
    const memberFC = client.friendCodes.get(member.user.id);
    if (!memberFC) {
      return message.error('No Code Found!', 'That user has not set their friend code!');
    }
    embed.setDescription(`**${memberFC}**`);

    return message.channel.send(embed);
  }

  // If no member mentioned, attempt to find author's friend code, set it as the description of the embed and send the embed
  // If a code is not found, error on no code found
  if (!args[0]) {
    if (!fc) {
      return message.error('No Code Found!', 'You have not set a friend code! You can do so by running \`.friendcode <code>\`!');
    }

    embed.setDescription(`**${fc}**`);
    return message.channel.send(embed);
  }

  switch (message.flags[0]) {
    // User wishes to set their friend code
    case 'set': {
      // If there is already a friend code in the database, error on code already inserted
      if (fc) {
        return message.error('Code Already in Database!', 'You already have a friend code set! You can delete it by running \`.friendcode delete\`!');
      }

      // Parse the freind code and ensure it could be a valid code
      const code = args[1].toUpperCase();
      if (code.length !== 17 || code.charAt(0) !== 'S' || code.charAt(1) !== 'W' || code.charAt(2) !== '-' || code.charAt(7) !== '-' || code.charAt(12) !== '-') {
        return message.error('Invalid Code!', 'Please check to see if the code was typed correctly and include all dashes and \`SW\` at the beginning!');
      }

      // Set the friend code in the Enmap, set the description of the embed to the code, and send the embed
      client.friendCodes.set(message.author.id, code);
      embed.setDescription(`Successfully set your friend code!\n**${code}**`);

      message.channel.send(embed);
      break;
    }
    // User wishes to delete their friend code
    case 'del':
      // Delete the author's entry in the Enmap and display a success message
      client.friendCodes.delete(message.author.id);
      message.success('Successfully Deleted!', "I've successfully deleted your friend code from the database! You can set it again by running \`.fc -set <code>\`!");
      break;
    default:
      // If an invalid flag is used, error on invalid flag
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-set\` or \`-del\`! For further details, use \`${client.getSettings(message.guild).prefix}help friendcode\`!`);
      break;
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['fc'],
  permLevel: 'User',
};

module.exports.help = {
  name: 'friendcode',
  category: 'misc',
  description: 'Controls the friendcode db',
  usage: 'friendcode <-set|-get|-del> <code|@member>',
  details: "<-set|-get|-del> => Whether to set a new friend code, get an existing one, or delete an existing one. (Notice the - it's important)\n<code|@member> => Only necessary if you're setting a new code or getting the code of another member.",
};
