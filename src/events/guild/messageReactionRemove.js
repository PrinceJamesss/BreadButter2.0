const { formatArray, formatPerms } = require('../../utils/Utils');
const { Collection } = require("discord.js");
const profileModel = require("../../models/profileSchema");
import('mongoose');


module.exports = class messageReactionAdd extends Event {
    constructor() {
        super({
            name: "messageReactionRemove",
            once: false,
        });
    }
    async exec(reaction, interaction, user, guild) {
        
        const wEmoji = this.client.emojis.cache.get('871965544738357258');
        if (reaction.message.channel.id === '865991991821074444') {
            if (reaction.message.attachments.size > 0) { if (reaction.emoji.id === '871965544738357258') {

                
                const response = await profileModel.findOneAndUpdate(
                    {
                        userID: reaction.message.author.id,
                    },
                    {
                        $inc: {
                            reacts: -1,
                        },
                    }
                )
            }

        this.client.logger.log(`A reaction was removed from (${reaction.message.author.tag}) Success Post!`, { tag: 'messageReactionRemove' });
            }
    }
    }
}