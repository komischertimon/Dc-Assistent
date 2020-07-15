exports.run = (client, client2, notifier, msg, msg)=>{
//  const Discord = require('discord.js');
    const fs = require("fs");

    const config = JSON.parse(fs.readFileSync('./config.json','utf-8'));
    var owner = notifier.users.get(config.owner),
        content = msg.content.split(' ').slice(1);

    if(content[0] == "afk"){
        msg.channel.send({embed: 
            {
                color: 0x0099ff,
                title: "Help-Afk",
                description: "Turn on/off Afk-Assistent",
                thumbnail: {
                    url: notifier.user.avatarURL(),
                },
                fields: [{
                    name: "Syntax",
                    value: "afk on \n afk off",
                }],
                footer: {
                    text:"Owner: "+ owner.username
                }
            }
        }).catch(console.error);
    }
    else if(content[0] == "st"){
        msg.channel.send({embed: 
            {
                color: 0x0099ff,
                title: "Help-Status (Broken)",
                description: "Can Reset the Status of Client",
                thumbnail: {
                    url: notifier.user.avatarURL(),
                },
                fields: [{
                    name: "Syntax",
                    value: "st Reset",
                }],
                footer: {
                    text:"Owner: "+ owner.username
                }
            }
        }).catch(console.error);
    }
    else if(content[0] == "ac"){
        msg.channel.send({embed: 
            {
                color: 0x0099ff,
                title: "Help-Activity",
                description: "can set the Actitvity of Client",
                thumbnail: {
                    url: notifier.user.avatarURL(),
                },
                fields: [{
                    name: "Syntax",
                    value: "ready-made: \n ac 'Activity' \n \n Custom: \n ac (afk) 'Activity' \n \n reset: \n ac reset",
                },{
                    name: '\u200b',
                    value: 'Pre-builded',
                    inline: false,
                },{
                    name: "Schlafen",
                    value: "asleep (Afk true) \n type: Playing",
                    inline: true,
                },{
                    name: "afh",
                    value: "away from home (Afk true) \n type: Playing",
                    inline: true,
                },{
                    name: "weg",
                    value: "absent (Afk true) \n type: Playing",
                    inline: true,
                },{
                    name: "essen",
                    value: "i´m eating (Afk true) \n type: Playing",
                    inline: true,
                },{
                    name: "netflix",
                    value: "Netflix (Afk false) \n type: Watching",
                    inline: true,
                },{
                    name: "coding",
                    value: "Coding... (Afk false) \n type: Playing",
                    inline: true,
                }],
                footer: {
                    text:"Owner: "+ owner.username
                }
            }
        }).catch(console.error);
    }
    else if(content[0] == "info"){
        msg.channel.send({embed: 
            {
                color: 0x0099ff,
                title: "Info-Terminal",
                description: "shows informations about the assistant",
                thumbnail: {
                    url: notifier.user.avatarURL(),
                },
                fields: [{
                    name: "Syntax",
                    value: "??info",
                }],
                footer: {
                    text:"Owner: "+ owner.username
                }
            }
        }).catch(console.error);
    }
    else if(content[0] == "sd"){
        msg.channel.send({embed: 
            {
                color: 0x0099ff,
                title: "Shutdown",
                description: "⚠️Admin Command⚠️ \n Turns off the complete assistent (in process)",
                thumbnail: {
                    url: notifier.user.avatarURL(),
                },
                fields: [{
                    name: "Syntax",
                    value: "??assistent shutdown",
                }],
                footer: {
                    text:"Owner: "+ owner.username
                }
            }
        }).catch(console.error);
    }else{
        msg.channel.send({embed: 
            {
                color: 0x0099ff,
                title: "Help-List",
                description: "for more Help \n type: ??help ...",
                thumbnail: {
                    url: notifier.user.avatarURL(),
                },
                fields: [{
                    name: "Afk",
                    value: "afk",
                },{
                    name: "Status",
                    value: "st",
                },{
                    name: "Activity",
                    value: "ac",
                },{
                    name: "Info-Terminal",
                    value: "info",
                },{
                    name: "Shutdown",
                    value: "sd",
                }],
                footer: {
                    text:"Owner: "+ owner.username
                }
            }
        }).catch(console.error);
    }
}