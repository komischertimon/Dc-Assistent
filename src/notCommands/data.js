module.exports = (client, client2, notifier, msg)=>{
    const package = JSON.parse(fs.readFileSync(`${__dirname}/package.json`,'utf-8'));

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