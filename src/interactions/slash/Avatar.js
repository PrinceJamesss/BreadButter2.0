const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = class SlashTest extends Interaction {
    constructor() {
        super({
            name: "avatar",
            description: 'Returns Users Avatar',
            options: [
                { name: 'user', type: 6, description: 'Select A User', required: true }
            ]
        });
    }
    async exec(interaction) {
        let targetMember = (interaction.options.getUser('user'))
        let Target = targetMember || interaction.user;
        let searchUser = Target.id || targetMember
        let Member = interaction.guild.members.cache.get(Target.id)
  
        const avatarEmbed = new MessageEmbed()
            .setTitle(`${Member.user.username}'s Avatar`)
            .setColor('#f09719')
            .setImage(Member.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setDescription(`[PNG](${Member.user.avatarURL({format: 'png' })}) | [WEBP](${Member.user.avatarURL({dynamic: true })}) | [JPEG](${Member.user.avatarURL({format: 'jpeg' })})`)
            .setFooter({ text: 'Avatar View', iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })

        return interaction.reply( { ephemeral: true, embeds: [avatarEmbed] } )
    }
}
