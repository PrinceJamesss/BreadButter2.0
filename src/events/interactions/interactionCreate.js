module.exports = class interactionCreate extends Event {
    constructor() {
        super({
            name: "interactionCreate",
            once: false,
        });
    }
    async exec(interaction) {
        const data = {};
        data.guild = await this.client.findGuild({ guildID: interaction.guildId });
        /* Slash commands */
        if (interaction.isCommand()) return this.client.emit('slashCommands', interaction, data);
        /* User commands (when right click on an username) */
        if (interaction.isContextMenu()) return this.client.emit('slashCommands', interaction, data);

        //Reaction Menu
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
            //Seasonal
            if (interaction.values == 'Seasonal') {
                await interaction.deferUpdate();
                if (!member.roles.cache.has("1009924221914333226")) {
                    await member.roles.add('1009924221914333226')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Added Seasonal Role' })
                } else if (member.roles.cache.has("1009924221914333226")) {
                    await member.roles.remove('1009924221914333226')
                    return interaction.followUp({ ephemeral: true, content: 'We Have Removed Seasonal Role' })
                }
            }
    }
}