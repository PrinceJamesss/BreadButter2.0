const { InteractionCollector } = require('discord.js');
const profileModel = require('../../models/profileSchema');

module.exports = class SlashTwitter extends Interaction {
    constructor() {
        super({
            name: "twitter",
            description: "Adds Twitter To User Profile",
            options: [
                { type: 3, name: 'username', description: 'Twitter Username', required: true }
            ]
        });
    }
    async exec(interaction) {

        let twitterUser = (interaction.options.getString('username'))

        const response = await profileModel.findOneAndUpdate(
            {
                userID: interaction.user.id
            },
            {
                twitter: `${twitterUser}`
            }
        );
        this.client.logger.log(` ${interaction.user.username} has added their Twitter Username`, { tag: 'Twitter.js' });
        return interaction.reply({ ephemeral: true, content: "Your Twitter has been added to your profile." });
    }
}