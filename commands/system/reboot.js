/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  name: 'reboot',
  category: 'system',
  description: 'Reboots the bot',
  usage: ' ',
  owneronly: true,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    await message.channel.send('Rebooting bot! Please allow at least 10 seconds for the bot to fully reboot!');
    await console.log('Bot rebooting...');
    await process.exit(0);
  },
};
