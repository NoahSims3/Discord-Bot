// Copyright (c) Noah Starkey-Sims and Gavin R. Isgar 2019-2020

const Discord = require('discord.js');
const bot = new Discord.Client();
const tokens = require("./tokens.json");
const roles = require("./roles.json");
const commands = require("./commands.json");
const net = require("net");

bot.on('ready', () => {
    console.log(`${bot.user.username}\nONLINE`);
});

bot.on('message', (msg) => {
    if (msg.author.id == bot.user.id) {
        // Checks to see if the message was created by the bot itself; will ignore further command-checks
    }
    else {
        // Checks each message to see if it includes a valid command
        if (commands.valid_command_identifiers.includes(msg.content.toLowerCase())) {
            if (msg.content.toLowerCase() == "/hello") {
                msg.reply("Hello Friend");
            }
            if (msg.content.toLowerCase() == "/ping") {
                msg.reply("Pong!");
            }
            if (msg.content.toLowerCase() == "/commands") {
                // All command identifiers/definitions are listed via a for/loop method; commands.json lists all identifiers/definitions
                let username = msg.author.username;
                let embed = new Discord.RichEmbed()
                    .setColor(0x0712e8)
                    .setThumbnail("https://cdn.discordapp.com/attachments/333438353620074496/661101268483440650/image0.jpg")
                    .setImage("https://cdn.discordapp.com/attachments/307715783146995713/661102080328466466/image0.png");
                for (i = 0; i < commands.valid_command_identifiers.length; i++) {
                    embed.addField(commands.valid_command_identifiers[i], commands.valid_command_definitions[i]);
                }
                msg.reply(embed);
            }
        }
        else {
            // Code placed here is ran for each message that is not a valid command
        }
    }
});

bot.on("guildMemberAdd", (member) => {
    // Automatically adds the 'Members' role to newly-joined members; will log an error to console if one is caught
    member.addRole(roles.members_RoleID).catch(console.error);
});

bot.on("guildMemberRemove", (member) => {
    // Handles when a user leaves the server (disconnects/kicked/banned)
    console.log(`MEMBER_LEFT: ${member.user.tag} | ${member.user.id}`);
});

bot.login(tokens.bot_token);
