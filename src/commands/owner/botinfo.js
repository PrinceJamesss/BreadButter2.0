const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const cooldown = new Set();

module.exports = class Botinfo extends Command {
    constructor() {
        super({
            name: "botinfo",
            aliases: ["info"],
            description: "Bot Information Embed",
            usage: "<code>",
            category: "Owner",
            ownerOnly: true,
            cooldown: 3000,
            memberPerms: [],
            clientPerms: [],
        });
    }
    async exec(message, args) {
            const d = moment.duration(message.client.uptime);
            const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
            const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
            const prefix = "!"
            const clientStats = stripIndent`
              Servers   :: ${message.client.guilds.cache.size}
              Users     :: ${message.client.users.cache.size}
              Channels  :: ${message.client.channels.cache.size}
              WS Ping   :: ${Math.round(message.client.ws.ping)}ms
              Uptime    :: ${days} and ${hours}
              Prefix    :: ${prefix}
           `;
            const { totalMemMb, usedMemMb } = await mem.info();
            const serverStats = stripIndent`
              OS        :: ${await os.oos()}
              Cores     :: ${cpu.count()}
              CPU Usage :: ${await cpu.usage()} %
              RAM       :: ${totalMemMb} MB
              RAM Usage :: ${usedMemMb} MB
            `;
        
            const embed = new MessageEmbed()
            .setTitle('Bot\'s Statistics')
            .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
            .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
            .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] });
           // }
            cooldown.add(message.author.id);
            setTimeout(() => {
                 cooldown.delete(message.author.id)
             }, 10000); //10 sec = 10000
         }
    }