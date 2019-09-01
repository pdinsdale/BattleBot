/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [...roleName], level) => {
  const settings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);
  const role = message.guild.roles.find((r) => r.name === roleName.join(' ').toProperCase());

  if (!role) {
    return message.error('Invalid Role!', 'Please provide a valid role!');
  }

  switch (message.flags[0]) {
    case 'add':
      if (!settings.selfAssignRoles.includes(role.name)) {
        return message.error('Role Not Self-Assignable!', 'This role cannot be self assigned using this command!');
      }

      message.member.addRole(role)
        .then(() => {
          message.success('Success!', `${message.author}, I've successfully added the **${role.name}** role!`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${client.fetchOwner().tag}** for further details!`);
          console.error(err);
        });
      break;
    case 'remove':
      if (!settings.selfAssignRoles.includes(role.name)) {
        return message.error('Role Not Self-Assignable!', 'This role cannot be self assigned using this command!');
      }

      message.member.removeRole(role)
        .then(() => {
          message.success('Success!', `${message.author}, I've successfully removed the **${role.name}** role from you!`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${client.fetchOwner().tag}** for further details!`);
          console.error(err);
        });
      break;
    case 'push':
      if (message.member.roles.some((r) => ['Moderator'].includes(r.name))) {
        client.factionSettings.push(message.guild.id, role.name, 'selfAssignRoles');
        message.success('Success!', `I've successfully added **${role.name}** to be self-assigned!`);
      } else {
        message.error('Invalid Permissions!', 'Only Moderators can use this flag!');
      }
      break;
    case 'del': case 'delete':
      if (message.member.roles.some((r) => ['Moderator'].includes(r.name))) {
        client.factionSettings.remove(message.guild.id, role.name, 'selfAssignRoles');
        message.success('Success!', `**${role.name}** can no longer be self-assigned!`);
      } else {
        message.error('Invalid Permissions!', 'Only Moderators can use this flag!');
      }
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
  usage: 'role <-add|-remove|-push|-del> <role>',
  details: "<-add|-remove|-push|-del> => Whether to add a remove a role. -push and -del can only be used by mods to control which roles can be self-assigned. (Notice the - it's important!)\n<role> => The name of the role",
};
