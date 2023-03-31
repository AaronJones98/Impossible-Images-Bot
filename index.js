const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const axios = require('axios');

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

client.on('messageCreate', (message) => {

    var prompt = message.content;

    if(prompt.startsWith("--ii")){

        var image = prompt.split('--ii ')[1]
        
        if(! prompt.includes('http')){

            //If user doesn't insert an image
            message.reply("Missing the image url. Please try again")

        }else{
    
            //Run the upload
            message.reply("Image is currently being uploaded to impossibleimages.co.uk. Please wait for confirmation.")

            axios.get(`https://impossibleimages.co.uk/wp-json/impossibleimages/upload?image${image}&token=${process.env.TOKEN}`)
              .then(function (response) {
                message.reply('Image has been successfully uploaded. Please confirm it can be seen on the site frontend.');
              })
              .catch(function (error) {
                message.reply("There was an error uploading your image");
              });

        }

    }
})

client.login(process.env.TOKEN)