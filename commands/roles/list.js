module.exports.run = (client, message, args) => {
    // Lister les roles
    let roles = message.guild.roles.cache;
    message.channel.send("Voici les différents rôles sur ce serveur :");
    roles.forEach(role => {
        message.channel.send(`${role.id} : ${role.name}`);
    });
}


module.exports.help = {
    name: 'list',
    description: 'Lister les rôles sur le discord',
    args: false,
    cooldown: 10,
    permissions: true,
    isUserAdmin: false
}