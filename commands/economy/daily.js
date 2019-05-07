module.exports = {
  name: 'daily',
  category: 'economy',
  description: 'Gives you your daily coins which resets at 12:00AM',
  aliases: ['d', 'day'],
  usage: ' ',
  async run(client, message, args, Discord, eco) {
    const output = await eco.Daily(message.author.id);

    if (output.updated) {
      const profile = await eco.AddToBalance(message.author.id, 100);
      message.channel.send(`**${message.member.displayName}**, You claimed your daily :money_with_wings: \`100 coins\`! \nYou now have :money_with_wings: \`${profile.newbalance} coins\`!`);
    } else {
      message.channel.send(`**${message.member.displayName}**, You can collect your daily :money_with_wings: coins again in \`${output.timetowait}\`!`);
    }
  },
};
