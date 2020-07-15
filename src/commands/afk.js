module.exports = (client, client2, notifier, msg, content) => {
    content.splice(0, 1);

    if(content[0] == "on"){
        afktrue = true;
    }
    else if(content[0] == "off"){
        afktrue = false;
    }
}