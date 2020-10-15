/* eslint-disable no-param-reassign */
module.exports = (client) => {
  client.getSettings = (guild) => {
    // Ensure the default settings exist
    client.settings.ensure('default', client.config.defaultSettings);

    // If no guild is provided, get the default settings
    if (!guild) {
      return client.settings.get('default');
    }

    // Get the settings for the provided guild
    // If a guild is not provided, an empty object is used
    const guildConf = client.settings.get(guild.id) || {};
    // Return the default settings joined by the guild settings
    return ({ ...client.settings.get('default'), ...guildConf });
  };

  client.permLevel = (message) => {
    // Set the initial perm name and perm level to User and 0 respectively
    let permName = 'User';
    let permlvl = 0;
    // Find the order of the permLevels
    const permOrder = client.config.permLevels.slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    // While permOrder exists
    while (permOrder.length) {
      // Remove the first element from the permOrder array and return it
      const currentlvl = permOrder.shift();

      // If the user passes the check for that level, set the permName and permLevel to the level passed
      if (currentlvl.check(client, message)) {
        permName = currentlvl.name;
        permlvl = currentlvl.level;
        break;
      }
    }
    // Return an array of the perm name and perm level
    return [permName, permlvl];
  };

  client.clean = async (clientParam, text) => {
    // If the text provided is of type Promise, await it
    // This negates the 'Pending<Promise>' text returned when a promise is provided
    if (text && text.constructor.name === 'Promise') {
      text = await text;
    }
    // If the text is not a string, convert it to one
    if (typeof text !== 'string') {
      // eslint-disable-next-line global-require
      text = require('util').inspect(text, { depth: 1 });
    }

    // Replace elements in the text string that could interfere with Discord markdown, @ing unnecessarily, or protecting the token
    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(clientParam.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');

    // Return the text
    return text;
  };

  client.fetchOwner = async () => {
    // Fetch the user object of the owner and return it
    const owner = await client.users.fetch(client.config.ownerID);
    return owner;
  };

  // Extend the String prototype to provide String.toProperCase() to make formatting easier
  // Basically sets stuff like 'donkey kong' to 'Donkey Kong'
  Object.defineProperty(String.prototype, 'toProperCase', { // eslint-disable-line no-extend-native
    value() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },
  });
};
