// qwenService.ts
import { QwenDao } from '../dao/qwen';
import { QwenInput } from '../models/qwen';

export class QwenService {
  public static async getResponse(userInput: string): Promise<any> {
    const input: QwenInput = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput }, // 确保 userInput 是字符串
      ]
    };
    
    return await QwenDao.generateResponse(input);
  }
}
