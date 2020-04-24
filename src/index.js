const Discord = require('discord.js');
const fs = require("fs");

const config = JSON.parse(fs.readFileSync('config.json','utf-8'));
const package = JSON.parse(fs.readFileSync('package.json','utf-8'));

var client = new Discord.Client(),
    client2 = new Discord.Client(),
    notifier = new Discord.Client(),
    msguserlistcl1 = new Array(),
    msguserlistcl2 = new Array(),
    save = new Array(),
    afktrue,
    afktruem,
    botmsgid,
    truefalse;


//Startvorgang
console.log('loading...');

client.on('ready', ()=>{  
    console.log('--------------------------');
    console.log('Software is startet successfully!');
    console.log(`Logged in as : ${client.user.username}`); 
    console.log('--------------------------');
    console.log("");
//    client.user.setStatus('online');
    client.user.setActivity('Manager Active!', {type: "PLAYING"});
});
client2.on('ready', ()=>{  
    console.log('--------------------------');
    console.log('Software is startet successfully!');
    console.log(`Logged in as : ${client2.user.username}`); 
    console.log('--------------------------');
    console.log("");
//    client.user.setStatus('online');
    client2.user.setActivity('Manager Active!', {type: "PLAYING"});
    setTimeout(myf, 5000);
});
notifier.on('ready', ()=>{
    console.log('--------------------------');
    console.log('Software is startet successfully!');
    console.log(`Logged in as : ${notifier.user.username}`); 
    console.log('--------------------------');

    notifier.user.setActivity('Notifications', {type: "WATCHING"});
    setTimeout(setup, 10000);
});

client.on('voiceStateUpdate', (oldMember, newMember)=>{
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
  
    if(oldUserChannel == undefined && newUserChannel != undefined) {
        // User Joins a voice channel
        if(newMember == `<@!${client.user.id}>`){
            console.log(`${client.user.username} Joined Channel`);
            client.user.setActivity("In Voice call");
            save[0] = "In Voice call";
            uploadSave();
        }
        else if(newMember == `<@${client2.user.id}>`){
            console.log(`${client2.user.username} Joined Channel`);
            client2.user.setActivity("In Voice call");
            save[1] = "In Voice call";
            uploadSave();
        }
    } else if(newUserChannel == undefined && oldUserChannel != undefined){
        // User leaves a voice channel
        if(newMember == `<@!${config.owner}>`){
            console.log(`${client.user.username} Lefted Channel`);
            client.user.setActivity(null);
            save[0] = null;
            uploadSave();
        }
        else if(newMember == `<@${config.mobile}>`){
            console.log(`${client2.user.username} Lefted Channel`);
            client2.user.setActivity(null);
            save[1] = null;
            uploadSave();
        }
    }
});

client.on('message', (msg)=>{
    if(afktrue == true || afktruem == true){
        var cl = "1";
        awhas(msg, cl);
    }
    //aktuell bedeutungslos
    if(msg.content.startsWith("s ")){
        msgonma(msg);
    }else if(msg.content.startsWith("sm ")){
        msgonmo(msg);
    }else{
        msgon(msg);
    }
});
client2.on('message', (msg)=>{
    if(afktrue == true || afktruem == true){
        var cl = "2";
        awhas(msg, cl);
    }
});
notifier.on('message', (msg)=>{
    console.log(msg.channel.type);
    if(msg.content.startsWith(config.prefix)){
        botmsg(msg);
    }
    if(msg.author.id == notifier.user.id && msg.content[0] == undefined && msg.channel.type == "dm"){
        msg.react('✅').catch(console.error);
        botmsgid = msg.id;
        save[2] = botmsgid;
        uploadSave();
    }
});

notifier.on('messageReactionAdd', (reaction, user)=>{
    if(user.id == client.user.id || user.id == client2.user.id && reaction.message.channel.type == "dm" && reaction.count == "2"){
        console.log("user react!");
        reaction.message.delete().catch(console.error);
    }    
});


function myf(){
    console.log("Reset Status of both!");
    client.user.setActivity(null);
    client2.user.setActivity(null);
}

