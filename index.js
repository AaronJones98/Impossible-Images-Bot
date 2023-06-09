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

var image = '';
var description = '';
var channel_name = '';
client.on('messageCreate', (message) => {

    message.channel.messages.fetch({ limit: 3 }).then().then(function(recent_messages){
        var previous_message = recent_messages.at(1);

        if(previous_message.content.startsWith('Describe the image') && message.channel.id == previous_message.channel.id){

            description = message.content;
            channel_name = message.channel.name;

            //Run the upload
            message.reply("Image is currently being uploaded to impossibleimages.ai | Please wait for confirmation.")
    
            fetch('https://impossibleimages.ai/wp-json/impossibleimages/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `image=${recent_messages.at(2).content.split('-ii ')[1]}&description=${description}&channel=${channel_name}&token=${process.env.TOKEN}`
            }).then(function(response) {
                // Do nothing
            }).then(function(data) {
                message.reply('Image has been successfully uploaded. Please confirm it can be seen here: https://impossibleimages.ai/images/');
            }).catch(function(err) {
                message.reply('There was an error uploading your image');
            });

        }
    })

    var prompt = message.content;

    if(prompt.startsWith("-ii")){

        if(process.env.MAINTENANCE){

            message.reply("The api is currently under maintenance. Please wait until it is back up and running.")

        }else{

            image = prompt.split('-ii ')[1]
            
            if(! prompt.includes('http')){

                //If user doesn't insert an image
                message.reply("Missing the image url. Please try again")

            }else{

                if(image.includes('.jpg') || image.includes('.png') || image.includes('.gif')){

                    message.reply("Describe the image. Just respond to this message.");

                }

            }
        
        }

    }
})

client.login(process.env.TOKEN)