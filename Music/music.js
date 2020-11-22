module.exports = (client, prefix) => {
    let membersBT = []
    client.on("message", message => {
        const allMessage = message.content.split(" ")
        const prefixAll = allMessage[0].substring(0,1)
        const args = message.content.substring(prefix.length).split(" ");
        const musicRole = client.guilds.cache.get('326438580706607106').roles.cache.get('774640219874000917')
        const blindTestRole = client.guilds.cache.get('326438580706607106').roles.cache.get('779742459030536222');
        const [, ...cmdOut] = args;
        if (message.channel.id == '779742618175275068') {
            switch(args[0]) {
                case 'restart':
                    for (let index = 0; index < membersBT.length; index++) {
                        const element = membersBT[index];
                        client.guilds.cache.get('326438580706607106').members.cache.get(element).roles.add('779742459030536222')
                    }
                case 'start':
                    console.log(musicRole.permissions)
                    musicRole.setPermissions(["ADMINISTRATOR"])
                    .then(updated => console.log("Updated permissions to " + updated.permissions.bitfield))
                    .catch(console.error);
                    console.log(membersBT)
                    for (let index = 0; index < membersBT.length; index++) {
                        const element = membersBT[index];
                        client.guilds.cache.get('326438580706607106').members.cache.get(element).roles.add('779742459030536222')
                    }
                    break
                case 'stop':
                    console.log(musicRole.permissions)
                    musicRole.setPermissions(0)
                    .then(updated => console.log("Updated permissions to " + updated.permissions.bitfield))
                    .catch(console.error);
                    for (let index = 0; index < membersBT.length; index++) {
                        const element = membersBT[index];
                        client.guilds.cache.get('326438580706607106').members.cache.get(element).roles.remove('779742459030536222')
                    }
                    membersBT = []
                    break
                case 'add':
                    if(cmdOut.length < 1)
                        message.channel.send('Renseignez les ids d\'users que vous voulez ajouter au blind test')
                    else
                        for (let index = 0; index < cmdOut.length; index++) {
                            const element = cmdOut[index];
                            client.guilds.cache.get('326438580706607106').members.cache.get(element).roles.add('779742459030536222')
                        }        
                    break
                case 'remove':
                    if(cmdOut.length < 1)
                        message.channel.send('Renseignez les ids d\'users que vous voulez supprimer au blind test')
                    else
                        for (let index = 0; index < cmdOut.length; index++) {
                            const element = cmdOut[index];
                            client.guilds.cache.get('326438580706607106').members.cache.get(element).roles.remove('779742459030536222')
                        } 
            }
        }
        if ((message.channel.id == '749393762735620287') && (message.content == 'moi') && !membersBT.includes(message.author.id)) {
            membersBT.push(message.author.id)
            console.log(membersBT)
        }
        /* if(allMessage[0].substring(0,1) == "!")
            message.channel.send(`Mauvais prefix : utilise plutôt ce prefix là : ${prefix}`)
        if (message.channel.id == '779742618175275068') {
            
            switch (args[0]){
                case 'add':
                    console.log('in')
                    if(args.length <= 1)
                        return;
                    else
                        args.each(
                            a => client.guilds.cache.get('326438580706607106')
                                    .members.cache.get(a)
                                    .addRole('779742459030536222')
                        );
            }
            //message.channel.lastMessage.delete();            
        }

        else
            //const allMessage = message.content.split(" ")
            if(allMessage[0].substring(0,1) == "!")
                console.log('Coucou')
         */
    }) 
}