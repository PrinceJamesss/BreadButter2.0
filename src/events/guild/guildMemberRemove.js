const { MessageAttachment } = require('discord.js');

module.exports = class GuildMemberRemove extends Event {
    constructor() {
        super({
            name: "guildMemberRemove",
            once: false,
        });
    }
    async exec(member) {

    }
}