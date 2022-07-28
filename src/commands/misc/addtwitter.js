const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class Twitter extends Command {
    constructor() {
        super({
            name: "twitter",
            aliases: ["addtwitter"],
            description: "Adds Twitter To User Profile",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, args) {

        let twitter = args[0]
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                twitter: `${twitter}`
            }
        );
        message.channel.send("Your Twitter has been added to your profile.")
        this.client.logger.log(` ${message.author.tag} has added their Twitter Username`, { tag: 'Twitter.js' });

    }

}