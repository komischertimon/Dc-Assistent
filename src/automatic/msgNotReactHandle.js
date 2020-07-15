module.exports = (reaction, user) => {
    if(user.id == client.user.id || user.id == client2.user.id){
        if(reaction.message.channel.type == "dm" && reaction.count == "2"){
            if(reaction.emoji.name == "✅"){
                reaction.message.delete().catch(console.error);
            }
            else if(reaction.emoji.name == "↪️"){
                reply = reaction.message.embeds[0].footer.text;
            }
        }
    }
}