const { InteractionCollector } = require('discord.js');
const profileModel = require('../../models/profileSchema');

module.exports = class SlashInstagram extends Interaction {
    constructor() {
        super({
            name: "miner",
            description: "Adds Helium Miner To User Profile",
            options: [
                { type: 3, name: 'helium-miner-name', description: 'Your Miners Name, In This Format', required: true }
            ]
        });
    }
    async exec(interaction) {

        let heliumUser = (interaction.options.getString('helium-miner-name'))

        const response = await profileModel.findOneAndUpdate(
            {
                userID: interaction.user.id
            },
            {
                miner: `${heliumUser}`
            }
        );
        this.client.logger.log(` ${interaction.user.username} has added their Helium Miner`, { tag: 'Miner.js' });
        return interaction.reply({ ephemeral: true, content: "Your Helium Miner has been added to your profile." });
    }
}