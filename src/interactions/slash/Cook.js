const { Modal, TextInputComponent, MessageActionRow, InteractionCollector, Message } = require("discord.js");

module.exports = class SlashCook extends Interaction {
    constructor() {
        super({
            name: "cook",
            description: "Submit Member Cooks",
        });
    }
    async exec(interaction) {
       const modal = new Modal();
       modal.setTitle("Member Cooks Submissions")
       modal.setCustomId("cooksModal")

       const textInput1 = new TextInputComponent()
       .setCustomId('cooktitle')
       .setLabel("Cook Title")
       .setStyle("SHORT")

       const textInput2 = new TextInputComponent()
       .setCustomId("cookdescrip")
       .setLabel("Cook Info (Post Your Cook Here)")
       .setStyle("PARAGRAPH")

       const textInput3 = new TextInputComponent()
       .setCustomId("cooklink")
       .setLabel("Insert Link To Product")
       .setStyle("SHORT")

       const textInput4 = new TextInputComponent()
       .setCustomId("cookmember")
       .setLabel("Insert Discord Username")
       .setStyle("SHORT")

       const textInput5 = new TextInputComponent()
       .setCustomId("cookimage")
       .setLabel("Insert Image Link (Optional)")
       .setStyle("SHORT")

       const action1 = new MessageActionRow().addComponents(textInput1)
       const action2 = new MessageActionRow().addComponents(textInput2)
       const action3 = new MessageActionRow().addComponents(textInput3)
       const action4 = new MessageActionRow().addComponents(textInput4)
       const action5 = new MessageActionRow().addComponents(textInput5)
       modal.addComponents(action1, action2, action3, action4, action5);
       await interaction.showModal(modal)
    }
}