const { moveMember } = require("./move");

module.exports.run = (client, message, args) => {
    let mentionedUsers = message.mentions.users;

    let mentionedMembers = [];

    if(mentionedUsers) {
        mentionedMembers = mentionedUsers.map(u => message.guild.member(u))
    }

    if (mentionedMembers.length) {
        mentionedMembers.forEach(m => {
            moveMember(message, m, args)
        })
    }

}


module.exports.help = {
    aliases: ['mvs'],
    args: true,
    mentionedArgs : true,
    argsSize : 2,
    cooldown: 10,
    description: 'Déplacer un utilisateur dans un channel',
    isUserAdmin: false,
    name: 'moves',
    permissions: true,
    usage: '<@user1> <@user2> <@user3> <channelid>'
}