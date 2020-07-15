module.exports = (client, client2, notifier, msg, content) =>{
    const fs = require('fs');

    let pres = JSON.parse(fs.readFileSync(`${__dirname}/../preActivitys.json`, "utf-8"));

    content.splice(0, 1);

    if(pres[contnet[0]]){
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


    function setAc(items){
        afktrue = items[0];

        client.user.setActivity(content[1], {type: content[2]});
        client2.user.setActivity(content[1], {type: content[2]});
    }
}