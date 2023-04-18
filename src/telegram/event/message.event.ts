import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { SessionContext } from '../context/context.interface.js';
import { Event } from './event.abstract.js';
import { OpenaiService, ChatCompletionRequestMessage } from '../../openai/openai.interface.js';

export class MessageEvent extends Event {
    constructor(
        telegraf: Telegraf<SessionContext>,
        private readonly openai: OpenaiService,
    ) {
        super(telegraf);
    }

    public register(): void {
        this.telegraf.on(message('text'), async (ctx) => {
            const messages: ChatCompletionRequestMessage[] = [
                { role: 'user', content: ctx.message.text },
            ];
            const [responseMessages] = await Promise.all([
                this.openai.createChatCompletion(ctx.message.chat.id, messages),
                ctx.telegram.sendChatAction(ctx.message.chat.id, 'typing'),
            ]);
            for (const message of responseMessages) {
                await ctx.telegram.sendMessage(ctx.message.chat.id, message.content);
            }
        });
    }
}
