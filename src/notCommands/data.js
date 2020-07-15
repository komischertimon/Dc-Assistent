exports.run = (client, client2, notifier, msg, msg)=>{
    msg.channel.send({
        embed:{
            color: 0xFF00FF,
            title: "App-data",
            desciption: package.desciption,
            thumbnail:{
                url: notifier.user.avatarURL,
            },
            fields:[
                {
                    name: "Name:",
                    value: package.name
                },{
                    name: "Run Script:",
                    value: package.scripts.start
                },{
                    name: "Author:",
                    value: package.author
                },{
                    name: "dependencies",
                    value: `missing Function`
                }
            ],
            footer:{
                text: `version: ${package.version}`
            }
        }
    });
}