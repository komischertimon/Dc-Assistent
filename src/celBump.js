module.exports = async(client, cron) => {
    let bumpchannel = await client.channels.get('709344698585710683');

    var j = cron.job('0 0 */2 * * *', function(){
        console.log("bump!");
        bumpchannel.send("!d bump");
    });
    j.start();
}
