import Discord from 'discord.js'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
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

            fetch(`https://impossibleimages.co.uk/wp-json/impossibleimages/upload?image=${image}`).then(function (response) {
                message.reply("Successful request");
            }).then(function (data) {
                message.reply("Image has been uploaded");
            }).catch(function (err) {
                message.reply("There was an error");
            });

        }

    }
})

client.login(process.env.TOKEN)