module.exports.run = (client, message, args) => {
    let chosenChannelName = args.filter(a => a.includes('#'))[0].replace("#", "").replace("<","").replace(">","")
    
    let chosenChannel = (chosenChannelName) ? 
                                message.guild.channels.cache.filter(c => c.type === 'voice').filter(c => c.id.toLowerCase().trim().includes(chosenChannelName.toLowerCase())).first()
                                : undefined;
    console.log(chosenChannel)
    //const channel = client.channels.cache.get('id');
    if (chosenChannel) { 
        chosenChannel.join().then(connection => {
            console.log('I\'m in the ${chosenChannel} voice channel')
        });
    }
}

module.exports.help = {
    aliases: ['jc'],
    args: true,
    mentionedArgs : true,
    argsSize : 2,
    cooldown: 10,
    description: 'Déplacer le bot dans un channel vocal',
    isUserAdmin: false,
    name: 'joinchannel',
    permissions: true,
    usage: '<@user> <#channelid>'
}