const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")


module.exports = class SlashProfile extends Interaction {
    constructor() {
        super({
            name: "profile",
            description: "Displays Profile Info",
            options: [
                { type: 6, name: 'user', description: 'user you want to reference', required: false}
                ]
        });
    }
    async exec(interaction, data) {

let targetMember = (interaction.options.getUser('user'))
let Target = targetMember || interaction.user;
let searchUser = Target.id || targetMember
let Member = interaction.guild.members.cache.get(Target.id)

 //Gets A User Profile
 let profileInfo = await profileModel.findOne(
    {
        userID: searchUser
    }
);
let profileEmbed = new MessageEmbed()
    .setColor('#f09719')
    .setTitle(`${profileInfo.userName}`)
    .setThumbnail(interaction.guild.iconURL({ dynamic: false }))
    .addFields(
        {
            name: "User ID",
            value: `${profileInfo.userID}`,
            inline: false,
        },
        {
            name: "Roles",
            value: `${Member.roles.cache.map(r => r).join(" | ").replace("@everyone", " ")}`,
            inline: false,
        },
        {
            name: "Total Points",
            value: `You currently have ${profileInfo.points} Points!`,
            inline: false,
        },
        {
            name: "W Posts",
            value: `You currently have ${profileInfo.posts} W Posts!`,
            inline: false,
        },
        {
            name: "W Reactions",
            value: `You currently have ${profileInfo.reacts} W Posts!`,
            inline: false,
        },
        {
            name: "Weighted Points",
            value: `You currently have ${profileInfo.reacts} Weight Points!`,
            inline: false,
        },
        {
            name: "Messages",
            value: `You currently have ${profileInfo.messages} Messages!`,
            inline: false,
        },
        {
            name: "ACO Points",
            value: `You currently have ${profileInfo.acopoints} ACO Points to Redeem!`,
            inline: false,
        },
        {
            name: "ETH Wallet",
            value: `Coming Soon!`,
            inline: false,
        },
        {
            name: "Miner",
            value: `Coming Soon!`,
            inline: false,
        },
        {
            name: "Twitter",
            value: `Coming Soon!`,
            inline: false,
        },
        {
            name: "Instagram",
            value: `Coming Soon!`,
            inline: false,
        },
    )
    .setFooter({ text: 'Profile View', iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
    .setTimestamp();
    return interaction.reply({ ephemeral: true, embeds: [profileEmbed] });

}
}