function msgon(msg){
    if(msg.channel.id == config.confchannel){
        console.log("");
        var uncutcontent = msg.content,
            content = uncutcontent.split(' ').slice(1);
        console.log(msg.author.username+": "+ content);

        if(uncutcontent.startsWith("ac")){
            console.log("Set-Activity Triggered!");
            if(content == "reset"){
                console.log("Activity Reset!");
                var codwhile = false;
                afktrue = false;
                save[3] = false;
                client.user.setActivity(null);
                save[0] = null;
                client2.user.setActivity(null);
                save[1] = null;
                uploadSave(codwhile);
            }
            else if(content == "schlafen"){
                console.log("Activity Sleep!");
                afktrue = true;
                save[3] = true;
                msguserlistcl2 = [], msguserlistcl1 = [];
                client.user.setActivity("asleep");
                save[0] = "asleep";
                client2.user.setActivity("asleep");
                save[1] = "asleep";
                uploadSave();
            }
            else if(content == "afh"){
                console.log("Acitivity AFH!");
                afktrue = true;
                save[3] = true;
                msguserlistcl2 = [], msguserlistcl1 = [];
                client.user.setActivity("away from home");
                save[0] = "away from home";
                client2.user.setActivity("away from home");
                save[1] = "away from home";
                uploadSave();
            }
            else if(content == "weg"){
                console.log("Acitivity absent!");
                afktrue = true;
                save[3] = true;
                msguserlistcl2 = [], msguserlistcl1 = [];
                client.user.setActivity("absent");
                save[0] = "absent";
                client2.user.setActivity("absent");
                save[1] = "absent";
                uploadSave();
            }
            else if(content == "essen"){
                console.log("Activity Food!");
                afktrue = true;
                save[3] = true;
                msguserlistcl2 = [], msguserlistcl1 = [];
                client.user.setActivity("i´m eating");
                save[0] = "i´m eating";
                client2.user.setActivity("i´m eating");
                save[1] = "i´m eating";
                uploadSave();
            }
            else if(content == "netflix"){
                console.log("Activity Netflix!");
                afktrue = false;
                save[3] = false;
                client.user.setActivity('Netflix', {type: 'WATCHING'});
                save[0] = 'Netflix', {type: 'WATCHING'};
                client2.user.setActivity('Netflix', {type: 'WATCHING'});
                save[1] = 'Netflix', {type: 'WATCHING'};
                uploadSave();
            }
			  else if(content == "youtube"){
                console.log("Activity Youtube!");
                afktrue = false;
                save[3] = false;
                client.user.setActivity('Youtube', {type: 'WATCHING'});
                save[0] = 'Youtube', {type: 'WATCHING'};
                client2.user.setActivity('Youtube', {type: 'WATCHING'});
                save[1] = 'Youtube', {type: 'WATCHING'};
                uploadSave();
            }
			else if(content == "coding"){
                var codwhile = true;
				codingwhile0(codwhile);
			}
            else if(content == "st"){
                console.log("Status Reset!");
                afktrue = false;
                client.user.setActivity(content);
                client2.user.setActivity(content);
            }else{
                console.log("Activity Individuell!");
                var cleancontent;
                if(content[0] == "afk"){
                    afktrue = true;
                    save[3] = true;
                    msguserlistcl2 = [], msguserlistcl1 = [];
                    cleancontent = content.slice(1).toString(" ").replace(/,/g, " ");
                    client.user.setActivity(cleancontent);
                    save[0] = cleancontent;
                    client2.user.setActivity(cleancontent);
                    save[1] = cleancontent;
                }else{
                    afktrue = false;
                    save[3] = false;
                    cleancontent = content.toString(" ").replace(/,/g, " ");
                    client.user.setActivity(cleancontent);
                    save[0] = cleancontent;
                    client2.user.setActivity(cleancontent);
                    save[1] = cleancontent;
                }
                uploadSave();
            }
        }
        else if(uncutcontent.startsWith("st")){
            console.log("Set-Status Triggered!");

            if(content = "reset")
                console.log("Status Reset!");
                client.user.setActivity(content);
                client2.user.setActivity(content);
        }
        else if(uncutcontent.startsWith("test")){
            msg.channel.send("None Test Active!");
        }
        else if(uncutcontent.startsWith("afk")){
            if(content == "on"){
                console.log("Afk Assistent Turn on!");
                afktruem = true;
                msguserlistcl2 = [], msguserlistcl1 = [];
                console.log(afktruem);
                save[4] = true;
            }
            else if(content == "off"){
                console.log("Afk Assistent Turn off!");
                afktruem = false;
                console.log(afktruem);
                save[4] = false;
            }
            uploadSave();
        }else{
            var chnl = notifier.channels.get(config.confchannel);
//          checkprefix(msg);
//          console.log("pref.Check: "+ checkprefix);
            if(msg.author.id != notifier.user.id && !checkprefix(msg)){
                console.log("pref.check"+ checkprefix(msg));
                chnl.send("⚠️no action taken⚠️ \n please check your entries");
            }
        }
    }
}

