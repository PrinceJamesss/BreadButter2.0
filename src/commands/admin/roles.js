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

        //Reaction Menu
        this.client.on('interactionCreate', async interaction => {
            const member = await interaction.guild.members.fetch({
                user: interaction.user.id,
                force: true
            })
            if (!interaction.isSelectMenu()) return;

            //In-Store
            if (interaction.values == 'Seasonal') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("1001867112899420300")) {
                    await member.roles.add('1001867112899420300')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Seasonal Role' })
                } else if (member.roles.cache.has("1001867112899420300")) {
                    await member.roles.remove('1001867112899420300')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Seasonal Role' })
                }
            }
            //BOLO
            if (interaction.values == 'BOLO') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882442918781132830")) {
                    await member.roles.add('882442918781132830')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added BOLO Role' })
                } else if (member.roles.cache.has("882442918781132830")) {
                    await member.roles.remove('882442918781132830')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed BOLO Role' })
                }
            }
            //Toys
            if (interaction.values == 'Toys') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882443032375488543")) {
                    await member.roles.add('882443032375488543')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Toys Role' })
                } else if (member.roles.cache.has("882443032375488543")) {
                    await member.roles.remove('882443032375488543')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Toys Role' })
                }
            }
            //Sneakers
            if (interaction.values == 'Sneakers') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882443088306528276")) {
                    await member.roles.add('882443088306528276')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Sneakers Role' })
                } else if (member.roles.cache.has("882443088306528276")) {
                    await member.roles.remove('882443088306528276')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Sneakers Role' })
                }
            }
            //Cards
            if (interaction.values == 'Cards') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882443171710267403")) {
                    await member.roles.add('882443171710267403')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Cards Role' })
                } else if (member.roles.cache.has("882443171710267403")) {
                    await member.roles.remove('882443171710267403')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Cards Role' })
                }
            }
            //Coins
            if (interaction.values == 'Coins') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882443246897356811")) {
                    await member.roles.add('882443246897356811')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Coins Role' })
                } else if (member.roles.cache.has("882443246897356811")) {
                    await member.roles.remove('882443246897356811')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Coins Role' })
                }
            }
            //Giveaways
            if (interaction.values == 'Giveaways') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882766838327570513")) {
                    await member.roles.add('882766838327570513')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Giveaways Role' })
                } else if (member.roles.cache.has("882766838327570513")) {
                    await member.roles.remove('882766838327570513')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Giveaways Role' })
                }
            }
            //NFT
            if (interaction.values == 'NFT') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("882705733337112657")) {
                    await member.roles.add('882705733337112657')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added NFT Role' })
                } else if (member.roles.cache.has("882705733337112657")) {
                    await member.roles.remove('882705733337112657')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed NFT Role' })
                }
            }
            //Consoles
            if (interaction.values == 'Consoles') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("893700728256856064")) {
                    await member.roles.add('893700728256856064')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Consoles Role' })
                } else if (member.roles.cache.has("893700728256856064")) {
                    await member.roles.remove('893700728256856064')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Consoles Role' })
                }
            }
            //Mining
            if (interaction.values == 'Mining') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("904910840757620808")) {
                    await member.roles.add('904910840757620808')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Mining Role' })
                } else if (member.roles.cache.has("904910840757620808")) {
                    await member.roles.remove('904910840757620808')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Mining Role' })
                }
            }
            //ACO
            if (interaction.values == 'ACO') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("911070839280123984")) {
                    await member.roles.add('911070839280123984')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added ACO Role' })
                } else if (member.roles.cache.has("911070839280123984")) {
                    await member.roles.remove('911070839280123984')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed ACO Role' })
                }
            }
            //Price Errors
            if (interaction.values == 'Price Errors') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("917161422738300930")) {
                    await member.roles.add('917161422738300930')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Price Errors Role' })
                } else if (member.roles.cache.has("917161422738300930")) {
                    await member.roles.remove('917161422738300930')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Price Errors Role' })
                }
            }
            //GPUs
            if (interaction.values == 'GPUs') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("928749011475791923")) {
                    await member.roles.add('928749011475791923')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added GPUs Role' })
                } else if (member.roles.cache.has("928749011475791923")) {
                    await member.roles.remove('928749011475791923')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed GPUs Role' })
                }
            }
            //Vinyls
            if (interaction.values == 'Vinyl') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("949511439146684466")) {
                    await member.roles.add('949511439146684466')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Vinyl Role' })
                } else if (member.roles.cache.has("949511439146684466")) {
                    await member.roles.remove('949511439146684466')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Vinyl Role' })
                }
            }
            //Crocs
            if (interaction.values == 'Crocs') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("958794248860352572")) {
                    await member.roles.add('958794248860352572')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Crocs Role' })
                } else if (member.roles.cache.has("958794248860352572")) {
                    await member.roles.remove('958794248860352572')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Crocs Role' })
                }
            }
        })

    }
}
