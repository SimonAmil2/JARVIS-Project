module.exports = (client, prefix) => {
const allPermissions = new Permissions(flags);
    client.on("message", message => {
        console.log(message.content.split(" "))
        const allMessage = message.content.split(" ")
        const prefixAll = allMessage[0].substring(0,1)
        const args = message.content.substring(prefix.length).split(" ");
        const musicRole = client.guilds.cache.get('326438580706607106').roles.cache.get('774640219874000917')
        
        switch(args[0]) {
            case 'start':
                console.log(musicRole.permissions)
                musicRole.setPermissions(["ADMINISTRATOR"])
                .then(updated => console.log("Updated permissions to " + updated.permissions.bitfield))
                .catch(console.error);
                break
            case 'stop':
                console.log(musicRole.permissions)
                musicRole.setPermissions(0)
                .then(updated => console.log("Updated permissions to " + updated.permissions.bitfield))
                .catch(console.error);
                break
            
                
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