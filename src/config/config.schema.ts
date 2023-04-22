import { JSONSchemaType } from 'env-schema';
import { Config } from './config.interface.js';

export const schema: JSONSchemaType<Config> = {
    type: 'object',
	required: [
        'NODE_ENV',
        'TELEGRAM_BOT_TOKEN',
        'OPENAI_TOKEN',
    ],
    properties: {
        NODE_ENV: {
            type: 'string',
            enum: ['development', 'production'],
        },
        TELEGRAM_BOT_TOKEN: { type: 'string' },
        OPENAI_TOKEN: { type: 'string' },
        OPENAI_CHAT_MODEL: {
            type: 'string',
            default: 'gpt-3.5-turbo',
        },
        OPENAI_TRANSCRIPTION_MODEL: {
            type: 'string',
            default: 'whisper-1',
        },
    },
} as const;
