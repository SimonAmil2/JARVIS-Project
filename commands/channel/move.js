module.exports.run = (client, message, args) => {
    let mentionedUsers = message.mentions.users;
    let firstUser = mentionedUsers.first();
    let mentionedMember = message.guild.member(firstUser);

    if(mentionedUsers.size > 1) {
        message.channel.send("Cette commande déplace uniquement une personne, pour déplacer plusieurs personnes, utilise plutôt \`\`\`\$moves <@user1> <@user2> <@user3> <channelName>\`\`\`")
    }
    else {
        if (mentionedMember) {
            this.moveMember(message, mentionedMember, args)
        }
    }
}

module.exports.moveMember = (message, mentionedMember, args) => {
    let chosenChannelName = args.filter(a => !a.includes('@!'))[0]
    let chosenChannel = (chosenChannelName) ? 
                                message.guild.channels.cache.filter(c => c.type === 'voice').filter(c => c.name.toLowerCase().trim().includes(chosenChannelName.toLowerCase())).first()
                                : undefined;
    
    if (chosenChannel) {
        if(chosenChannel.id === mentionedMember.voice.channel.id) {
            message.channel.send(`${mentionedMember} est déjà dans ce channel...`);
        }

        else {
            message.channel.send(`${mentionedMember}, je te déplace dans le channel ${chosenChannel} dans 3 secondes...`);
            mentionedMember.user.send(`Je te déplace dans le channel ${chosenChannel} dans 3 secondes...`);
            setTimeout(function(){
                mentionedMember.voice.setChannel(chosenChannel);
            }, 3000);
        }
        
    }
    else {
        message.channel.send(`Tu n'as pas mentionné de channelID.`)
    }
}


module.exports.help = {
    aliases: ['mv'],
    args: true,
    mentionedArgs : true,
    argsSize : 2,
    cooldown: 10,
    description: 'Déplacer un utilisateur dans un channel',
    isUserAdmin: false,
    name: 'move',
    permissions: true,
    usage: '<@user> <channelid>'
}