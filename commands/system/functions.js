module.exports = {
    async run(client, message, args, Discord, eco) {

    function roles(roleName) {
       message.guild.roles.find((r) => r.name === (roleName));
    }
    client.roles = roles;

    function remove(role) {
        if (message.member.roles.has((role).id)) {
            message.member.removeRole((role)).catch((err) => console.log(err));
        }
    }
    client.remove = remove;

    const guildConfig = client.settings.ensure(message.guild.id, client.defaultSettings);
    client.guildConfig = guildConfig;
}};