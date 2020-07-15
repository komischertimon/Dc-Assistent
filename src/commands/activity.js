module.exports = async (client, client2, notifier, msg, content) =>{
    const fs = require('fs');

    const save = JSON.parse(fs.readFileSync(`${__dirname}/../save.json`, "utf-8"));
    let pres = JSON.parse(fs.readFileSync(`${__dirname}/../preActivitys.json`, "utf-8"));

    content.splice(0, 1);

    if(pres[content[0]]){
        setAc(pres[content[0]]);
    }else{
        var exp = new Array(false, null, "PLAYING");
        if(content[0] == "afk"){
            exp[0] = true;
            exp[1] = content.slice(1).join(' ');
        }else{
            exp[1] = content.join(' ');
        }

        setAc(exp);
    }

    fs.writeFileSync(`${__dirname}/../save.json`, JSON.stringify(save));


    function setAc(items){
        save.afk = items[0];
        save.activity1 = items[1];
        save.activity2 = items[1];

        client.user.setActivity(items[1], {type: items[2]});
        client2.user.setActivity(items[1], {type: items[2]});
    }
}