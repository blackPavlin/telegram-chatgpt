import { envSchema } from 'env-schema';
import { schema } from './config.schema.js';
import { Config } from './config.interface.js';

export class ConfigService<T = Config> {
    constructor(path: string) {
        this.config = envSchema<T>({ schema, dotenv: { path } });
    }

    private readonly config: T;

    public get(key: keyof T): T[keyof T] {
        return this.config[key];
    }
}
