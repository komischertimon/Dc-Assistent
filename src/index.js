const Discord = require('discord.js');
const fs = require("fs");
const { dirname } = require('path');

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));
const package = JSON.parse(fs.readFileSync(`${__dirname}/package.json`,'utf-8'));

const comAlliasses = JSON.parse(fs.readFileSync(`${__dirname}/shortcuts.json`, "utf-8"));
/*
var presenceToken = '633756594387025977';
const rpc = require('discord-rich-presence')(presenceToken);
*/
var client = new Discord.Client(),
    client2 = new Discord.Client(),
    notifier = new Discord.Client({"partials": ['CHANNEL','REACTION', 'MESSAGE']}),
    msguserlistcl1 = new Array(),
    msguserlistcl2 = new Array(),
    save = new Array(),
    afktrue = Boolean,
    reply;


//Startvorgang
console.log('loading...');

client.on('ready', ()=>{  
    console.log('--------------------------');
    console.log('Software is startet successfully!');
    console.log(`Logged in as : ${client.user.username} (Client)`); 
    console.log('--------------------------');
    console.log("");
    client.user.setActivity('Manager Active!', {type: "PLAYING"});

    let run = require(`${__dirname}/automatic/celBump.js`);
    run(client);
});
client2.on('ready', ()=>{  
    console.log('--------------------------');
    console.log('Software is startet successfully!');
    console.log(`Logged in as : ${client2.user.username} (Client2)`); 
    console.log('--------------------------');
    console.log("");
    client2.user.setActivity('Manager Active!', {type: "PLAYING"});
});
notifier.on('ready', ()=>{
    console.log('--------------------------');
    console.log('Software is startet successfully!');
    console.log(`Logged in as : ${notifier.user.username} (managing Bot)`); 
    console.log('--------------------------');

    notifier.user.setActivity('Notifications', {type: "WATCHING"});
    let setup = require(`${__dirname}/automatic/setup.js`);
    setTimeout(setup, 8000, client, client2, notifier);
});

client.on('voiceStateUpdate', (oldMember, newMember)=>{    
    if(oldMember.id == client.user.id || oldMember.id == client2.user.id){
        let run = require(`${__dirname}/automatic/voiceCallActivity.js`);
        run(oldMember, newMember);
    }
});

client.on('message', (msg)=>{
    if(afktrue == true){
        let awhas = require(`${__dirname}/automatic/absenceAssistants.js`);
        awhas(client, client2, notifier, msg, "1");
    }
});
client2.on('message', (msg)=>{
    if(afktrue == true){
        let awhas = require(`${__dirname}/automatic/absenceAssistants.js`);
        awhas(msg, "2");
    }
});
notifier.on('message', async (msg)=>{
    var content = msg.content.split(' ');

    if(msg.channel.id == config.confchannel){
        if(content[0].startsWith(config.prefix)){
            content[0] = content[0].substr(config.prefixlengh);
            
            if(comAlliasses[content[0]]){content[0] = comAlliasses[content[0]]}

            try{
                let command = require(`${__dirname}/notCommands/${content[0]}.js`);
                command(client, client2, notifier, msg, content);
            }catch(err){
                console.log(err);
            }
        }else{
            if(comAlliasses[content[0]]){content[0] = comAlliasses[content[0]]}

            try{
                let command = require(`${__dirname}/commands/${content[0]}.js`);
                command(client, client2, notifier, msg, content);
            }catch(err){
                console.log(err);
            }
        }
    }

    if(msg.channel.type == "dm" && reply){
        if(msg.author.id == client.user.id || msg.author.id == client2.user.id){
            client.users.get(reply).send(msg.content);
            reply = false;
        }
    }
});

notifier.on('messageReactionAdd', (reaction, user)=>{
    let run = require(`${__dirname}/automatic/msgNotReactHandle.js`);
    run(reaction, user);
});


function uploadSave(){
    var log = notifier.channels.get(config.logchannel);

    if(save[0] == null){
        save[0] = 0;
    }
    if(save[1] == null){
        save[1] = 0;
    }
    if(save[2] == null){
        save[2] = 0;
    }


    log.send(save).catch(console.error);
    console.log(save+ " Uploaded!");
}



//client Logins
try{
    client.login(config.token)
    client2.login(config.token2)
    notifier.login(config.tokennotifier)
}catch(err){
    console.log(err);
    if(err.code == 'EAI_AGAIN' || err.code == 'ETIMEDOUT' || err.code == 'ERR_UNHANDLED_ERROR'){
        console.log(`------------------------\n>CONNECTION ERROR DETECTED<\n------------------------`);
        setTimeout(function(){
            destroyAll();
            client.login(config.token)
            client2.login(config.token2)
            notifier.login(config.tokennotifier)
        }, 30000);
    }else{
        console.log(err);
    }
}
//weird error handle
function destroyAll(){
    try{
        client.destroy();
    }catch(e){};
    try{
        client2.destroy();
    }catch(e){};
    try{
        notifier.destroy();
    }catch(e){};
}