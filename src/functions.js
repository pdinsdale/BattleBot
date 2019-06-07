/* eslint-disable no-param-reassign */
module.exports = (client) => {
  client.roleFind = (message, roleName) => {
    const role = message.guild.roles.find(r => r.name === roleName);
    return role;
  };

  client.roleGet = (message, roleID) => {
    const role = message.guild.roles.get(roleID);
    return role;
  };

  client.remove = (message, role) => {
    if (message.member.roles.has(role.id)) {
      message.member.removeRole(role).catch(err => console.log(err));
    }
  };

  client.fanRole = (message, role, character) => {
    const characters = ['Mario', 'Luigi', 'Toad', 'Toadette'];

    if (message.member.roles.has(role.id)) {
      client.remove(message, role);
      message.reply(`I've removed you from **${character}'s Fan club**!`);
    } else {
      for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        const r = client.roleFind(message, `${char} Fan`);

        client.remove(message, r);
      }

      // Give role to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message
      message.channel.send(`${message.author} has joined **${character}**!`);
    }
  };

  client.fanRoleFind = (message, character) => {
    const roleID = client.roleFind(message, `${character} Fan`).id;
    return client.roleGet(message, roleID).members.size;
  };
};
