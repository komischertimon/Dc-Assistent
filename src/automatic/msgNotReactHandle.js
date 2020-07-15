module.exports = (reaction, user) => {
    const save = JSON.parse(fs.readFileSync(`${__dirname}/save.json`, "utf-8"));

    if(user.id == client.user.id || user.id == client2.user.id){
        if(reaction.message.channel.type == "dm" && reaction.count == "2"){
            if(reaction.emoji.name == "✅"){
                reaction.message.delete().catch(console.error);
            }
            else if(reaction.emoji.name == "↪️"){
                save.reply = reaction.message.embeds[0].footer.text;
            }
        }
    }

        fs.writeFileSync(`${__dirname}/../save.json`, JSON.stringify(save));
}