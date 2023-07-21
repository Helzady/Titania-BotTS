import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "limpar",
    description: "Limpar memsagens do chat.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "quantidade",
            description: "O total de mensagens a serem excluidas.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "autor",
            description: "O total de mensagens a serem excluidas.",
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    async run({interaction, options}) {
        
        if(!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;
        const { channel } = interaction;

        await interaction.deferReply({ephemeral: true})

        const amount = Math.min((options.getInteger("quantidade", true), 100));
        const mention = options.getMember("autor") as GuildMember | null;;

        if (!channel){
            interaction.editReply({content: "Não é possível limpar mensagens!"});
            return;
        }

        const messages = await channel.messages.fetch();

        if (mention){
            const messages = channel.messages.cache.filter(m => m.author.id == mention.id).first(amount);
            if(messages.length < 1){
                interaction.editReply({content: `Não foi encontrado nenhuma mensagem recente de ${mention}.`})
                return;
            }

            channel.bulkDelete(messages, true)
        .then(cleared => interaction.editReply({
            content: `Forem limpas ${cleared.size} mesagens em ${mention}!`
        }))
        .catch(() => interaction.editReply({
            content: `Ocorreu um erro ao tentar limpar mensagens em ${mention}!`
        }))

            return;
        }

        channel.bulkDelete(messages.first(amount), true)
        .then(cleared => interaction.editReply({
            content: `Forem limpas ${cleared.size} mesagens em ${channel}!`
        }))
        .catch(() => interaction.editReply({
            content: `Ocorreu um erro ao tentar limpar mensagens em ${channel}!`
        }))
    },
})