const { InteractionCollector } = require('discord.js');
const profileModel = require('../../models/profileSchema');

module.exports = class SlashInstagram extends Interaction {
    constructor() {
        super({
            name: "instagram",
            description: "Adds Instagram To User Profile",
            options: [
                { type: 3, name: 'username', description: 'Instagram Username', required: true }
            ]
        });
    }
    async exec(interaction) {

        let instagramUser = (interaction.options.getString('username'))

        const response = await profileModel.findOneAndUpdate(
            {
                userID: interaction.user.id
            },
            {
                instagram: `${instagramUser}`
            }
        );
        this.client.logger.log(` ${interaction.user.username} has added their Instagram Username`, { tag: 'Instagram.js' });
        return interaction.reply({ ephemeral: true, content: "Your Instagram has been added to your profile." });
    }
}