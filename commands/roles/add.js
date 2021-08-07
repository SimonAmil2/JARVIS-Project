module.exports.run = (client, message, args) => {
    // Get role
    let roleName = args.join(' ');  // Fix role with space
    let role = message.guild.roles.cache.find(role => role.name === roleName);

    if (role) {
        if (message.member.roles.cache.has(role.id)) {
            return message.channel.send(`Vous avez déjà le rôle ${role.name} ! Essayez de nouveau ...`);
        }
        if (role.permissions.has('KICK_MEMBERS', 'BAN_MEMBERS')) {
            return message.channel.send('Vous ne disposez pas des droits nécessaires !');
        }

        message.member.roles.add(role)
            .then(user => message.channel.send(`Vous possédez maintenant le rôle ${role} ${user}`))
            .catch(err => console.log(err));
    } else {
        message.channel.send("Le rôle n'existe pas!");
    }
}


module.exports.help = {
    aliases: ['add'],
    args: true,
    cooldown: 10,
    description: 'Ajouter un rôle',
    isUserAdmin: false,
    name: 'add',
    permissions: false,
    usage: '<role>'
}