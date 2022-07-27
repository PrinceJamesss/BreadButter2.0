const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class Balance extends Command {
    constructor() {
        super({
            name: "balance",
            aliases: ["bal"],
            description: "Retrieves Server Point Balance",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, data) {

        //Gets Your Profiles Point Balance.
        let profileInfo = await profileModel.findOne(
            {
                userID: message.author.id
            }
        )

        let pointsEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle(`You currently have ${profileInfo.points} Points!`)
            .setFooter({ text: `Balance - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
            .setTimestamp();

        message.channel.send({ embeds: [pointsEmbed] });
        console.log(`${message.author.tag} has checked their balance!`)


    }
}
