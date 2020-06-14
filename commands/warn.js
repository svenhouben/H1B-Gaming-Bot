const discord = require("discord.js");
module.exports.run = async (client, message, arguments) => { 

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("u heeft geen toegang tot dit commando!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms!");

    if (!arguments[0]) return message.reply("Geen gebruiker opgegeven!");

    if (!arguments[1]) return message.reply("Geen redenen opgegeven!");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    var reason = arguments.slice(1).join(" ");

    if (!warnUser) return message.reply("Gebruiker niet gevonden!");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry je kunt deze gebruiker niet warnen!");

    


};

module.exports.help = {
    name: "warn"
};