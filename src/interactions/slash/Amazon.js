const axios = require('axios');
const { Discord, MessageActionRow, MessageButton, MessageComponentInteraction, ButtonInteraction, MessageSelectMenu, MessageEmbed, CommandInteractionOptionResolver, Message } = require('discord.js');
const secondsSinceEpoch = Math.round(Date.now() / 1000)
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = class SlashAmazon extends Interaction {
    constructor() {
        super({
            name: "amazon",
            description: "Amazon Statistics Toolbox",
            options: [
                { type: 3, name: 'asin', description: 'Enter The ASIN To Reference', required: true }
            ]
        });
    }
    async exec(interaction, client) {

        // Set Up Keywords Function
        const args = (interaction.options.getString('asin'))
        console.log(args)
        let productURL = `https://www.amazon.com/dp/${args}/`

        const usdFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            useGrouping: false
        })

        let startEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Amazon Information Bot')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription('What would you like to know about this ASIN?')
            .setFooter({ text: 'Amazon Information', iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
            .setTimestamp()

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("one")
                .setLabel("Product Information")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("two")
                .setLabel("Price History")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("three")
                .setLabel("Send Graphs")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setLabel("View Product")
                .setStyle("LINK")
                .setURL(productURL + ('?linkCode=ml1&tag=adamzon-20')),
        );

        const backButton = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("back")
                .setLabel("Back")
                .setStyle("DANGER")
        )

        this.client.once('interactionCreate', async ButtonInteraction => {
            if (!ButtonInteraction.isButton()) return

            if (ButtonInteraction.customId === 'one') {
                ButtonInteraction.deferUpdate()
                axios.get(`https://api.keepa.com/product?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&stats=60&history=1&days=60&only-live-offers=1&buybox=1`)
                    .then(response => {

                        const prod = response.data.products[0]
                        let buyBoxRawPrice = (prod.stats.buyBoxPrice)
                        let prodImages = prod.imagesCSV
                        let prodImage = prodImages.substring(0, prodImages.indexOf(','));
                        let prodTitle = prod.title
                        let prodSize = prod.size
                        let prodModel = prod.model
                        let prodGroup = prod.productGroup
                        let prodBrand = prod.brand
                        let prodFBAPickPackRaw = (prod.fbaFees.pickAndPackFee / 100).toString()
                        let prodLastUpdateUnix = (prod.lastUpdate + 21564000) * (60)
                        let prodAmazonStock = prod.availabilityAmazon
                        let prodUPCList = prod.upcList
                        let prodDiscount = prod.coupon
                        let prodFBAPickPack = (usdFormatter.format(prodFBAPickPackRaw));

                        if (prodAmazonStock === 0) {
                            var stockedByAmz = "True"
                        } else {
                            var stockedByAmz = "False"
                        }

                        if (prodUPCList === null) {
                            var prodUPC = "N/A"
                        } else {
                            var prodUPC = prodUPCList[0]
                        }

                        if (prodDiscount === null) {
                            var prodDiscountRate = "N/A"
                        } else {
                            var prodDiscountRate = `${(prodDiscount[0] / -1).toString()}%`
                        }

                        if (buyBoxRawPrice === null) {
                            var buyBoxPrice = "N/A"
                        } else {
                            var buyBoxPrice = usdFormatter.format((buyBoxRawPrice / 100))
                        }

                        if (prodGroup === null) {
                            var prodGrouping = "N/A"
                        } else {
                            var prodGrouping = prodGroup
                        }

                        if (prodModel === null) {
                            var prodModNumber = "N/A"
                        } else {
                            var prodModNumber = prodModel
                        }


                        let infoEmbed = new MessageEmbed()
                            .setColor('#f09719')
                            .setTitle('')
                            .setURL(productURL)
                            .setThumbnail('https://m.media-amazon.com/images/I/' + prodImage)
                            .setDescription("Information")
                            .addFields(
                                {
                                    name: "Buy Box Price",
                                    value: buyBoxPrice,
                                    inline: true,
                                },
                                {
                                    name: "Category/Group",
                                    value: prodGrouping,
                                    inline: true,
                                },
                                {
                                    name: "Model Number",
                                    value: prodModNumber,
                                    inline: true,
                                },
                                {
                                    name: "UPC",
                                    value: prodUPC,
                                    inline: true,
                                },
                                {
                                    name: "Size",
                                    value: prodSize,
                                    inline: true,
                                },
                                {
                                    name: "FBA Pick/Pack Fee",
                                    value: prodFBAPickPack,
                                    inline: true,
                                },
                                {
                                    name: "Brand Name",
                                    value: prodBrand,
                                    inline: true,
                                },
                                {
                                    name: "Stocked By Amazon",
                                    value: stockedByAmz.toString(),
                                    inline: true,
                                },
                                {
                                    name: "Coupons",
                                    value: `${prodDiscountRate}`,
                                    inline: true,
                                },
                            )
                            .setFooter({ text: `Last Updated  - ${Date(prodLastUpdateUnix)}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })

                        interaction.followUp({ ephemeral: true, embeds: [infoEmbed] });

                    })
            }

            if (ButtonInteraction.customId === 'two') {
                ButtonInteraction.deferUpdate()
                axios.get(`https://api.keepa.com/product?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&stats=365&history=1&days=365&only-live-offers=1&buybox=1`)
                    .then(response => {

                        
                        const prod = response.data.products[0]
                        const prodStats = prod.stats
                        let prodImages = prod.imagesCSV
                        let prodImage = prodImages.substring(0, prodImages.indexOf(','));
                        let prodLastUpdateUnix = (prod.lastUpdate + 21564000) * (60)

                        // if (prodStats.min[0] === null) {
                        //     return interaction.followUp(({ ephemeral: true, content: "Not Enough Price History (Will Update Soon)" }));
                        // } 


                        if (prodStats.min[0] === null) {
                            var amzLowestPrice = "Not Stocked"
                            var amzCurrentPrice = "Not Stocked"
                            var amzMaxPrice = "Not Stocked"
                            var amzAveragePrice = "Not Stocked"
                        } else {
                        let amzLowestRaw = (prodStats.min[0][1])
                        let amzLowestTimeRaw = (prodStats.min[0][0] + 21564000) * (60)
                        if (amzLowestRaw === null) {
                            var amzLowestPrice = "OOS"
                        } else {
                            var amzLowestPrice = usdFormatter.format(amzLowestRaw / 100)
                        }

                        let amzCurrentRaw = (prodStats.current[0])
                        if (amzCurrentRaw === -1) {
                            var amzCurrentPrice = "OOS"
                        } else {
                            var amzCurrentPrice = usdFormatter.format(amzLowestRaw / 100)
                        }

                        let amzMaxRaw = (prodStats.max[0][1])
                        let amzMaxTimeRaw = (prodStats.max[0][0])
                        if (amzMaxRaw === -1) {
                            var amzMaxPrice = "OOS"
                        } else {
                            var amzMaxPrice = usdFormatter.format(amzMaxRaw / 100)
                        }

                        let amzAverageRaw = prodStats.avg90[0]
                        if (amzAverageRaw === -1) {
                            var amzAveragePrice = "OOS"
                        } else {
                            var amzAveragePrice = usdFormatter.format(amzAverageRaw / 100)
                        }
                    }
                    
                        let newLowestRaw = prodStats.min[1][1]
                        let newLowestTimeRaw = prodStats.min[1][1]
                        if (newLowestRaw === -1) {
                            var newLowestPrice = "OOS"
                        } else {
                            var newLowestPrice = usdFormatter.format(newLowestRaw / 100)
                        }

                        let newCurrentRaw = prodStats.current[1]
                        if (newCurrentRaw === -1) {
                            var newCurrentPrice = "OOS"
                        } else {
                            newCurrentPrice = usdFormatter.format(newCurrentRaw / 100)
                        }

                        let newMaxRaw = (prodStats.max[1][1])
                        let newMaxTimeRaw = (prodStats.max[1][0])
                        if (newMaxRaw === -1) {
                            var newMaxPrice = "OOS"
                        } else {
                            var newMaxPrice = usdFormatter.format(newMaxRaw / 100)
                        }

                        let newAverageRaw = prodStats.avg90[1]
                        if (newAverageRaw === -1) {
                            var newAveragePrice = "OOS"
                        } else {
                            var newAveragePrice = usdFormatter.format(newAverageRaw / 100)
                        }

                        let usedLowestRaw = prodStats.min[2][1]
                        let usedLowestTimeRaw = prodStats.min[2][1]
                        if (usedLowestRaw === -1) {
                            var usedLowestPrice = "OOS"
                        } else {
                            var usedLowestPrice = usdFormatter.format(usedLowestRaw / 100)
                        }

                        let usedCurrentRaw = prodStats.current[2]
                        if (usedCurrentRaw === -1) {
                            var usedCurrentPrice = "OOS"
                        } else {
                            usedCurrentPrice = usdFormatter.format(usedCurrentRaw / 100)
                        }

                        let usedMaxRaw = (prodStats.max[2][1])
                        let usedMaxTimeRaw = (prodStats.max[2][0])
                        if (usedMaxRaw === -1) {
                            var usedMaxPrice = "OOS"
                        } else {
                            var usedMaxPrice = usdFormatter.format(usedMaxRaw / 100)
                        }

                        let usedAverageRaw = prodStats.avg90[2]
                        if (usedAverageRaw === -1) {
                            var usedAveragePrice = "OOS"
                        } else {
                            var usedAveragePrice = usdFormatter.format(usedAverageRaw / 100)
                        }

                        let salesRankLowest = prodStats.min[3][1]
                        let salesRankCurrent = prodStats.current[3]
                        let salesRankMax = prodStats.max[3][1]
                        let salesRankAvg = prodStats.avg90[3]

                        const amazonStats = stripIndent`
                        Lowest    :: ${amzLowestPrice}
                        Current   :: ${amzCurrentPrice}
                        Highest   :: ${amzMaxPrice}
                        Average   :: ${amzAveragePrice}
                     `;
                        const newStats = stripIndent`
                        Lowest    :: ${newLowestPrice}
                        Current   :: ${newCurrentPrice}
                        Highest   :: ${newMaxPrice}
                        Average   :: ${newAveragePrice}
                      `;         
                        const usedStats = stripIndent`
                        Lowest    :: ${usedLowestPrice}
                        Current   :: ${usedCurrentPrice}
                        Highest   :: ${usedMaxPrice}
                        Average   :: ${usedAveragePrice}
                      `; 
                      const salesRankStats = stripIndent`
                        Lowest    :: #${salesRankLowest}
                        Current   :: #${salesRankCurrent}
                        Highest   :: #${salesRankMax}
                        Average   :: #${salesRankAvg}
                      `;             
        
                        let priceHistoryEmbed = new MessageEmbed()
                            .setColor('#f09719')
                            .setTitle('Product Pricing History')
                            .setURL(`${productURL}?linkCode=ml1&tag=adamzon-20`)
                            .setThumbnail('https://m.media-amazon.com/images/I/' + prodImage)
                            .setDescription("All time intervals are currently 90 days, but an update will be pushed soon that allows you to view them in different intervals.")
                            .addFields(
                                {
                                    name: "Amazon",
                                    value: `\`\`\`asciidoc\n${amazonStats}\`\`\``,
                                    inline: false,
                                },
                                {
                                    name: "New",
                                    value: `\`\`\`asciidoc\n${newStats}\`\`\``,
                                    inline: false,
                                },
                                {
                                    name: "Used",
                                    value: `\`\`\`asciidoc\n${usedStats}\`\`\``,
                                    inline: false,
                                },
                                {
                                    name: "Sales Rank",
                                    value: `\`\`\`asciidoc\n${salesRankStats}\`\`\``,
                                    inline: false,
                                },
                            )
                            .setFooter({ text: `Last Updated  - ${Date(prodLastUpdateUnix)}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })

                        interaction.followUp({ ephemeral: true, embeds: [priceHistoryEmbed] });

                    })


            }

            if (ButtonInteraction.customId === 'three') {
                ButtonInteraction.deferUpdate()
                let amazonGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&amazon=1`
                let fbaGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&fba=1`
                let bbGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&bb=1`
                let salesRankGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&salesrank=1`
                await interaction.followUp({ ephemeral: true, content: amazonGraphImg });
                await interaction.followUp({ ephemeral: true, content: fbaGraphImg });
                await interaction.followUp({ ephemeral: true, content: bbGraphImg });
                await interaction.followUp({ ephemeral: true, content: salesRankGraphImg,});
            }

        })

        await interaction.reply({ ephemeral: true, embeds: [startEmbed], components: [buttons] });


    }
}