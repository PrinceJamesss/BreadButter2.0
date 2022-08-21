const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")

module.exports = class Roles extends Command {
    constructor() {
        super({
            name: "roles",
            aliases: ["reactionroles"],
            description: "Posts Reaction Role Embed",
            usage: "",
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
                    return message.channel.send("This Command Can Only Be Used By Administrators.")

        message.delete()
        const embed = new MessageEmbed()
            .setTitle("Bread & Butter Roles")
            .setTimestamp(new Date())
            .setDescription("Get Or Remove Roles By Clicking On Options Given In menu, After Reclicking The Role Will Be Removed, The Bot Will Send A DM That You Have Added/Removed Roles")
            .setFooter({ text: `Reaction Roles - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' });

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('newroles')
                    .setPlaceholder('Select To Add/Remove Roles')
                    .addOptions([
                        {
                            label: 'In Store',
                            description: "Click To Add/Remove In Store",
                            value: 'In-Store',
                        },
                        {
                            label: 'BOLO',
                            description: "Click To Add/Remove BOLO Role",
                            value: 'BOLO',
                        },
                        {
                            label: 'Toys',
                            description: "Click To Add/Remove Toys Role",
                            value: 'Toys',
                        },
                        {
                            label: 'Sneakers',
                            description: "Click To Add/Remove Sneakers Role",
                            value: 'Sneakers',
                        },
                        {
                            label: 'Seasonal',
                            description: "Click To Add/Remove Seasonal",
                            value: 'Seasonal',
                        },
                        {
                            label: 'Cards',
                            description: "Click To Add/Remove Cards Role",
                            value: 'Cards',
                        },
                        {
                            label: 'Coins',
                            description: "Click To Add/Remove Coins Role",
                            value: 'Coins',
                        },
                        {
                            label: 'Giveaways',
                            description: "Click To Add/Remove Givewaways Role",
                            value: 'Giveaways',
                        },
                        {
                            label: 'Mining',
                            description: "Click To Add/Remove Mining Role",
                            value: 'Mining',
                        },
                        {
                            label: 'ACO',
                            description: "Click To Add/Remove ACO Role",
                            value: 'ACO',
                        },
                        {
                            label: 'Price Errors',
                            description: "Click To Add/Remove Price Errors Role",
                            value: 'Price Errors',
                        },
                        {
                            label: 'NFT',
                            description: "Click To Add/Remove NFT Role",
                            value: 'NFT',
                        },
                        {
                            label: 'Consoles',
                            description: "Click To Add/Remove Consoles Role",
                            value: 'Consoles',
                        },
                        {
                            label: 'GPUs',
                            description: "Click To Add/Remove GPU Role",
                            value: 'GPUs',
                        },
                        {
                            label: 'Vinyl',
                            description: "Click To Add/Remove Vinyl Role",
                            value: 'Vinyl',
                        },
                        {
                            label: 'Crocs',
                            description: "Click To Add/Remove Crocs Role",
                            value: 'Crocs',
                        },
                    ]),
            );
        await message.channel.send({ embeds: [embed], components: [row] });

    }
}
