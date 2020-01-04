// Copyright (c) Noah Starkey-Sims and Gavin R. Isgar 2019-2020

const package = require("./package.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const roles = require("./roles.json");
const commands = require("./commands.json");
const net = require("net");
const fs = require("fs");
const readline = require("linebyline");

// Checks if the tokens.json file exists on a new install, and also checks to see if a valid bot_token string exists in the file
if (fs.existsSync("./tokens.json") == true) {
    // Adds a global variable leading to the "./tokens.json" file
    global.tokens = require("./tokens.json");
    // Checks to see if the "bot_token" string exists in the "./tokens.json" file
    if (tokens.bot_token === undefined) {
        console.log("\"bot_token\" string does not exist in the \"tokens.json\" file. This string is required for the bot to login.");
    }
    else {
        bot.login(tokens.bot_token);
    }
}
else {
    console.log("\"tokens.json\" file does not exist in the local directory. This file is required for authorization.");
}
// -----------------------------------------------------------------------------------

bot.on('ready', () => {
    console.log(`Copyright (c) Noah Starkey-Sims and Gavin R. Isgar 2019-2020\n${bot.user.username} || v${package.version}\n*** ONLINE ***`);
    setTimeout(() => console.clear(), 4000);
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

// Creates the CLI instance
let rl = readline(process.stdin);
rl.on("line", (input) => {
    if (input.toString() == "/nexus fetchAudits") {
        bot.guilds.forEach((guild) => {
            if (guild.id == "652677735566540830") {
                guild.fetchAuditLogs().then((audit) => console.log(audit.entries.last()));
                
            }
        });
    }
    if (input.toString() == "/nexus clear") {
        console.clear();
    }
});