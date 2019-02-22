module.exports = { name: "leaderboard", description: "Shows the top 10 users on the server. If a user is mentioned, tells the position of the user on the leaderboard", aliases: ["lb"], usage: "[@User]", args: "[@User] => (Optional) Any valid member of the server", modonly: false, async run(client, message, args, Discord, eco) {

    if (message.mentions.users.first()) {
 
        let output = await eco.Leaderboard({
          filter: (x) => x.balance > 50,
          search: message.mentions.users.first().id
        });
        message.channel.send(`**${message.mentions.users.first().tag}** is number \`${output}\` on the leaderboard!`);
   
      } else {
   
        eco.Leaderboard({
          limit: 10,
          filter: (x) => x.balance > 50
        }).then(async (users) => {
   
          if (users[0]) {
            var firstplace = await client.fetchUser(users[0].userid);
          }
          if (users[1]) {
            var secondplace = await client.fetchUser(users[1].userid);
          }
          if (users[2]) {
            var thirdplace = await client.fetchUser(users[2].userid);
          }
          if (users[3]) {
            var fourthplace = await client.fetchUser(users[3].userid);
          }
          if (users[4]) {
            var fifthplace = await client.fetchUser(users[4].userid);
          }
          if (users[5]) {
            var sixthplace = await client.fetchUser(users[5].userid);
          }
          if (users[6]) {
            var seventhplace = await client.fetchUser(users[6].userid);
          }
          if (users[7]) {
            var eighthplace = await client.fetchUser(users[7].userid);
          }
          if (users[8]) {
            var ninethplace = await client.fetchUser(users[8].userid);
          }
          if (users[9]) {
            var tenthplace = await client.fetchUser(users[9].userid);
          }

          message.channel.send(`__**${client.user}'s Economy Leaderboard:**__
   
  **1 -** \`${firstplace && firstplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[0] && users[0].balance || "None"}\`
  **2 -** \`${secondplace && secondplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[1] && users[1].balance || "None"}\`
  **3 -** \`${thirdplace && thirdplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[2] && users[2].balance || "None"}\`
  **4 -** \`${fourthplace && fourthplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[3] && users[3].balance || "None"}\`
  **5 -** \`${fifthplace && fifthplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[4] && users[4].balance || "None"}\`
  **6 -** \`${sixthplace && sixthplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[5] && users[5].balance || "None"}\`
  **7 -** \`${seventhplace && seventhplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[6] && users[6].balance || "None"}\`
  **8 -** \`${eighthplace && eighthplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[7] && users[7].balance || "None"}\`
  **9 -** \`${ninethplace && ninethplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[8] && users[8].balance || "None"}\`
  **10 -** \`${tenthplace && tenthplace.tag || "Nobody Yet"}\` : **Balance -** \`${users[9] && users[9].balance || "None"}\``);
   
        });
   
      }
  
}};