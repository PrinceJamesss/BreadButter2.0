const { InteractionCollector } = require('discord.js');
const profileModel = require('../../models/profileSchema');

module.exports = class SlashEthWallet extends Interaction {
    constructor() {
        super({
            name: "ethwallet",
            description: "Adds ETH Wallet To User Profile",
            options: [
                { type: 3, name: 'ethwallet', description: 'Your ETH Wallet Address', required: true }
            ]
        });
    }
    async exec(interaction) {

        let ethUser = (interaction.options.getString('ethwallet'))

        const response = await profileModel.findOneAndUpdate(
            {
                userID: interaction.user.id
            },
            {
                ethWallet: `${ethUser}`
            }
        );
        this.client.logger.log(` ${interaction.user.username} has added their ETH Wallet`, { tag: 'EthWallet.js' });
        return interaction.reply({ ephemeral: true, content: "Your ETH Wallet has been added to your profile." });
    }
}