/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [flag, ...roleName], level) => {
  const settings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);
  const role = message.guild.roles.find((r) => r.name === roleName.join(' ').toProperCase());

  if (!role) {
    return message.error('Invalid Role!', 'Please provide a valid role!');
  }

  if (!settings.selfAssignRoles.includes(role)) {
    return message.error('Role Not Self-Assignable!', 'This role cannot be self assigned using this command!');
  }

  switch (message.flags[0]) {
    case 'add':
      message.member.addRole(role)
        .then(() => {
          message.success('Success!', `I've successfully added the **${role.name}** role!`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${client.fetchOwner().tag}** for further details!`);
          console.error(err);
        });
      break;
    case 'remove':
      message.member.removeRole(role)
        .then(() => {
          message.success('Success!', `I've successfully removed the **${role.name}** role from you!`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${client.fetchOwner().tag}** for further details!`);
          console.error(err);
        });
      break;
    default:
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-add\` or \`-remove\`! For further details, use \`${settings.prefix}help role\`!`);
      break;
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  args: 2,
};

module.exports.help = {
  name: 'role',
  category: 'roles',
  description: 'Controls member roles',
  usage: 'role <-add|-remove> <role>',
  details: "<-add|-remove> => Whether to add a remove a role. (Notice the - it's important!)\n<role> => The name of the role",
};
