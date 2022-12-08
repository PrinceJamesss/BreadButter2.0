const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = class ModalSubmit extends Event {
    constructor() {
        super({
            name: "modalSubmit",
            once: false,
        });
    }
    async exec(interaction, data) {
        if (!interaction.isModalSubmit()) return;

        // Get the data entered by the user
        const sub1 = interaction.fields.getTextInputValue('cooktitle');
        const sub2 = interaction.fields.getTextInputValue('cooklink');
        const sub3 = interaction.fields.getTextInputValue('cookdescrip');
        const sub4 = interaction.fields.getTextInputValue('cookmember');
        const sub5 = interaction.fields.getTextInputValue('cookimage');


        let infoEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle(sub1)
            .setImage(sub5)
            .setDescription(`**Link:** ${sub2} \n **Info:** ${sub3} \n **Posted By:** ${sub4}`)
            .setFooter({ text: `Last Updated  - ${Date()}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })

        this.client.channels.cache.get('1050546624285380618').send({ embeds: [infoEmbed]})
        interaction.reply({ ephemeral: true, content: 'Your Cook Has Been Submitted, Thanks!'});

    }
}