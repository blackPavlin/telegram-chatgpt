import { Command } from './command.abstract.js';

export class StartCommand extends Command {
    public register(): void {
        this.telegraf.start(async (ctx) => {
            await ctx.telegram.sendMessage(ctx.message.chat.id, 'Hello! How can I assist you today?');
        });
    }
}
