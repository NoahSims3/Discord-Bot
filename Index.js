const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NjUwODQ4MDIzMDE4MjA5MzIw.XglZ5w.TcrncLmh-nB8vrR-CSxWG6zzV74';


bot.on('ready', () =>{
    console.log('This bot is online!');
})
bot.on('message', msg =>{
    if(msg.content.toLowerCase() == "/hello"){
        msg.reply('Hello Friend');

    }
    if(msg.content.toLowerCase() == "/ping"){
        msg.reply('Pong!')
    }
    let username = msg.author.username
    if(msg.content.toLowerCase() == "/commands") {
        let embed = new Discord.RichEmbed()
            .addField("/hello", "The bot will respond with hello @" + username)
            .setTitle("Commands")
            .addField("/ping", "The bot will respond with @" + username + " pong!")
            .addField("/commands" , "The bot will respond with @" + username + " a embed list of commands")
            .setColor(0x0712e8)
            .setThumbnail("https://cdn.discordapp.com/attachments/333438353620074496/661101268483440650/image0.jpg")
            .setImage("https://cdn.discordapp.com/attachments/307715783146995713/661102080328466466/image0.png");
        msg.reply(embed);
    }
})

bot.login(token);