const pointModel = require('../../models/pointSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class RemovePoints extends Command {
    constructor() {
        super({
            name: "removepoints",
            aliases: ["N/A"],
            description: "Removes a Point To Users Balance",
            usage: "<Amount> !<@User>",
            category: "Admin",
            ownerOnly: false,
            cooldown: 3000,
            //memberPerms: ["MANAGE_GUILD"],
            clientPerms: [],
        });
    }
    async exec(message, data) {
        if (message.author.id !== '493930658931015690')
            if (message.author.id !== '735698759174062211')
                if (message.author.id !== '525043253419048961')
                    return message.channel.send("This command can only be used by Administrators")
        const p = message.content.slice(14, 16);
        const q = ~p + 1
        message.delete()

        const response = await pointModel.findOneAndUpdate(
            {
                userID: message.mentions.members.first().id,
            },
            {
                $inc: {
                    points: q,
                },
            }
        );
        const removePointsEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setDescription(`<@${message.mentions.members.first().user.id}> Has lost ${message.content.slice(14, 16)} points! Check your balance.`)
            .setFooter({ text: `Remove Points - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
            .setTimestamp()


        console.log(`${message.mentions.members.first().id} Has lost points!`)
        return message.channel.send({ embeds: [removePointsEmbed] });
    }
}