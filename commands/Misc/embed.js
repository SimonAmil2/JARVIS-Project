const { MessageEmbed, MessageAttachment } = require('discord.js');
const neganGif = new MessageAttachment('./assets/gifs/negan.gif');

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
        .setColor('#9E9E9E')
        .setTitle('Welcome !')
        .setURL('https://www.amc.com/shows/the-walking-dead--119')
        .setDescription('Macatia paté')
        .addField('Je suis un champ', 'je suis la valeur')
        .addFields(
            { name: 'Citation 1', value: 'Ici néna zamal' },
            { name: 'Citation 2', value: 'Maoosaminho'}
        )
        .setThumbnail(client.user.displayAvatarURL())
        .attachFiles(neganGif)
        .setImage('attachment://negan.gif')
        .setTimestamp()
        .setFooter('Footer ...');

        message.channel.send(embed);
}


module.exports.help = {
    aliases: ['emb'],
    args: false,
    cooldown: 10,
    description: 'Renvoie un embed',
    isUserAdmin: false,
    name: 'embed',
    permissions: false,
    usage: ''
}