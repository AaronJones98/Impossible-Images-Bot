const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "MESSAGE_CONTENT"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

var channel_name = '';
client.on('messageCreate', (message) => {

    var prompt = message.content;

    if(prompt.startsWith("-ii")){

        if(process.env.MAINTENANCE){

            message.reply("The api is currently under maintenance. Please wait until it is back up and running.")

        }else{

            channel_name = message.channel.name;

            //Run the upload
            fetch('https://impossibleimages.ai/wp-json/impossibleimages/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `image=${prompt.split('-ii ')[1]}&channel=${channel_name}&token=${process.env.TOKEN}`
            }).then(function(response) {
                // Do nothing
            }).then(function(data) {
                message.reply("The image has been queued for upload. Please wait atleast 48 hours before processing a reupload.");
            }).catch(function(err) {
                message.reply('There was an error uploading your image');
            });
        
        }

    }
})

client.login(process.env.TOKEN)