module.exports = (client, client2, notifier, msg, cl) => {
    if(msg.author.id != client.user.id && msg.author.id != client2.user.id && msg.author.id != notifier.user.id){
        if(msg.channel.type == "dm"){
            if(/*CHECK IF USER ALLERADY GET AN ABSENT MESSAGE*/){
                msg.channel.send("Ich bin aktuell nicht erreichbar, werde mich aber Schnellstmöglich bei dir melden!");

                if(cl == "1"){
                    //Pc Angeschrieben
                    notifier.users.get(client.user.id).send({embed: {color: 0xffad15, fields: [{name: "DC Assistent", value: "New Message From: "+ msg.author.username}], timestamp: new Date(), footer: {text: msg.author.id}}}).then(msg=>{
                        msg.react('✅');
                    });
                    notifier.users.get(client2.user.id).send({embed: {color: 0x0bdb43, thumbnail:{url: msg.author.avatarURL}, fields: [{name: `New Message To ${client.user.username}`, value: `From: <@${msg.author.id}>`},{name: "Content:", value: msg.content}], timestamp: new Date(), footer: {text: msg.author.id}}}).then(msg=>{
                        msg.react('✅');
                        msg.react('↪️');
                    });
                }
                else if(cl == "2"){
                    //Handy Angeschrieben
                    notifier.users.get(client2.user.id).send({embed: {color: 0xffad15, fields: [{name: "DC Assistent", value: "New Message From: "+ msg.author.username}], timestamp: new Date(), footer: {text: msg.author.id}}}).then(msg=>{
                        msg.react('✅');
                    });
                }
            }
        }
    }
}