module.exports = (client, client2, notifier) => {
    const fs = require('fs');

    const save = JSON.parse(fs.readFileSync(`${__dirname}/../save.json`, "utf-8"));

    client.user.setActivity(save.activity1);
    client2.user.setActivity(save.activity2);   
}