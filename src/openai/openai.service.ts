import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from 'openai';
import { ConfigService } from '../config/config.interface.js';

export class OpenaiService {
    constructor(
        private readonly configService: ConfigService,
    ) {
        this.openai = new OpenAIApi(new Configuration({
            apiKey: configService.get('OPENAI_TOKEN'),
        }));
    }

    private readonly openai: OpenAIApi;

    private createChatIdentifier(chatId: number): string {
        return `user:${chatId}`;
    }

    public async createChatCompletion(
        chatId: number,
        messages: ChatCompletionRequestMessage[],
    ): Promise<ChatCompletionRequestMessage[]> {
        if (messages.length === 0) {
            return [];
        }

        const response = await this.openai.createChatCompletion({
            model: this.configService.get('OPENAI_CHAT_MODEL'),
            user: this.createChatIdentifier(chatId),
            messages,
        }).catch((error) => {
            throw new Error(error.message);
        });

        const result: ChatCompletionRequestMessage[] = [];

        for (const choice of response.data.choices) {
            if (!choice.message) {
                continue;
            }

            result.push({
                role: choice.message.role,
                content: choice.message.content,
            });
        }
        
        return result;
    }

    public async createTranscription(stream: Uint8Array, lang: string): Promise<string> {
        const response = await this.openai.createTranscription(
            stream,
            this.configService.get('OPENAI_TRANSCRIPTION_MODEL'),
            undefined,
            undefined,
            undefined,
            lang,
        ).catch((error) => {
            console.log(error?.response?.data?.error)
            throw new Error(error.message);
        });

        return response.data.text;
    }
}
