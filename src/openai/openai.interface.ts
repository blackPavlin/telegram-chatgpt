import { Readable } from 'node:stream';
import { ChatCompletionRequestMessage } from 'openai';

export { ChatCompletionRequestMessage };

export interface OpenaiService {
    createChatCompletion(chatId: number, messages: ChatCompletionRequestMessage[]):
        Promise<ChatCompletionRequestMessage[]>;
        createTranscription(stream: Uint8Array, lang: string): Promise<string>;
}
