const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'notifyadmin',
  aliases: ['Notifyadmin'],
  description: 'Notifier l\'admin',
  cooldown: 10,
  permissions: [],
  args: false,
  usage: '',
  run: async (client, message, args) => {
    //console.log('notifyadmin command run'); // Debug log

    const guild = client.guilds.cache.get('326438580706607106');
    if (!guild) {
      return message.reply("Le serveur n'a pas été trouvé.");
    }

    // Fetch all members to ensure the cache is complete
    await guild.members.fetch();

    const admins = guild.members.cache.filter(member =>
      member.permissions.has(PermissionFlagsBits.Administrator)
    );

    const messageToAdmin = `🔔 L'utilisateur ${message.author} vous a notifié et attend d'être guidé.`;
    const messageReceived = '✅ Les admins ont été notifiés. Merci de patienter.';

    admins.forEach(admin => {
      if (!admin.user.bot) {
        admin.send(messageToAdmin).catch(console.error);
      }
    });

    try {
      await message.author.send(messageReceived);
    } catch (err) {
      console.error('Could not send DM to user:', err);
      message.reply('Je n’ai pas pu t’envoyer un message privé. Active les DMs !');
    }
  },
};
