const Discord = require('discord.js');
const fs = require('fs');
const { dirname } = require('path');

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));

const comAlliasses = JSON.parse(fs.readFileSync(`${__dirname}/shortcuts.json`, "utf-8"));

var client = new Discord.Client(),
    client2 = new Discord.Client(),
    notifier = new Discord.Client({"partials": ['CHANNEL','REACTION', 'MESSAGE']});


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

notifier.on('messageReactionAdd', (reaction, user)=>{
    let run = require(`${__dirname}/automatic/msgNotReactHandle.js`);
    run(client, client2, notifier, reaction, user);
});
client.on('voiceStateUpdate', (oldMember, newMember)=>{    
    if(oldMember.id == client.user.id || oldMember.id == client2.user.id){
        let run = require(`${__dirname}/automatic/voiceCallActivity.js`);
        run(oldMember, newMember);
    }
});

client.on('message', (msg)=>{
    var save = JSON.parse(fs.readFileSync(`${__dirname}/save.json`, "utf-8"));
    if(save.afk){
        let awhas = require(`${__dirname}/automatic/absenceAssistants.js`);
        awhas(client, client2, notifier, msg, "1");
    }
});
client2.on('message', (msg)=>{
    var save = JSON.parse(fs.readFileSync(`${__dirname}/save.json`, "utf-8"));
    if(save.afk){
        let awhas = require(`${__dirname}/automatic/absenceAssistants.js`);
        awhas(client, client2, notifier, msg, "2");
    }
});
notifier.on('message', (msg)=>{
    var save = JSON.parse(fs.readFileSync(`${__dirname}/save.json`, "utf-8")),
    content = msg.content.split(' ');

    if(msg.author.id != notifier.user.id){
        if(msg.channel.id == config.confchannel){
            if(content[0].startsWith(config.prefix)){
                content[0] = content[0].substr(config.prefixlengh);
                if(comAlliasses[content[0]]){content[0] = comAlliasses[content[0]]}

                try{
                    let command = require(`${__dirname}/notCommands/${content[0]}.js`);
                    command(client, client2, notifier, msg, content);
                }catch(err){
                    if(err.code == 'MODULE_NOT_FOUND'){
                        msg.channel.send("command not found.");
                    }else{
                        console.log(err);
                    }
                }
            }else{
                if(comAlliasses[content[0]]){content[0] = comAlliasses[content[0]]}

                try{
                    let command = require(`${__dirname}/commands/${content[0]}.js`);
                    command(client, client2, notifier, msg, content);
                }catch(err){
                    if(err.code == 'MODULE_NOT_FOUND'){
                        msg.channel.send("command not found.");
                    }else{
                        console.log(err);
                    }
                }
            }
        }
    }

    if(msg.channel.type == "dm" && save.reply){
        console.log("isset");
        if(msg.author.id == client2.user.id){
            console.log("answer sent");
            client.users.get(save.reply).send(msg.content);
            save.reply = false;

            fs.writeFileSync(`${__dirname}/save.json`, JSON.stringify(save));
        }
    }
});

client.on("error", (err)=>{
    console.log(err);
});
client2.on("error", (err)=>{
    console.log(err);
});
notifier.on("error", (err)=>{
    console.log(err);
});

//client Logins
client.login(config.token);
client2.login(config.token2);
notifier.login(config.tokennotifier);