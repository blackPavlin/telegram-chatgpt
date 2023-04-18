import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ConfigService } from './config/config.service.js';
import { OpenaiService } from './openai/openai.service.js';
import { TelegramService } from './telegram/telegram.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configService = new ConfigService(path.join(__dirname, '..', 'config','.env'));
const openaiService = new OpenaiService(configService);
const telegramService = new TelegramService(configService, openaiService);

telegramService.launch()
    .catch((error) => console.error(error));

process.once('SIGINT', () => telegramService.stop('SIGINT'));
process.once('SIGTERM', () => telegramService.stop('SIGTERM'));
