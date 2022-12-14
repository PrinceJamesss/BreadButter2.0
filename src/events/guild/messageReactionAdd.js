const { formatArray, formatPerms } = require('../../utils/Utils');
const { Collection } = require("discord.js");
const profileModel = require("../../models/profileSchema");
import('mongoose');


module.exports = class messageReactionAdd extends Event {
    constructor() {
        super({
            name: "messageReactionAdd",
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
                            reacts: 1,
                        },
                    }
                )
            }

        this.client.logger.log(`There was just a reaction to (${reaction.message.author.tag}) Success Post!`, { tag: 'messageReactionAdd' });
            }
    }

    if (reaction.message.channel.id === '1050546624285380618') {

        if (reaction.emoji.name === '✅') {
            console.log("working")
        }

}
    }
}