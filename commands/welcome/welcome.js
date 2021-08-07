const { MessageEmbed, MessageAttachment } = require('discord.js');
const maosGif = new MessageAttachment('./assets/gifs/maos.gif');

module.exports.run = (client, message, args) => {
    client.on('guildMemberAdd', (member) => {
        const embed = new MessageEmbed()
        .setColor('#9E9E9E')
        .setTitle(`Bienvenue sur le server "${client.guilds.cache.get('326438580706607106')}`)
        .setDescription(`Rejoins le channel Lobby et écris "hello" dans le channel ${client.channels.cache.get('326438580706607106')} pour notifier un admin de ta présence.`)
        .setThumbnail(client.user.displayAvatarURL())
        .attachFiles(maosGif)
        .setImage('attachment://maos.gif')
        .setTimestamp();

        const userID = member.user;
        userID.send(embed)
    });
}

module.exports.help = {
    args: false,
    cooldown: 10,
    description: 'Message de bievenue',
    isUserAdmin: false,
    name: 'welcome',
    permissions: false,
    usage: ''
}