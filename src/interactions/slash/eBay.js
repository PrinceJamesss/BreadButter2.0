const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = class SlashEbay extends Interaction {
    constructor() {
        super({
            name: "ebay",
            description: "Scan eBay for Sold Items",
            options: [
                { type: 3, name: 'search', description: 'search criteria', required: true }
            ]
        });
    }
    async exec(interaction) {

        // Set Up Keywords Function
        const args = (interaction.options.getString('search'))
        interaction.deferReply({ ephemeral: true });

        //Create KW URL
        //https://www.ebay.com/sch/i.html?_nkw=kw=Mario+Kart+Golden+Peach+SDCC+Hot+Wheels&_sacat=0
        // Set Up Sold Listing Request Params
        const params = {
            api_key: "319C16592E26448284AF150D8E3F819C",
            type: "search",
            ebay_domain: "ebay.com",
            search_term: args.toString(),
            sold_items: "true",
            completed_items: "true"
        }

        // Make GET Request To Countdown API
        axios.get('https://api.countdownapi.com/request', { params })
            .then(response => {

                console.log(response)
                var listing0Image = response.data.search_results[0].image
                let listing0 = JSON.stringify(response.data.search_results[0].title)
                let listing1 = JSON.stringify(response.data.search_results[1].title)
                let listing2 = JSON.stringify(response.data.search_results[2].title)
                let listing0Price = JSON.stringify(response.data.search_results[0].prices[0].value)
                let listing1Price = JSON.stringify(response.data.search_results[1].prices[0].value)
                let listing2Price = JSON.stringify(response.data.search_results[2].prices[0].value)
                let listing3Price = JSON.stringify(response.data.search_results[3].prices[0].value)
                let listing4Price = JSON.stringify(response.data.search_results[4].prices[0].value)
                let listing5Price = JSON.stringify(response.data.search_results[5].prices[0].value)
                let listing6Price = JSON.stringify(response.data.search_results[6].prices[0].value)
                let listing7Price = JSON.stringify(response.data.search_results[7].prices[0].value)
                let listing8Price = JSON.stringify(response.data.search_results[8].prices[0].value)
                let listing9Price = JSON.stringify(response.data.search_results[9].prices[0].value)
                let listing10Price = JSON.stringify(response.data.search_results[10].prices[0].value)
                let listing11Price = JSON.stringify(response.data.search_results[11].prices[0].value)
                let listing12Price = JSON.stringify(response.data.search_results[12].prices[0].value)
                let listing13Price = JSON.stringify(response.data.search_results[13].prices[0].value)
                let listing14Price = JSON.stringify(response.data.search_results[14].prices[0].value)
                let listing15Price = JSON.stringify(response.data.search_results[15].prices[0].value)
                let listing16Price = JSON.stringify(response.data.search_results[16].prices[0].value)
                let listing17Price = JSON.stringify(response.data.search_results[17].prices[0].value)
                let listing18Price = JSON.stringify(response.data.search_results[18].prices[0].value)
                let listing19Price = JSON.stringify(response.data.search_results[19].prices[0].value)
                let listing20Price = JSON.stringify(response.data.search_results[20].prices[0].value)
                let listing21Price = JSON.stringify(response.data.search_results[21].prices[0].value)
                let listing22Price = JSON.stringify(response.data.search_results[22].prices[0].value)
                let listing23Price = JSON.stringify(response.data.search_results[23].prices[0].value)
                let listing24Price = JSON.stringify(response.data.search_results[24].prices[0].value)
                let listing25Price = JSON.stringify(response.data.search_results[25].prices[0].value)


                const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'Last 20 Sales',
                        data: [listing20Price, listing19Price, listing18Price, listing17Price, listing16Price, listing15Price, listing14Price, listing13Price, listing12Price, listing11Price, listing10Price, listing9Price, listing8Price, listing7Price, listing6Price, listing5Price, listing4Price, listing3Price, listing2Price, listing1Price, listing0Price],
                        fill: true,
                        borderColor: 'rgb(255, 255, 51)',
                        tension: 0.1
                    }]
                };

                const chart = {
                    type: 'line',
                    labels: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
                    data: data,
                    options: {},
                }

                const encodedChart = encodeURIComponent(JSON.stringify(chart));
                const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
                const listingImage = listing0Image

                // Create an Equation to Average Sales
                let allPrices = Number(listing0Price) + Number(listing1Price) + Number(listing2Price) + Number(listing3Price) + Number(listing4Price) + Number(listing5Price) + Number(listing6Price) + Number(listing7Price) + Number(listing8Price) + Number(listing9Price)
                let averagePricesRaw = (allPrices / 10)
                let averagePrice = Math.round(averagePricesRaw)


                // Create Discord Embed For Sold Products  
                let soldEmbed = new MessageEmbed()
                    .setColor('#f09719')
                    .setTitle("Search Results")
                    .setDescription("```" + "Keywords: " + args + "```")
                    .addFields(
                        {
                            name: "Last 10 Sales (Newest First)",
                            value: "```" + Math.round(listing0Price) + ", " + Math.round(listing1Price) + ", " + Math.round(listing2Price) + ", " + Math.round(listing3Price) + ", " + Math.round(listing4Price) + ", " + Math.round(listing5Price) + ", " + Math.round(listing6Price) + ", " + Math.round(listing7Price) + ", " + Math.round(listing8Price) + ", " + Math.round(listing9Price) + "```",
                            inline: true,
                        },
                        {
                            name: "Average Price (Last 10)",
                            value: "```" + "$" + averagePrice + "```",
                            inline: false,
                        },
                    )
                    .setImage(chartUrl || listing0Image)
                    .setFooter(
                        interaction.guild.name.toString() + " - " + //message.author.username.toString(),
                        interaction.guild.iconURL()
                    );

                return interaction.editReply({ ephemeral: true, embeds: [soldEmbed] });

                // print the JSON response from Countdown API
                //console.log(JSON.stringify(response.data, 0, 2));

            }).catch(error => {
                // Catch and Print The Error
                console.log(error);
            })
    }

}