import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ColorResolvable, EmbedBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { config } from "../..";
import dotenv from "dotenv";
dotenv.config();

export default new Command({
    name: "botinfo",
    description: "Veja a descrição do bot.",
    type: ApplicationCommandType.ChatInput,
    run({ interaction, options }) {

        let bot = interaction.client.user.tag;
        let botAvatar = interaction.client.user.displayAvatarURL();
        let dono = process.env.DONO;
        let membros = interaction.client.users.cache.size;
        let servidores = interaction.client.guilds.cache.size;
        let canais = interaction.client.channels.cache.size;
        let linguagem = "TypeScript";
        let livraria = "Discord.js";
        let ping = interaction.client.ws.ping;
    try {
        let embed = new EmbedBuilder()
            .setColor(config.color.DarkViolet as ColorResolvable)
            .setTitle(`Informações do bot`)
            .setThumbnail(botAvatar)
            .setFooter({ iconURL: botAvatar, text: bot })
            .setTimestamp()
            .setDescription(`Olá ${interaction.user}, veja  minhas informações abaixo:\n
            \n> 🤖 Nome: \`${bot}\`.\n> 🤖 Dono: \`${interaction.client.users.cache.get(dono || 'Desconhecido')}\`.\n\n> ⚙️ Membros: \`${membros}\`.\n> ⚙️ Servidores: \`${servidores}\`.\n> ⚙️ Canais: \`${canais}\`.\n> ⚙️ Ping: \`${ping}\`.\n\n> 📚 Linguagem de programação: \`${linguagem}\`.\n> 📚 Livraria: \`${livraria}\`.`)

        let row = new ActionRowBuilder<ButtonBuilder>({components: [
            new ButtonBuilder({
                url: "https://discord.gg/YEUXwjBusF",
                label: "Suporte",
                style: ButtonStyle.Link
            }),
            new ButtonBuilder({
                url: "https://github.com/DevRosasNegras/Titania-BotTS",
                label: "Documentação",
                style: ButtonStyle.Link
            }),
            new ButtonBuilder({
                url: "https://github.com/DevRosasNegras/Titania-BotTS",
                label: "Diretrizes",
                style: ButtonStyle.Link
            })
        ]})

        interaction.reply({ embeds: [embed], components: [row]})
    } catch (err) {
        console.log('Ocorreu um erro:' + err);
        interaction.reply({content: "Ocorreu um erro ao executar o comando.", ephemeral: true })
    }
    },
})