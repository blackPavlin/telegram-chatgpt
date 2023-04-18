import { ChatCompletionRequestMessage } from 'openai';

export { ChatCompletionRequestMessage };

export interface OpenaiService {
    createChatCompletion(chatId: number, messages: ChatCompletionRequestMessage[]):
        Promise<ChatCompletionRequestMessage[]>;
}
