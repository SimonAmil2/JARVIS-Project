module.exports = (client, prefix,kayn) => {
    client.on("message",  message => {
        const cmdsNargs = message.content.substring(prefix.length).split(" ");
        const [, ...cmdOut] = cmdsNargs;

        if(cmdsNargs[0] === 'summonerInfo') {
            kayn.Summoner.by.name('heXotik')
                .then(response => console.log(response))

        }

        
    }) 
}