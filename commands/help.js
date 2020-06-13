const discord = require("discord.js");
module.exports.run = async (client, message, arguments) => { 
    
    try {
        var text = "**H1B Gaming BOT** \n\n __**Commands**__ \n !hallo - Geeft een hallo terug \n !serverinfo - Stuurt serverinformatie";

        message.author.send(text);

        message.reply("Alle commands staan in je prive berichten 📫");

    } catch (error) {
        massage.reply("Er is iets fout gelopen")
    }

};

module.exports.help = {
    name: "help"
};