function awhas(msg, cl){
//    console.log("author: "+msg.author.id+ " ("+msg.author.username+")");
    //wenn true => Privatnachricht
    if(msg.channel.type == "dm"){
        if(msg.author.id != client.user.id && msg.author.id != client2.user.id && msg.author.id != notifier.user.id){
            //brauche einen check, ob der user bereits eine abwesenheitsnachricht bekommen hat!
            test(msg, cl);
            if(truefalse == undefined){
                console.log("new unread Message from: "+ msg.author.username+ "!");
                msg.channel.send("Ich bin aktuell nicht erreichbar, werde mich aber Schnellstmöglich bei dir melden!");

                if(cl == "1"){
                    //Pc Angeschrieben
                    notifier.users.get(client.user.id).send({embed: {color: 0xffad15, fields: [{name: "DC Assistent", value: "New Message From: "+ msg.author.username}], timestamp: new Date(), footer: {text: msg.author.id}}}).catch(console.error);
                    msguserlistcl1.push(msg.author.id);
                }
                else if(cl == "2"){
                    //Handy Angeschrieben
                    notifier.users.get(client2.user.id).send({embed: {color: 0xffad15, fields: [{name: "DC Assistent", value: "New Message From: "+ msg.author.username}], timestamp: new Date(), footer: {text: msg.author.id}}}).catch(console.error);
                    msguserlistcl2.push(msg.author.id);
                }
            }//console.log(truefalse);
        }
    }
}

function test(msg, cl){
    if(cl == "1"){
        truefalse = msguserlistcl1.find(function(element){
            return element == msg.author.id;
        });
    }
    else if(cl == "2"){
        truefalse = msguserlistcl2.find(function(element){
            return element == msg.author.id;
        }); 
    }
}

function botmsg(msg){
    var content = msg.content.substr(config.prefixlengh);
        //removed Owner Property

    if(msg.channel.id == config.confchannel){
        if(content.startsWith("help")){
            let commanfile = require('./help.js');
            commanfile.run(client, client2, notifier, msg);
        }
        else if(content.startsWith("info")){
            msg.channel.send({embed:{color: 0x00FF00,title: "Info-Terminal",desciption: "the Info terminal for The Assistent",thumbnail:{url: 'https://i.imgur.com/yac473o.png',}, fields:[{name: "managed accounts:", value: "1: "+ client.user.username+ "\n"+ "2: "+ client2.user.username,},{name: "Afk-Status", value: afkstatus(),},{name: "Status-info", value: "1: "+ client.user.presence.status+ "\n"+ "2: "+ client2.user.presence.status,},{name: "Current activity (buggy)", value: ""+ gameactivity(),},], footer:{text: "runtime: "+ uptime(),},}});
        }
        else if(content.startsWith("data")){
            //main msg for client informations
            msg.channel.send({embed:{color: 0xFF00FF,title: "App-data", desciption: package.desciption, thumbnail:{url: 'https://i.imgur.com/yac473o.png',}, fields:[{name: "Name:", value: package.name},{name: "Run Script:", value: package.scripts.start},{name: "Author:", value: package.author},{name: "dependencies", value: `discord.js: ${package.dependencies[0]} \n fs: ${package.dependencies[1]} \n mysql: ${package.dependencies[2]}`}], footer:{text: `version: ${package.version}`}}});
        }
        else if(content.startsWith("assistent shutdown")){
            msg.channel.send("Shuting Down...").then(setTimeout(process.exit(), 100));
        }else{
            msg.channel.send("This Command doesn´t exist")
        }
    }
}

