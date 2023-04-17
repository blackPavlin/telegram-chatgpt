import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { OpenAIApi, Configuration } from 'openai';
import { createConfig } from './config.js';
import { createTelegramBot } from './telegram.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = createConfig(path.join(__dirname, '..', 'config','.env'));

const bot = createTelegramBot(
    config.TELEGRAM_BOT_TOKEN,
    new OpenAIApi(
        new Configuration({ apiKey: config.OPENAI_TOKEN }),
    ),
);

bot.launch()
    .catch((error) => console.error(error));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
