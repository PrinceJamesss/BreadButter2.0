const pointModel = require('../../models/pointSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class AddPoints extends Command {
    constructor() {
        super({
            name: "addpoints",
            aliases: ["N/A"],
            description: "Adds Point To Users Balance",
            usage: "<Amount> <@User>",
            category: "Admin",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, data) {

        if (message.author.id !== '493930658931015690')
            if (message.author.id !== '735698759174062211')
                if (message.author.id !== '525043253419048961')
                    return message.channel.send("This command can only be used by Administrators")
        message.delete()
        const prefix = "!"
        const args = message.content.slice(prefix.length).split(/ +/);
        const p = message.content.slice(11, 13);
        console.log(args)
        console.log(p)
        const response = await pointModel.findOneAndUpdate(
            {
                userID: message.mentions.members.first().id,
            },
            {
                $inc: {
                    points: p,
                },
            }
        );
        const addPointsEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setDescription(`<@${message.mentions.members.first().user.id}> Has been given ${message.content.slice(11, 13)} points! Check your balance.`)
            .setFooter({ text: `Add Points - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
            .setTimestamp()

        console.log(`${message.mentions.members.first().id} Has been given points!`)
        return message.channel.send({ embeds: [addPointsEmbed] });

    }
}