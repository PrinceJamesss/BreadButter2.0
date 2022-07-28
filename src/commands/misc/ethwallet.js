const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class EthWallet extends Command {
    constructor() {
        super({
            name: "ethwallet",
            aliases: ["ethaddress"],
            description: "Adds ETH Wallet Address To User Profile",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, args) {

        let ethWallet = args[0]
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                ethWallet: `${ethWallet}`
            }
        );
        message.channel.send("Your ETH Wallet has been added to your profile.")
        this.client.logger.log(` ${message.author.tag} has added their ETH Wallet Address`, { tag: 'ETHWallet.js' });

    }

}