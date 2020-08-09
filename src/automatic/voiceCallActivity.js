module.exports = (oldMember, newMember)=>{
    const fs = require('fs');
    const save = JSON.parse(fs.readFileSync(`${__dirname}/../save.json`, "utf-8"));

    if(oldMember.voiceChannel == undefined && newMember.voiceChannel != undefined){
        // User Joins a voice channel
        if(newMember.id == client.user.id){
            client.user.setActivity("In Voice call");
            save.activity1 = "In Voice Call";
        }
        else if(newMember.id == client2.user.id){
            client2.user.setActivity("In Voice call");
            save.activity2 = "In Voice Call";
        }
    }
    else if(newMember.voiceChannel == undefined && oldMember.voiceChannel != undefined){
        // User leaves a voice channel
        if(newMember.id == client.user.id){
            client.user.setActivity(null);
            save.activity1 = null;
        }
        else if(newMember.id == client2.user.id){
            client2.user.setActivity(null);
            save.activity2 = null;
        }
    }

    fs.writeFileSync(`${__dirname}/../save.json`, JSON.stringify(save));
}