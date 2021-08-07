module.exports.run = (client, message, args) => {
    // Get role
    let roleName = args.join(' ');  // Fix role with space
    let role = message.guild.roles.cache.find(role => role.name === roleName);

    if (role) {
        if (!message.member.roles.cache.has(role.id)) {
            return message.channel.send(`Vous ne possédez pas le rôle ${role.name} !`);
        }
        message.member.roles.remove(role)
            .then(user => message.channel.send(`Vous ne possédez plus le ${role} ${user}`))
            .catch(err => console.log(err));
    } else {
        message.channel.send("Vous ne pouvez pas enlever un rôle qui n'existe pas!");
    }
}

module.exports.help = {
    name: 'remove',
    description: 'Enlever un ou plusieurs rôle',
    args: true,
    aliases: ['rm'],
    usage: '<role>',
    cooldown: 10,
    permissions: false,
    isUserAdmin: false
}