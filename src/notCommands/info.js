module.exports = (client, client2, notifier, msg)=>{
    const fs = require('fs');

    const save = JSON.parse(fs.readFileSync(`${__dirname}/../save.json`));

    msg.channel.send({
        embed:{
            color: 0x00FF00,
            title: "Info-Terminal",
            desciption: "the Info terminal for The Assistent",
            thumbnail:{
                url: notifier.user.avatarURL,
            },
            fields:[
                {
                    name: "managed accounts:",
                    value: "1: "+ client.user.username+ "\n"+ "2: "+ client2.user.username,
                },{
                    name: "Afk-Status",
                    value: afkstatus(),
                },{
                    name: "Status-info",
                    value: "1: "+ client.user.presence.status+ "\n"+ "2: "+ client2.user.presence.status,
                },{
                    name: "Current activity (buggy)",
                    value: ""+ gameactivity(),
                }
            ],
            footer:{
                text: "runtime: "+ uptime(),
            }
        }
    });

    function afkstatus(){
        if(save.afk){
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
}