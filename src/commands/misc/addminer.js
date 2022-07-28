const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class Miner extends Command {
    constructor() {
        super({
            name: "miner",
            aliases: ["addminer"],
            description: "Adds Helium Miner To User Profile",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, args) {

        let miner = args[0]
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                miner: `${miner}`
            }
        );
        message.channel.send("Your Helium Miner Username has been added to your profile.")
        this.client.logger.log(` ${message.author.tag} has added their Helium Miner Username`, { tag: 'Miner.js' });

    }

}