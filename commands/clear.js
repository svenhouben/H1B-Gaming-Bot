const discord = require("discord.js");
module.exports.run = async (client, message, arguments) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij hebt geen permissies om dit te doen");

    if (!arguments[0]) return message.reply("Geef een aantal op");

    if (Number.isInteger(parseInt(arguments[0]))) {

        var amount = parseInt(arguments[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] <= 0) {
                message.reply("Ben je dom ik kan toch geen 0 berichten verwijderen!").then(message => message.delete({ timeout: 3000 }));
            } else if (args[0] === 1) {
                message.reply("ik heb 1 bericht verwijderd").then(message => message.delete({ timeout: 3000 }));
            } else { message.reply(`ik heb ${args[0]} berichten verwijderd`).then(message => message.delete({ timeout: 3000 })); }

        })

    } else {
        return message.reply("Geef een getal op geen tekst.")
    }

};

module.exports.help = {
    name: "clear"
};