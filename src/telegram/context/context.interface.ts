import { Context } from 'telegraf';
import { Update } from 'telegraf/types';

export interface SessionContext <U extends Update = Update> extends Context<U> {
    session: {};
}
