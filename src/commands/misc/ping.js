const { embed, removeDuplicates, formatPerms, formatArray } = require('../../utils/Utils');

module.exports = class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            aliases: ["pong"],
            description: "Ping command",
            category: "Misc",
            ownerOnly: false,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, args, data) {
        const emb = embed()
            .setColor('2f3136')
            .setDescription(`Database: ${Math.round(await this.client.databasePing())}ms\nBot: ${Math.round(message.createdTimestamp - Date.now())}ms`)
            .setFooter({ text: `Ping - ${message.author.tag}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' });
        return message.channel.send({ embeds: [emb] });
    }
}