const moment = require("moment");
const tz = require("moment-timezone");

module.exports = {
    name: "userinfo",
    description: "Gives information on the mentioned user. If no one is mentioned, falls back to the author",
    aliases: ["ui"],
    usage: "[@User]",
    args: "[@User] => A valid member of the server. If no one is mentioned, falls back to the author and gives their info",
    async run(client, message, args, Discord) {

    // Setting the variable member to the mentioned user, if no mentioned user, falls back to author
    let member = message.mentions.members.first() || message.member;
    
        // Userinfo embed
        let embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.author.avatarURL)
        .setColor("#4199c2")
        .setTimestamp()
        .setTitle(`${member.displayName}\'s Info`)
        .setThumbnail(member.user.displayAvatarURL)
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .addField("ID", member.user.id)
        .addField("Nickname", member.displayName)
        .addField("Account Created", moment(message.member.user.createdAt).tz("America/New_York").format("MMMM Do YYYY, h:mm:ss a z"))
        .addField(`Joined *${message.guild.name}* `, moment(member.joinedAt).tz("America/New_York").format("MMMM Do YYYY, h:mm:ss a z"))
        .addField("Roles", member.roles.map((roles) => `${roles.name}`).join(", "));

        return message.channel.send(embed);
}};