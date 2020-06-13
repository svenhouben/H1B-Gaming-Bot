const discord = require('discord.js');
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();


client.commands = new discord.Collection();

client.login(botConfig.token);

client.on("messageDelete", () => {})

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});


client.on('guildMemberAdd', member =>{

    var role = member.guild.roles.cache.get('720334448578789386');

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('720321243366031411');

    if(!channel) return;

    channel.send(`Welkom ${member} bij de H1B gaming server`);

});




client.on("ready", async () => {

    console.log(`${client.user.username} is online. `);

    client.user.setActivity("!help", { TYPE: "playing" });

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);


});

bot.login(poscess.env.token);