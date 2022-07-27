const pointModel = require('../../models/pointSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class AddPoint extends Command {
    constructor() {
        super({
            name: "addpoint",
            aliases: ["N/A"],
            description: "Adds Point To Users Balance",
            usage: "<@User>",
            category: "Admin",
            ownerOnly: false,
            cooldown: 3000,
            //memberPerms: ["MANAGE_GUILD"],
            clientPerms: [],
        });
    }
    async exec(message, data) {

         //Locks the command to where only the specified user can trigger the command. 
    if (message.author.id !== '493930658931015690') 
    if (message.author.id !== '735698759174062211')
    if (message.author.id !== '525043253419048961')
    return message.channel.send("This command can only be used by Administrators")

    //Deletes the original message, to keep the channel cleaned up.
    message.delete()
    
    //Awaits to find the userID from the mentioned member, then increases the DB by the specified number. In this case, it's 1.
    const response = await pointModel.findOneAndUpdate(
        {
            userID: message.mentions.members.first().id,
        },
        {
            $inc: {
                points: 1,
            },
        }
    );
        let addPointEmbed = new MessageEmbed()
        .setColor('#f09719')
        .setDescription(`<@${message.mentions.members.first().user.id}> Has been given a point!`)
        .setFooter({ text: `Add Point - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
        .setTimestamp()


        console.log(`${message.mentions.members.first().id} Was given a point!`)
        return message.channel.send({ embeds: [addPointEmbed] });


    }
}