import { envSchema, JSONSchemaType } from 'env-schema';

export interface Config {
    TELEGRAM_BOT_TOKEN: string;
    OPENAI_TOKEN: string;
}

const schema: JSONSchemaType<Config> = {
    type: 'object',
	required: [
        'TELEGRAM_BOT_TOKEN',
        'OPENAI_TOKEN',
    ],
    properties: {
        TELEGRAM_BOT_TOKEN: { type: 'string' },
        OPENAI_TOKEN: { type: 'string' },
    },
} as const;

export function createConfig(path: string): Config {
	return envSchema({ schema, dotenv: { path } });
}
