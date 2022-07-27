const axios = require('axios');
const { Discord, MessageActionRow, MessageButton, MessageComponentInteraction, ButtonInteraction, MessageSelectMenu, MessageEmbed } = require('discord.js');
const secondsSinceEpoch = Math.round(Date.now() / 1000)

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

        axios.get(`https://api.keepa.com/product?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&stats=60&history=1&days=60&only-live-offers=1&buybox=1`)
            .then(response => {

                console.log(response.data.products[0].stats.buyBoxPrice)
                console.log(response.data.products[0].title)
                console.log(response.data.products[0].size)
                let sisterASIN = (response.data.products[0].variationCSV)

                let sisterEmbed = new MessageEmbed()
                    .setColor('#f09719')
                    .setTitle('Product Sister ASINS')
                    .setURL(productURL)
                    .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
                    .setDescription(sisterASIN)
                    .setTimestamp()

            })

        let startEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Amazon Information Bot')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription('What would you like to know about this ASIN?')
            .setTimestamp()


        let graphEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Amazon Graph Price Tool')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription(`Please Select The Graph You'd Like To See. Allow A Few Moments For Loading.`)
            .setTimestamp()


        let fbaSalesEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('FBA Sales Graph')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription(`Thanks for allowing your graph to load. It's displayed below.`)
            .setImage(`https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&fba=1`)
            .setTimestamp()

        let buyBoxSalesEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Amazon Sales Graph')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription(`Thanks for allowing your graph to load. It's displayed below.`)
            .setImage(`https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&bb=1`)
            .setTimestamp()

        let rankSalesEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Sales Rank Graph')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription(`Thanks for allowing your graph to load. It's displayed below.`)
            .setImage(`https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&salesrank=1`)
            .setTimestamp()

        let amazonSalesEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Amazon Sales Graph')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription(`Thanks for allowing your graph to load. It's displayed below.`)
            .setTimestamp()

        let infoEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle('Amazon Product Information')
            .setURL(productURL)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
            .setDescription('What would you like to know about this ASIN?')
            .setTimestamp()

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("one")
                .setLabel("Product Information")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("two")
                .setLabel("Sister ASINS")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("three")
                .setLabel("Send Graphs")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setLabel("View Product")
                .setStyle("LINK")
                .setURL(productURL),
        );

        this.client.once('interactionCreate', async ButtonInteraction => {
            if (!ButtonInteraction.isButton()) return

            if (ButtonInteraction.customId === 'one') {
                ButtonInteraction.deferUpdate()
                axios.get(`https://api.keepa.com/product?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&stats=60&history=1&days=60&only-live-offers=1&buybox=1`)
                    .then(response => {

                        let buyBoxRaw = (response.data.products[0].stats.buyBoxPrice / 100)
                        let prodImages = response.data.products[0].imagesCSV
                        let prodImage = prodImages.substring(0, prodImages.indexOf(','));
                        let prodTitle = response.data.products[0].title

                        let usdFormatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            useGrouping: false
                          })

                        let buyBoxPrice = (usdFormatter.format(buyBoxRaw));
                        let prodSize = response.data.products[0].size

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
                                    inline: false,
                                },
                                {
                                    name: "Size",
                                    value: prodSize,
                                    inline: false,
                                },
                                // {
                                //     name: "Paypal (2.9% + $0.30)",
                                //     value: "```" + (numberArgs * .971 - .30).toFixed(2).toString() + "```",
                                //     inline: false,
                                // },
                            )
                            // .setFooter(
                            //     interaction.guild.name.toString() + " - " + //message.author.username.toString(),
                            //     interaction.guild.iconURL()
                            // )
                            .setTimestamp()

                        interaction.followUp({ ephemeral: true, embeds: [infoEmbed]});

                    })
            }

            if (ButtonInteraction.customId === 'two') {
                ButtonInteraction.deferUpdate()
                axios.get(`https://api.keepa.com/product?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&stats=60&history=1&days=60&only-live-offers=1&buybox=1`)
                    .then(response => {

                        let sisterASIN = (response.data.products[0].variationCSV)

                        let sisterEmbed = new MessageEmbed()
                            .setColor('#f09719')
                            .setTitle('Product Sister ASINS')
                            .setURL(productURL)
                            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png')
                            .setDescription(sisterASIN)
                            // .setFooter(
                            //     interaction.guild.name.toString() + " - " + //message.author.username.toString(),
                            //     interaction.guild.iconURL()
                            // )
                            .setTimestamp()

                        interaction.followUp({ ephemeral: true, content: "Command is Undergoing Maintenance" });

                    })


            }

            if (ButtonInteraction.customId === 'three') {
                ButtonInteraction.deferUpdate()
                let amazonGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&amazon=1`
                let fbaGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&fba=1`
                let bbGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&bb=1`
                let salesRankGraphImg = `https://api.keepa.com/graphimage?key=eo0f3ddj40qicnvd6e868rpfno3ddd305imbe7lcmml66md4g14aej03a7id9reh&domain=1&asin=${args}&salesrank=1`
                await interaction.followUp({ ephemeral: true, content: amazonGraphImg });
                //await interaction.followUp({ ephemeral: true, content: '**Amazon Sales Graph ^**' });
                await interaction.followUp({ ephemeral: true, content: fbaGraphImg });
                //await interaction.followUp({ ephemeral: true, content: '**FBA Graph ^**' });
                await interaction.followUp({ ephemeral: true, content: bbGraphImg });
                //await interaction.followUp({ ephemeral: true, content: '**Buy Box Graph ^**' });
                await interaction.followUp({ ephemeral: true, content: salesRankGraphImg });
                //await interaction.followUp({ ephemeral: true, content: '**Sales Rank Graph ^**' });
                //await interaction.followUp({ ephemeral: true, content: amazonGraphImg });
            }

        })

        await interaction.reply({ ephemeral: true, embeds: [startEmbed], components: [buttons] });


    }
}