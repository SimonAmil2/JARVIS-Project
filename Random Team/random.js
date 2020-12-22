module.exports = (client, prefix, firstUser, duoUser, firstMember, duoMember, duoChannels, numberOfFlexChannels) => {


    client.on('message', (message) => {
        if (message.author.bot) 
            console.log('testBot');
        else {
            message.mentions.users.each(u => duoUser = u)
            console.log(duoUser)
            duoMember = message.guild.member(duoUser);
            console.log(duoMember)
        }

        if(message.toString().substring(0,prefix.length) != prefix) {
            return;
        }

        const realMessage = message.toString().split(prefix).pop();
        if (realMessage === 'random') {
            var userVoiceChannel = message.member.voice.channel;
            if(userVoiceChannel) {
                var players = userVoiceChannel.members;
                var playersName = players.map(m => m.user.username);

                //var players = ['Test', 'Hey', 'Bla', 'Split'];
                //console.log(players);
                
                for (let i = playersName.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [playersName[i], playersName[j]] = [playersName[j], playersName[i]];
                }
                
                var teams = chunkArray(playersName,2)
                console.log(`Team A : [${teams[0]}]`)
                console.log(`Team B : [${teams[1]}]`)

                message.channel.send(`Team A : [${teams[0]}]`);
                message.channel.send(`Team B : [${teams[1]}]`);


            }

            else {
                message.channel.send('Tu dois être dans un channel vocal pour avoir accès à cette commande');
                return;
            }
        }

        /*if (realMessage === 'test') {
            message.guild.channels.cache.get('')
            return;
        }*/

        const cmdsNargs = message.content.substring(prefix.length).split(" ");
        const [, ...cmdOut] = cmdsNargs;


        if (cmdsNargs[0] === 'duo') {
            if(cmdOut.length != 1) {
                message.channel.send('Il te faut un seul et unique argument pour cette commande. Pas plus, pas moins')
            }

            else {
                firstUser = message.author;
                firstMember = message.guild.member(firstUser);
                console.log(firstMember)
                message.channel.send(`Veux-tu duoQ ${duoUser} ?`)
                
            }
            console.log(cmdsNargs)
            console.log(cmdOut[0])
        }
        
        
        if (realMessage === 'randomTest') {
            var userVoiceChannel = message.member.voice.channel;
            if(userVoiceChannel) {
                var players = userVoiceChannel.members;
                var playersName = players.map(m => m.user.username);
                var playersArray = players.map(m => m);

                //var players = ['Test', 'Hey', 'Bla', 'Split'];
                //console.log(players);
                
                for (let i = playersArray.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [playersArray[i], playersArray[j]] = [playersArray[j], playersArray[i]];
                }
                
                var teams = chunkArray(playersArray,2)

                var teamA = teams[0];
                var teamB = teams[1];

                console.log(`Team A : [${teamA}]`)
                console.log(`Team B : [${teamB}]`)

                message.channel.send(`Team A : [${teamA}]`);
                message.channel.send(`Team B : [${teamB}]`);

                if(message.guild.channels)
                
                message.guild.channels
                    .create('A Team', {
                    type: 'voice',
                    })
                    .then((channel) => {
                    const categoryId = '790291924032290856'
                    channel.setParent(categoryId)
                    channel.setUserLimit(5)
                    for (let i = 0; i < teamA.length; i++) {
                        console.log(teamA[i])
                        teamA[i].voice.setChannel(channel)
                    }   
                    })

                message.guild.channels
                    .create('B Team', {
                    type: 'voice',
                    })
                    .then((channel) => {
                    const categoryId = '790291924032290856'
                    channel.setParent(categoryId)
                    channel.setUserLimit(5)
                    for (let i = 0; i < teamB.length; i++) {
                        console.log(teamA[i])
                        teamB[i].voice.setChannel(channel)
                    } 
                    })
                
                    
                //players.each(m => m.voice.setChannel('754424275708149861'))
                
            }
        }

        else {
            return;
        }
    });

    const testC = 'DuoQ';
    
    client.on('messageReactionAdd', (reaction, user) => {
        if(user === duoUser && reaction.message.mentions.has(duoUser))  {
            
                reaction.message.guild.channels
                    .create(`${testC}${duoChannels.length + 1}`, {
                    type: 'voice',
                    })
                    .then((channel) => {
                        const categoryId = '790712985592397864'
                        duoChannels.push(channel)
                        channel.setParent(categoryId)
                        channel.setUserLimit(2)
                        //reaction.message.delete({ timeout: 5000 })
                        reaction.message.channel.send(`Ok je vous déplace, toi et ${firstUser} dans le channel ${channel} dans 3 secondes`)
                            /*.then(message => message.delete({ timeout: 5000 }))
                            .catch(console.error);*/
                        setTimeout(function(){
                            firstMember.voice.setChannel(channel)
                            if(!(duoUser === firstUser)) {
                                console.log('here')
                                duoMember.voice.setChannel(channel)
                            }
                        }, 3000);
                    })   
        }
        else {
            if(reaction.message.mentions.has(duoUser))
                reaction.message.channel.send('Kan mi koz ek saucisse, boucané rest pendillé.');
            else
                return;
        }
    });
   

    function chunkArray(arr,n){
        var chunkLength = Math.max(arr.length/n ,1);
        var chunks = [];
        for (var i = 0; i < n; i++) {
            if(chunkLength*(i+1)<=arr.length)chunks.push(arr.slice(chunkLength*i, chunkLength*(i+1)));
        }
        return chunks; 
    }
}