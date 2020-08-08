module.exports = (client, client2, notifier, msg, content) => {
    var stor = {
        salutations: new Array("hi", "hallo", "servus", "moin", "guten tag"),
        goodbyes: new Array("tschüss", "bye", "tschö")
    };

    if(stor.salutations.includes(msg.content)){
        msg.channel.send(`Moin <@${msg.author.id}>`);
    }
    else if(stor.goodbyes.includes(msg.content)){
        msg.channel.send(`hau rein <@${msg.author.id}>`);
    }
}