function checkprefix(msg){
    return (msg.content.startsWith(config.prefix));
}

function afkstatus(){
    if(afktrue == true || afktruem == true){
        return("Afk Assistent Online!");
    }else{
        return("Afk Assistent Offline!");
    }
}

function gameactivity(){
    //abfrage, ob aktivität beider gleich, sonst einzelnt. 
    if(client.user.presence.game && client2.user.presence.game){
        var mainactivity = client.user.presence.game,
        secondactivity = client2.user.presence.game;

        if(mainactivity.name == secondactivity.name){
            return("both: "+ mainactivity.name+ "\n type: "+ gametype());
        }else{
            return("1: "+ mainactivity.name+ " ("+ gametype()+ ")"+ "\n 2: "+ secondactivity.name+ " ("+ gametype()+ ")");
        }
    }
    else if(client.user.presence.game){
        var mainactivity = client.user.presence.game;
        return("1: "+ mainactivity.name+ " ("+ gametype()+ ")"+ "\n 2: --none--");
    }
    else if(client2.user.presence.game){
        var secondactivity = client2.user.presence.game;
        return("1: --none--"+ "\n 2: "+ secondactivity.name+ " ("+ gametype()+ ")");
    }else{
        return("--none--");
    }
    function gametype(){
        if(client.user.presence.game.type == "0" || client2.user.presence.game.type == "0"){
            return("PLAYING");
        }
        if(client.user.presence.game.type == "1" || client2.user.presence.game.type == "1"){
            return("LISTENING");
        }
        if(client.user.presence.game.type == "2" || client2.user.presence.game.type == "2"){
            return("STREAMING");
        }
        if(client.user.presence.game.type == "3" || client2.user.presence.game.type == "3"){
            return("WATCHING");
        }
    }

}

function uptime(){
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return(`${days} days, ${hours} hours and ${minutes} minutes`);
}

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
function setup(){
    console.log("Run Setup...\n");
    var log = notifier.channels.get(config.logchannel);

    log.fetchMessages({ limit: 1 }).then(messages => {
        let lastmessage = messages.first();
    var saves = lastmessage.content;
        saves = saves.split("\n");
        
    console.log(saves);
    if(saves[0] == 0){
        saves[0] = null;
    }
    if(saves[1] == 0){
        saves[1] = null;
    }
    if(saves[2] == 0){
        saves[2] = null;
    }

    botmsgid = saves[2];

    client.user.setActivity(saves[0]);
    client2.user.setActivity(saves[1]);
    console.log(`Activtiy set to ${saves[0]} & ${saves[1]}`);
    console.log("Setup completed!");
    });
}

function codingwhile0(codwhile){
    client.user.setActivity("Coding");
    client2.user.setActivity("Coding");
    if(codwhile){
    setTimeout(codingwhile1, 2000);
    }
}
function codingwhile1(){
    client.user.setActivity("Coding.");
    client2.user.setActivity("Coding.");
    setTimeout(codingwhile2, 3000);
}
function codingwhile2(){
    client.user.setActivity("Coding..");
    client2.user.setActivity("Coding..");
    setTimeout(codingwhile3, 3000);
}
function codingwhile3(){
    client.user.setActivity("Coding...");
    client2.user.setActivity("Coding...");
    setTimeout(codingwhile0, 3000);
}


client.login(config.token);
client2.login(config.token2);
notifier.login(config.tokennotifier);