const discord = require("discord.js");
module.exports.run = async (client, message, arguments) => {


    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("u heeft geen toegang tot dit commando!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms!");

    if (!arguments[0]) return message.reply("Geen gebruiker opgegeven!");

    if (!arguments[1]) return message.reply("Geen redenen opgegeven!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

    var reason = arguments.slice(1).join(" ");

    if (!kickUser) return message.reply("Gebruiker niet gevonden!");

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.reply("Sorry je kunt deze gebruiker niet kicken!");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gelieve binnen 30 sec te bevestigen")
        .setDescription(`Weet je zeker dat je ${kickUser} wilt kicken?`);

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gekickt: ** ${kickUser} (${kickUser.id})
            **Gekickt door: ** ${message.author}
            **Reden: ** ${reason}`);


            message.channel.send(embedPrompt).then(async msg=> {

                var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji === "✅") {

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if (err) return message.reply("Er is iets foutgelopen!");
            });

            message.channel.send(embed);

        } else if (emoji === "❌") {

            message.delete();

            message.reply("Uw aanvraag is geanuleerd!").then(m => m.delete({timeout: 3000}));

        }

    })



}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time:30000 }).then(collected => collected.first() && collected.first().emoji.name);

}

module.exports.help = {
    name: "kick"
};


