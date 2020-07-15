module.exports = (oldMember, newMember)=>{
    let save = require(`${__dirname}/uploadSave.js`);

    if(oldMember.voiceChannel == undefined && newMember.voiceChannel != undefined){
        // User Joins a voice channel
        if(newMember.id == client.user.id){
            client.user.setActivity("In Voice call");
            save[0] = "In Voice call";
        }
        else if(newMember.id == client2.user.id){
            client2.user.setActivity("In Voice call");
            save[1] = "In Voice call";
        }

        save();
    }
    else if(newMember.voiceChannel == undefined && oldMember.voiceChannel != undefined){
        // User leaves a voice channel
        if(newMember.id == client.user.id){
            client.user.setActivity(null);
            save[0] = null;
        }
        else if(newMember.id == client2.user.id){
            client2.user.setActivity(null);
            save[1] = null;
        }

        save();
    }
}