import { Telegraf } from 'telegraf';
import { SessionContext } from '../context/context.interface.js';

export abstract class Command {
    constructor(
        protected readonly telegraf: Telegraf<SessionContext>,
    ) {}

    public abstract register(): void;
}
