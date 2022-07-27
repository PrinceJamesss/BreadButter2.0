const { embed, removeDuplicates, formatPerms, formatArray } = require('../../utils/Utils');

module.exports = class Fee extends Command {
    constructor() {
        super({
            name: "fee",
            aliases: ["sellerfee"],
            description: "Calculates Seller Fees For Marketplaces",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec (message, args, data){
        
        var numberArgs = parseInt(args)
        let feesEmbed = embed()
        .setColor('#000000')
        .setTitle("Fees Calculator")
        .setThumbnail(message.guild.iconURL({ dynamic: false }))
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
        .setFooter({ text: `Fees - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' });
            
            message.channel.send({ embeds: [feesEmbed] });
    }
}