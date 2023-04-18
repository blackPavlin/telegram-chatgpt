import { JSONSchemaType } from 'env-schema';
import { Config } from './config.interface.js';

export const schema: JSONSchemaType<Config> = {
    type: 'object',
	required: [
        'NODE_ENV',
        'TELEGRAM_BOT_TOKEN',
        'OPENAI_TOKEN',
        'OPENAI_MODEL',
    ],
    properties: {
        NODE_ENV: {
            type: 'string',
            enum: ['development', 'production'],
        },
        TELEGRAM_BOT_TOKEN: { type: 'string' },
        OPENAI_TOKEN: { type: 'string' },
        OPENAI_MODEL: { type: 'string' },
    },
} as const;
