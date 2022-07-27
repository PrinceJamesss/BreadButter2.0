const profileModel = require('../../models/profileSchema');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Discord } = require("discord.js")

module.exports = class Profile extends Command {
    constructor() {
        super({
            name: "profile",
            aliases: ["prof"],
            description: "Profile command",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, data) {

        //Gets Your Profile
        let profileInfo = await profileModel.findOne(
            {
                userID: message.author.id
            }
        );

        let Target = message.mentions.users.first() || message.author;
        let Member = message.guild.members.cache.get(Target.id)

        let weightedPoints = (profileInfo.reacts / profileInfo.posts)

        let profileEmbed = new MessageEmbed()
            .setColor('#f09719')
            .setTitle(`${profileInfo.userName}`)
            .setThumbnail(message.author.displayAvatarURL())
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
                    value: `You currently have ${profileInfo.reacts} W Reactions!`,
                    inline: false,
                },
                {
                    name: "Weighted Points",
                    value: `You currently have ${weightedPoints} Weighted Points!`,
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
            .setTimestamp()
            .setFooter({ text: `Profile View - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' });

        message.channel.send({ embeds: [profileEmbed] });

    }
}