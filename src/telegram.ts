import { Telegraf, Context, session } from 'telegraf';
import { Update } from 'telegraf/types';
import { message } from 'telegraf/filters';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';

interface SessionContext <U extends Update = Update> extends Context<U> {
    session: {
        messages: ChatCompletionRequestMessage[];
    };
}

export function createTelegramBot(token: string, openai: OpenAIApi): Telegraf<SessionContext> {
    const telegraf = new Telegraf<SessionContext>(token);

    telegraf.use(session({
        defaultSession: () => ({
            messages: new Array<ChatCompletionRequestMessage>(),
        }),
    }));

    telegraf.on(message('text'), async (ctx) => {
        const messages: ChatCompletionRequestMessage[] = [
            ...ctx.session.messages,
            { role: 'user', content: ctx.message.text },
        ];

        const [{ data }] = await Promise.all([
            openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                user: `user:${ctx.message.chat.id}`,
                messages,
            }),
            ctx.telegram.sendChatAction(ctx.message.chat.id, 'typing'),
        ]);

        const [{ message }] = data.choices;
        if (!message) {
            return;
        }

        await ctx.telegram.sendMessage(ctx.message.chat.id, message.content);
        ctx.session.messages = [...messages, message];
    });

    return telegraf;
}
