module.exports = (client, client2, notifier, msg, content) => {
    const fs = require('fs');

    const save = JSON.parse(fs.readFileSync(`${__dirname}/../save.json`, "utf-8"));
    
    content.splice(0, 1);

    if(content[0] == "on"){
        save.afk = true;
    }
    else if(content[0] == "off"){
        save.afk = false;
        save.awhUser1 = [];
        save.awhUser2 = [];
    }

    fs.writeFileSync(`${__dirname}/../save.json`, JSON.stringify(save));
}