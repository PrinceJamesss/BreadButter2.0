const { formatArray, formatPerms } = require('../../utils/Utils');
const { Collection } = require("discord.js");
const profileModel = require("../../models/profileSchema");
import('mongoose');


module.exports = class messageCreate extends Event {
    constructor() {
        super({
            name: "messageCreate",
            once: false,
        });
    }
    async exec(message) {
        /* Regex for mention prefix*/
        const mentionRegPrefix = RegExp(`^<@!?${this.client.user.id}> `);

        let profileData;

        if(message.channel.id === '1050546624285380618') {
        
            message.react('✅')
            message.react('🚫')

        }

        if (message.author.bot) return;
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profiles = profileModel.create({
                userID: message.author.id,
                userName: message.author.tag,
                points: 0,
                posts: 0,
                messages: 0,
                reacts: 0,
                acopoints: 0,
                ethWallet: "None",
                miner: "None",
                twitter: "Not Shared",
                instagram: "Not Shared"
            });
            profileModel.save();
        }

        const totalMessages = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                $inc: {
                    messages: 1,
                }
            }
        )
        //if Channel = Success Channel, react + add points.
        const wEmoji = this.client.emojis.cache.get("871965544738357258");
        if (message.channel.id === '865991991821074444') {
            if (message.attachments.size > 0) {
                message.react('871965544738357258')


                const response = await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            points: 1,
                            posts: 1,
                        },
                    }
                )

                let profileInfo = await profileModel.findOne(
                    {
                        userID: message.author.id
                    }
                )
            }
        }


        /* If author is bot or if message isn't in guild return */
        if (message.author.bot || !message.guild) return;
        const data = {};
        /* If message is in guild we return the findGuild function */
        if (message.guild) data.guild = await this.client.findGuild({ guildID: message.guild.id });
        const prefix = message.content.match(mentionRegPrefix) ? message.content.match(mentionRegPrefix)[0] : data.guild?.prefix;
        /* If the message does not start with one of our prefix we return nothing */
        if (!message.content.startsWith(prefix)) return;
        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            /* We check if member/client has specified permission on command constructor */
            if (message.guild) {
                /* Member permissions */
                const memberCheck = command.memberPerms;
                if (memberCheck) {
                    const missing = message.channel.permissionsFor(message.member).missing(memberCheck);
                    if (missing.length) {
                        await message.channel.sendTyping();
                        return message.reply(`You are missing \`${formatArray(missing.map(formatPerms))}\` permission.`);
                    }
                }
                /* Client permissions */
                const clientCheck = command.clientPerms;
                if (clientCheck) {
                    const missing = message.channel.permissionsFor(message.guild.me).missing(clientCheck);
                    if (missing.length) {
                        await message.channel.sendTyping();
                        return message.reply(`I am missing \`${formatArray(missing.map(formatPerms))}\` permission.`);
                    }
                }
            }

            if (command.ownerOnly && !this.client.owners.includes(message.author.id)) return;
            if (!this.client.cooldowns.has(command.name)) {
                this.client.cooldowns.set(command.name, new Collection());
            }

            const now = Date.now();
            const timestamps = this.client.cooldowns.set(command.name);
            const cdAmount = command.cooldown;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cdAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`You need to wait **${timeLeft.toFixed(2)}** seconds!`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cdAmount);
            try {
                await command.exec(message, args, data);
            } catch (err) {
                this.client.logger.error(`An error occurred when trying to trigger MessageCreate event.\n\n${err}`, { tag: 'MessageError' });
                return message.reply(`Oops, it seems I got a critical error.`);
            }
        }
    }
}