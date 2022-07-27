const axios = require("axios");
const cheerio = require("cheerio");
const { MessageEmbed } = require('discord.js');
const urlparse = require('url-parse');



module.exports = class Vars extends Command {
    constructor() {
        super({
            name: "vars",
            aliases: ["shopify, shop"],
            description: "Returns Shopify Information For A Link",
            category: "Misc",
            //usage: "<Shopify Link>",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message) {

        return message.channel.send("This command is under construction. Check back later or DM @PrinceJamesss#6969")

        const url = args
        console.log(url)
        var linkGrab = new urlparse(args[0])
        let lsize = "";
        let lvar = "";
        let lcart = "";
        let data = [];
            axios({
                method: "get",
                url: url,
            })
                .then(function (response) {
                    document = response.data;
                    console.log
                    const $ = cheerio.load(document);
                    var title = $('meta[property="og:title"]').attr("content");
                    var img = $('meta[property="og:image"]').attr("content");
                    var titletext = $("title").text();
                    var site = (linkGrab.origin);

                    if (img == undefined) {
                        img = "";
                    } else if (!img.match(/^[a-zA-Z]+:\/\//)) {
                        img = "https:" + img;
                    } else {
                        img = img;
                    }
                    if (title === undefined) title = titletext;

                    const getAfterText = (allText, keyword) => {
                        return allText.slice(allText.indexOf(keyword));
                    };
                    parsedData = JSON.parse(
                        getAfterText(document, "var meta = ")
                            .split(";", 1)[0]
                            .substring(11)
                    );
                    for (size in parsedData.product.variants) {
                        lsize += "\n" + parsedData.product.variants[size].public_title;
                    }
                    for (variant in parsedData.product.variants) {
                        lvar += "\n" + parsedData.product.variants[variant].id;
                    }
                    for (variant in parsedData.product.variants) {
                        lcart += "\n" + `${site}/cart/${parsedData.product.variants[variant].id}:2`;
                    }

                    price = (parsedData.product.variants[0].price / 100).toFixed(2);
                    // console.log(document.getElementsByTagName("*"));

                    const atcEmbed = new MessageEmbed()
                        .setColor("#000000")
                        .setTitle(title.toString())
                        .setURL(url.toString())
                        .addFields(
                            {
                                name: "ATC",
                                value: lcart,
                                inline: true,
                            },
                            {
                                name: "Price",
                                value: "```" + "$" + price + "```",
                                inline: false,
                            },
                            {
                                name: "Variant(s)",
                                value: "```" + lvar + "```",
                                inline: false,
                            },
                        )
                        .setThumbnail(img)
                        .setFooter({ text: `Vars - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' });
                    message.channel.send({ embeds: [atcEmbed] }).toString();
                })
    }
}