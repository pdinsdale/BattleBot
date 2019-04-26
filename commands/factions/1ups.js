/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
module.exports = {
  name: '1ups',
  category: 'factions',
  description: 'Controls the 1-Up database',
  aliases: ['1up'],
  usage: '[faction] [operation] [number]',
  args: '[faction] => faction1, faction2 \n[operation] => add, subtract \n[number] => 1-∞',
  modonly: true,
  async run(client, message, args) {
    // Ensures that the data exists in the Enmap
    client.oneups.ensure(message.guild.id, {
      guild: message.guild.id,
      faction1ups: 0,
      faction2ups: 0,
    });

    // Gets the values of each faction's 1-ups
    const f1ups = client.oneups.get(message.guild.id, 'faction1ups');
    const f2ups = client.oneups.get(message.guild.id, 'faction2ups');

    // Parses args[2] from a string into an integer
    const queuedOneUps = parseInt(args[2], 10);

    const { faction1 } = client.guildConfig;
    const { faction2 } = client.guildConfig;

    // Displays each faction's 1-ups
    if (!args[0]) {
      return message.channel.send(`**${faction1}: **\`${f1ups} 1-Ups\`\n**${faction2}: **\`${f2ups} 1-Ups\``);
    }

    function oneupsStuff(fups, enmapThing, faction) {
      if (message.content.includes('add')) {
        // Gets the values and adds them
        (fups) += queuedOneUps;

        // Sets the Enmap to the added values
        client.oneups.set(message.guild.id, (fups), (enmapThing));

        // Displays this message and logs it to the console
        message.channel.send(`Successfully added a **${queuedOneUps}-Up** to **${(faction)}!**`);
        console.log(`${message.member.user.tag} added a ${queuedOneUps}-Up to ${(faction)}`);
      } else if (message.content.includes('subtract') || message.content.includes('remove')) {
        // Gets the values and subtracts them
        (fups) -= queuedOneUps;

        // Sets the Enmap to the subtracted values
        client.oneups.set(message.guild.id, (fups), (enmapThing));

        // Displays this message and logs it to the console
        message.channel.send(`Successfully subtracted a **${queuedOneUps}-Up** from **${(faction)}!**`);
        console.log(`${message.member.user.tag} subtracted a ${queuedOneUps}-Up from ${(faction)}`);
      } else {
        // If args doesn't match the above, display this
        return message.reply('Please specify what to do with the 1-Up database!');
      }
    }

    if (message.content.toLowerCase().includes(faction1.toLowerCase())) {
      oneupsStuff(f1ups, 'faction1ups', faction1);
    } else if (message.content.toLowerCase().includes(faction2.toLowerCase())) {
      oneupsStuff(f2ups, 'faction2ups', faction2);
    } else {
      message.reply('Please specify a faction to edit in the database!');
    }
  },
};
