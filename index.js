const Discord = require('discord.js');
const bot = new Discord.Client();
const tokens = require("./tokens.json");
const roles = require("./roles.json");

bot.on('ready', () =>{
    console.log(`${bot.user.username} is online!`);
});

bot.on('message', (msg) => {
    
    // Using a switch/case method to make the code way cleaner and easier to read
    switch (msg.content.toLowerCase()) {
        case "/hello": {
            msg.reply('Hello Friend');
        }
        case "/ping": {
            msg.reply('Pong!');
        }
        case "/commands": {
            let username = msg.author.username;
            let embed = new Discord.RichEmbed()
                .addField("/hello", `The bot will respond with hello @${username}`)
                .setTitle("Commands")
                .addField("/ping", `The bot will respond with @${username} pong!`)
                .addField("/commands" , `The bot will respond with @${username} an embed list of commands`)
                .setColor(0x0712e8)
                .setThumbnail("https://cdn.discordapp.com/attachments/333438353620074496/661101268483440650/image0.jpg")
                .setImage("https://cdn.discordapp.com/attachments/307715783146995713/661102080328466466/image0.png");
            msg.reply(embed);
        }
    }
});

bot.on("guildMemberAdd", (member) => {
    // Automatically adds the 'Members' role to newly-joined members; will log an error to console if one is caught
    member.addRole(roles.members_RoleID).catch(console.error);
});

bot.login(tokens.bot_token);
