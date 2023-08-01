import { ApplicationCommandType, ColorResolvable, EmbedBuilder, Guild, GuildMember } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "apagar",
    type: ApplicationCommandType.Message,
    async run({ interaction }) {
        if (!interaction.isMessageContextMenuCommand()) return;
        const member = interaction.member as GuildMember;
        const guild = interaction.guild as Guild;
        const { targetMessage } = interaction;
        
        const { author, channel } = targetMessage;

        try {
            await targetMessage.delete().catch((reason) => console.log(reason));
            interaction.reply({ephemeral: true, content: "A mensagem foi deletada!"});
        } catch (error) {
            console.log(error)
            interaction.reply({ephemeral: true, content: "Ocorreu um erro ao tentar apagar a mensagem"})
        }

        try {
            
            const clogs = guild.channels.cache.find(c => c.name == "logs");
    
            if (clogs && clogs.isTextBased()){
                clogs.send({embeds: [
                    new EmbedBuilder({
                        title: "Mensagem apagada",
                        fields: [
                            {name: "Canal", value: `\`${channel}\``, inline: true},
                            {name: "Author", value: `\`${author.username}\``, inline: true},
                            {name: "Apagada por", value: `\`${member}\``, inline: true},
                        ],
                        description: `\`**Conteúdo da mensagem**\`\n ${targetMessage}`
                    }).setColor(config.color.DarkViolet as ColorResolvable)
                ] })
            }
        } catch (error) {
            console.log(error)
            interaction.reply({ephemeral: true, content: "Ocorreu um erro ao tentar enviar a mensagem de log"})
        }
    },
})