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
    const role1 = client.roleFind(message, 'Mario Fan');
    const role2 = client.roleFind(message, 'Luigi Fan');
    const role3 = client.roleFind(message, 'Yoshi Fan');
    const role4 = client.roleFind(message, 'Peach Fan');
    const role5 = client.roleFind(message, 'Bowser Fan');
    const role6 = client.roleFind(message, 'Wario Fan');
    const role7 = client.roleFind(message, 'Toad Fan');
    const role8 = client.roleFind(message, 'Daisy Fan');
    const role9 = client.roleFind(message, 'Waluigi Fan');
    const role10 = client.roleFind(message, 'DK Fan');

    if (message.member.roles.has(role.id)) {
      message.member.removeRole(role).catch(err => console.log(err));
      message.reply(`I've removed you from **${character}'s Fan club**!`);
    } else {
      client.remove(message, role1);
      client.remove(message, role2);
      client.remove(message, role3);
      client.remove(message, role4);
      client.remove(message, role5);
      client.remove(message, role6);
      client.remove(message, role7);
      client.remove(message, role8);
      client.remove(message, role9);
      client.remove(message, role10);

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
