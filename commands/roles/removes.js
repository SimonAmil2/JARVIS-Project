const { removeRole } = require("./remove");

module.exports.run = (client, message, args) => {
    let roles = message.mentions.roles;
    let mentionedMember = message.guild.member(message.mentions.users.first());

    roles.forEach(r => {
        removeRole(message,r,mentionedMember);
    });
}


module.exports.help = {
    aliases: ['removes'],
    mentionedArgs : true,
    argsSize : 2,
    description: 'Supprimer plusieurs rôles',
    args: true,
    usage: '<role1> <role2> ...',
    cooldown: 10,
    permissions: true,
    isUserAdmin: false
}