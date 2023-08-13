import { ApplicationCommandType, ColorResolvable, EmbedBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";

export default new Command({
    name: "ping",
    description: "reply with pong",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }) {

        const startTime = Date.now();

        const embed = new EmbedBuilder()
            .setColor(config.color.Purple as ColorResolvable)
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user?.avatarURL() || undefined })
            .setDescription(`Olá ${interaction.user.username} \n\`Calculando a latência do bot!\``)
            .setTimestamp()

        const embed2 = new EmbedBuilder()
            .setColor(config.color.Purple as ColorResolvable)
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user?.avatarURL() || undefined })
            .setDescription(`Olá ${interaction.user.username} \n🏓 A latência do bot é \`${interaction.client.ws.ping}ms\``)
            .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: true }).then(msg => {
            setTimeout(() => {
                msg.edit({ embeds: [embed2] });
            }, 2000);
        })
    },
})