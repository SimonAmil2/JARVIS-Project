const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');

    if (user) {
        try {
            await message.guild.member(user).kick(reason);
            message.channel.send(`${user} a été kick!`);
        } catch (error) {
            message.channel.send(`Something goes wrong ... ${error.message}`);
        }    
    } else {
        message.channel.send(`L'utilisateur mentionné n'existe pas!`);
    }

    const embed = new MessageEmbed()
        .setAuthor(`${user.username} (${user.id})`)
        .setColor('#ffa500')
        .setDescription(`**Action** : kick\n**Raison** : ${reason}`)
        .setThumbnail(user.avatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.find(channel => channel.name === 'bot_log').send(embed);
}

module.exports.help = {
    aliases: ['kick'],
    args: true,
    cooldown: 10,
    description: 'Kick un utilisateur',
    isUserAdmin: true,
    name: 'kick',
    permissions: true,
    usage: '<@user> <votre_message>'
}