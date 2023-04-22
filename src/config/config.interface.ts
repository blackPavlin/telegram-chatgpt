export interface Config {
    NODE_ENV: string;
    TELEGRAM_BOT_TOKEN: string;
    OPENAI_TOKEN: string;
    OPENAI_CHAT_MODEL: string;
    OPENAI_TRANSCRIPTION_MODEL: string;
}

export interface ConfigService {
    get(key: keyof Config): Config[keyof Config];
}
