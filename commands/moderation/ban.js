const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    const days = args.slice(1, 2)[0] || 7;
    const reason = (args.slice(2).join(' ') || 'Aucune raison spécifiée');
    
    if (user) {
        try {
            await message.guild.member(user).ban({ days: days, reason: reason});
            message.channel.send(`${user} a été ban pour ${days} jour!`);
            message.channel.send(`Raison : ${reason}`);
        } catch (error) {
            message.channel.send(`Something goes wrong ... ${error.message}`);
        }    
    } else {
        message.channel.send("L'utilisateur n'existe pas!");
    }

    const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor('#dc143c')
    .setDescription(`**Action** : ban\n**Raison** : ${reason}\n**Nbr de jours** : ${days}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.find(channel => channel.name === 'bot_log').send(embed);
}

module.exports.help = {
    aliases: ['ban'],
    args: true,
    cooldown: 10,
    description: 'Ban un utilisateur',
    isUserAdmin: false,
    name: 'ban',
    permissions: false,
    usage: '<@user> <n_days> <votre_message>'
}