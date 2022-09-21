const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, Discord } = require("discord.js")

module.exports = class SlashLeaderboard extends Interaction {
    constructor() {
        super({
            name: "leaderboard",
            description: "Leaderboard Command",
        });
    }
    async exec(interaction, data) {

        //Gets The Database
        let leaderboardInfo = await profileModel.find().sort([['points', 'descending']]).exec();
        console.log(leaderboardInfo[0])

        const chartData = {
            labels: [leaderboardInfo[0].userName, leaderboardInfo[1].userName, leaderboardInfo[2].userName, leaderboardInfo[3].userName, leaderboardInfo[4].userName, leaderboardInfo[5].userName, leaderboardInfo[6].userName, leaderboardInfo[7].userName, leaderboardInfo[8].userName, leaderboardInfo[9].userName],
            datasets: [{
                data: [(leaderboardInfo[0].reacts / leaderboardInfo[0].posts), (leaderboardInfo[1].reacts / leaderboardInfo[1].posts), (leaderboardInfo[2].reacts / leaderboardInfo[2].posts), (leaderboardInfo[3].reacts / leaderboardInfo[3].posts), (leaderboardInfo[4].reacts / leaderboardInfo[4].posts), (leaderboardInfo[5].reacts / leaderboardInfo[5].posts), (leaderboardInfo[6].reacts / leaderboardInfo[6].posts), (leaderboardInfo[7].reacts / leaderboardInfo[7].posts), (leaderboardInfo[8].reacts / leaderboardInfo[8].posts), (leaderboardInfo[9].reacts / leaderboardInfo[9].posts)],
                fill: true,
                borderColor: 'rgb(255, 255, 51)',
                tension: 0.1,
            }]
        };

        const chart = {
            type: 'donut',
            data: chartData,
            options: {},
        }

        const encodedChart = encodeURIComponent(JSON.stringify(chart));
        const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

        //Create Leaderboard Embed
        //let weightedPoints = (profileInfo.reacts / profileInfo.posts)
        let profileEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle(`Bread and Butter Leaderboard`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: false }))
            .addFields(
                {
                    name: "🎉 __FIRST PLACE__ 🎉",
                    value: `**${leaderboardInfo[0].userName}** | Points: **${leaderboardInfo[0].reacts / leaderboardInfo[0].posts}**`,
                    inline: false,
                },
                {
                    name: "__Current Leaders__",
                    value: `
                    **${leaderboardInfo[1].userName}** | Points: **${leaderboardInfo[1].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[2].userName}** | Points: **${leaderboardInfo[2].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[3].userName}** | Points: **${leaderboardInfo[3].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[4].userName}** | Points: **${leaderboardInfo[4].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[5].userName}** | Points: **${leaderboardInfo[5].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[6].userName}** | Points: **${leaderboardInfo[6].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[7].userName}** | Points: **${leaderboardInfo[7].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[8].userName}** | Points: **${leaderboardInfo[8].reacts / leaderboardInfo[1].posts}**
                    **${leaderboardInfo[9].userName}** | Points: **${leaderboardInfo[9].reacts / leaderboardInfo[1].posts}**
                    `,
                    inline: false,
                },
            )
            .setFooter({ text: 'Leaderboard', iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
            .setImage(chartUrl)
            .setTimestamp();



        const deleteButton = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("deleteBoard")
                .setLabel("Clear Leaders")
                .setStyle("DANGER"),
        )

        this.client.on('interactionCreate', async ButtonInteraction => {
            if (!ButtonInteraction.isButton()) return

            if (ButtonInteraction.customId === 'deleteBoard') {
                ButtonInteraction.deferUpdate()

                let deletePoints = await profileModel.findOneAndUpdate(
                    { points: { $gt: 0 } },
                    { $set: { "points": 0 } })

                let deletePosts = await profileModel.findOneAndUpdate(
                    { posts: { $gt: 0 } },
                    { $set: { "posts": 0 } })

                let deleteReacts = await profileModel.findOneAndUpdate(
                    { reacts: { $gt: 0 } },
                    { $set: { "reacts": 0 } })

                interaction.channel.send("Leaderboard Wiped!")
            }
        })

        console.log(interaction.user)
        if (interaction.user.id === '493930658931015690') {
            return interaction.reply({ ephemeral: true, embeds: [profileEmbed], components: [deleteButton] });
        } else
            return interaction.reply({ ephemeral: true, embeds: [profileEmbed] });
    }
}
