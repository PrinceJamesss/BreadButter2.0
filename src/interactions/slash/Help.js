const { embed, removeDuplicates, formatPerms } = require('../../utils/Utils');
const packFile = require('../../../package.json')
const packVersion = packFile.version

module.exports = class SlashHelp extends Interaction {
    constructor() {
        super({
            name: "help",
            description: "Help command",
            options: [
            { type: 3, name: 'command', description: 'Name of command you want to show informations', required: false}
            ]
        });
    }
    async exec(interaction, data) {
        const cmd = this.client.commands.get(interaction.options.getString('command')) || this.client.commands.get(this.client.aliases.get(interaction.options.getString('command')));
        let emb;
        if (!cmd) {
            emb = embed()
                .setColor('#f09719')
                .setTitle('Help panel')
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setFooter({ text: `Help - ${interaction.user.username} - Version ${packVersion}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' })
            const categories = removeDuplicates(this.client.commands.map(cmd => cmd.category));
            for (const category of categories) {
                const dir = this.client.commands.filter(cmd => cmd.category === category);
                await emb.addField(`__${category}__ [${dir.size}]`, `${this.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' ')}`);
            }
            return interaction.reply({ ephemeral: true, embeds: [emb] });
        } else {
            emb = embed()
                .setColor('#f09719')
                .setTitle('Help panel')
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription([
                    `**Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : `No aliases.`}`,
                    `**Description:** ${cmd.description}`,
                    `**Category:** ${cmd.category}`,
                    `**Permission:** ${cmd.memberPerms.toArray().length > 0 ? `${cmd.memberPerms.toArray().map((perm) => `\`${formatPerms(perm)}\``).join(', ')}` : `No permission required.`}`,
                    `**Cooldown:** ${cmd.cooldown / 1000} seconds`,
                    `**Usage:** \`${`${data.guild?.prefix}${cmd.name} ${cmd.usage || ''}`.trim()}\``,
                ].join('\n'))
                .setFooter({ text: `Help - ${interaction.user.username} - Version ${packVersion}`, iconURL: 'https://i.ibb.co/ynn8cws/Logo.jpg' });
                
            return interaction.reply({ ephemeral: true, embeds: [emb] });
        }
    }
}
