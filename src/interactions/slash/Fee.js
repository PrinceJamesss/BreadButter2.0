const { embed, removeDuplicates, formatPerms } = require('../../utils/Utils');

module.exports = class SlashFee extends Interaction {
    constructor() {
        super({
            name: "fee",
            description: "fees command",
            options: [
                { type: 3, name: 'amount', description: 'total sale amount', required: false}
                ]
        });
    }
    async exec(interaction) {
        
        const numberArgs = (interaction.options.getString('amount'))
        let feesEmbed = embed()
        .setColor('#000000')
        .setTitle("Fees Calculator")
        .setThumbnail(interaction.guild.iconURL({ dynamic: false }))
        .addFields(
            {
              name: "Paypal (2.9% + $0.30)",
              value: "```" + (numberArgs * .971 - .30).toFixed(2).toString() + "```",
              inline: false,
            },
            {
              name: "Stripe (2.9% + $0.30)",
              value: "```" + (numberArgs * .971 - .30).toFixed(2).toString() + "```",
              inline: false,
            },
            {
              name: "eBay (10% + Paypal)",
              value: "```" + ((numberArgs * .9) * .971 - .30).toFixed(2).toString() + "```",
              inline: false,
            },
            {
              name: "Mercari (15%)",
              value: "```" + (numberArgs * .85).toFixed(2).toString() + "```",
              inline: false,
            },
            {
              name: "Depop (10% + Paypal)",
              value: "```" + ((numberArgs * .9) * .971 - .30).toFixed(2).toString() + "```",
              inline: false,
            },
            {
              name: "StockX (8-9.5% + 3%)",
              value: "```" + `Level 1 (12.5%) - ${(numberArgs * .875).toFixed(2) }  \n` + "```" + "```" + `Level 2 (12%) - ${(numberArgs * .88).toFixed(2)}  \n` + "```" +  "```" + `Level 3 (11.5%) - ${(numberArgs * .885).toFixed(2)} \n` + "```" + "```" + `Level 4 (11%) - ${(numberArgs * .89).toFixed(2)}` + "```", 
              inline: false,
            },
            {
              name: "Goat (9.5% + $5 + PayPal)",
              value: "```" + (((numberArgs * .905) - 5) * .971 - .30).toFixed(2).toString() + "```",
              inline: false,
            },
            {
              name: "Bot Broker (9%)",
              value: "```" + (numberArgs * .91).toFixed(2).toString() + "```",
              inline: false,
            },
        )
        .setFooter(
            interaction.guild.name.toString() + " - ", //+ interaction.author.username.toString(),
            interaction.guild.iconURL({ dynamic: false })
            );

        return interaction.reply({ ephemeral: true, embeds: [feesEmbed] });
    }
}