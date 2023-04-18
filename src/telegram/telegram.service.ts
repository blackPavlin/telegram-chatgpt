import { Telegraf, session } from 'telegraf';
import { SessionContext } from './context/context.interface.js';
import { ConfigService } from '../config/config.interface.js';
import { OpenaiService } from '../openai/openai.interface.js';
import { StartCommand } from './command/start.command.js';
import { MessageEvent } from './event/message.event.js';

export class TelegramService {
    constructor(
        private readonly configService: ConfigService,
        private readonly openaiService: OpenaiService,
    ) {
        this.telegraf = new Telegraf<SessionContext>(
            configService.get('TELEGRAM_BOT_TOKEN'),
        );

        this.telegraf.use(session());

        const startCommand = new StartCommand(this.telegraf);
        const messageEvent = new MessageEvent(this.telegraf, this.openaiService);

        startCommand.register();
        messageEvent.register();
    }

    private readonly telegraf: Telegraf<SessionContext>;

    public async launch(): Promise<void> {
        return this.telegraf.launch();
    }

    public stop(reason?: string): void {
        return this.telegraf.stop(reason);
    }
}
