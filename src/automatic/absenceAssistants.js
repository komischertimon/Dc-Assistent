module.exports = (client, client2, notifier, msg, cl) => {
    if(msg.author.id != client.user.id && msg.author.id != client2.user.id && msg.author.id != notifier.user.id){
        if(msg.channel.type == "dm"){
            if(cl == "1"){
                //Pc Angeschrieben
                if(!save.awhUser1.includes(msg.author.id)){
                    save.awhUser1.push(msg.author.id);
                    msg.channel.send(save.aAMsg);
                }

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
                if(!save.awhUser2.includes(msg.author.id)){
                    save.awhUser2.push(msg.author.id);
                    msg.channel.send(save.aAMsg);
                }

                notifier.users.get(client2.user.id).send({embed: {color: 0xffad15, fields: [{name: "DC Assistent", value: "New Message From: "+ msg.author.username}], timestamp: new Date(), footer: {text: msg.author.id}}}).then(msg=>{
                    msg.react('✅');
                });
            }
        }
    }

    fs.writeFileSync(`${__dirname}/../save.json`, JSON.stringify(save));
}