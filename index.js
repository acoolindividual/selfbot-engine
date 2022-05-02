console.log("Script started successfully")
var client;
const Discord = require('discord.js-selfbot');
const fs = require('fs');
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
    //random number from two numbers.
}
function repeatMsg(channel, content, timeoutRange, logging) {
    if (!channel) {
        console.log(
            'The channel can not be found. Ensure the channel ID is correct then restart the program\nCtrl+C to close.'
        );
        process.stdin.resume()
    }
    channel.send(content);
	logging && console.log("Sent \"" + content + '"')
	setTimeout(function() {
		repeatMsg(channel, content, timeoutRange, logging)
	}, randomIntFromInterval(timeoutRange[0], timeoutRange[1]) * 1000)
}

try{
if (!fs.existsSync('./config.json')) {
	console.log('ERR: Ensure that config.json is present');
	//^ensures config is present
	process.stdin.resume();
	//keeps executable window open
} else {
	let rawdata = fs.readFileSync('./config.json');
	let config = JSON.parse(rawdata);
	
	if (config.onMobile) {
		client = new Discord.Client({
			ws: { properties: { $browser: 'Discord iOS' } },
		});
	} else {
		client = new Discord.Client();
		//shitty way to go about configuring mobile, but it works fine
	}
	client.login(config.accToken);

	
	client.on('ready', () => {
		config.logging && console.log("Client ready")
		client.user.setStatus(config.presence || 'online');
		var channel = client.channels.cache.get(config.channelId);
		repeatMsg(
			channel,
			config.msgContent,
			config.intervalRange,
			config.logging
		);
	});
	
}} catch (err){
    console.log("Fatal error. ERR trace:\n"+err+"\nPress Ctrl+C to close.")
    process.stdin.resume();
}