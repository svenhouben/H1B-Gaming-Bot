const discord = require("discord.js");
module.exports.run = (client, message, arguments) => { 
    var botEmbed = new discord.MessageEmbed()
    .setTitle("Server informatie")
    .setDescription("Informatie over de H1B Gaming server")
    .setColor("#ffd900")
    .addFields(
        {name: "bot naam", value:client.user.username},
        {name: "Je bent de server gejoined op:", value:message.member.joinedAt},
        {name: "Totaal aantal leden", value:message.guild.memberCount}
    );

return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "serverinfo"
};