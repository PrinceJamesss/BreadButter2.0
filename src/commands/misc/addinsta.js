const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class Instagram extends Command {
    constructor() {
        super({
            name: "instagram",
            aliases: ["addinsta"],
            description: "Adds Instagram To User Profile",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, args) {

        let instagram = args[0]
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                instagram: `${instagram}`
            }
        );
        message.channel.send("Your Instagram has been added to your profile.")
        this.client.logger.log(` ${message.author.tag} has added their Instagram Username`, { tag: 'Instagram.js' });

    }

}