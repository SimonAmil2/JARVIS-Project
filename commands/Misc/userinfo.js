module.exports.run = (client, message, args) => {
    const user_mention = message.mentions.users.first();
    if (user_mention) {
        message.channel.send(`Voici le tag de la personne mentionnée : ${user_mention.id}`);
    } else {
        message.channel.send('User not found !')
    }
}

module.exports.help = {
    aliases: ['getinfo', 'uinfo'],
    args: true,
    cooldown: 10,
    description: "Retourne les informations d'un utilisateur mentionné",
    isUserAdmin: false,
    name: 'userinfo',
    permissions: false,
    usage: '<username>'
}