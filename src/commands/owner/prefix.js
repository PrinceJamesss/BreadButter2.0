module.exports = class Prefix extends Command {
    constructor() {
        super({
            name: "prefix",
            aliases: ["pre"],
            description: "Check/Update Guild Prefix",
            usage: "<code>",
            category: "Owner",
            ownerOnly: true,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, [prefix], data) {
        const guildLang = data.guild?.language;
        const translate = require(`../../language/${guildLang}`);
        if (!prefix) return message.reply(`${translate("PREFIX", data.guild?.prefix)}`);
        if (prefix.length > 3) return message.reply(`The prefix cannot be longer than 3 characters !`);
        data.guild.prefix = prefix;
        await data.guild.save();
        return message.reply(`Changed prefix to ${prefix}`);
    }
}
