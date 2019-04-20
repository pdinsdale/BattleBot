module.exports = {
  name: 'mentionable',
  category: 'roles',
  description: 'Overrides mentionable permissions for the specified role',
  usage: '[Role]',
  args: '[Role] => Any valid role on the server',
  modonly: true,
  async run(client, message, args) {
    const role = message.guild.roles.find(r => r.name === args.join(' '));

    if (!role) {
      return message.reply("Please provide a valid role on the server! (And yes, it's case sensitive)");
    }

    if (role.mentionable === true) {
      role.setMentionable(false);
      return message.channel.send(`\`${role.name}\` is no longer mentionable!`);
    }

    role.setMentionable(true);
    return message.channel.send(`\`${role.name}\` is now mentionable!`);
  },
};
