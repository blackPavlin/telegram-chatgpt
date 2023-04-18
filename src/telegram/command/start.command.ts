import { Command } from './command.abstract.js';

export class StartCommand extends Command {
    public register(): void {
        this.telegraf.start(async (ctx) => {
            await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello! I am an AI language model, 
                designed to assist with various tasks like generating text,
                translating languages, answering questions, and more.
                How can I assist you today?`,
            );
        });
    }
}
