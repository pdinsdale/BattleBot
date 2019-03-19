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
};
