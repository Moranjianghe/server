// qwenDao.ts
import axios from 'axios';
import { QwenInput } from '../models/qwen';

export class QwenDao {
  private static apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

  public static async generateResponse(input: QwenInput): Promise<any> {
    const apiKey = process.env.DASHSCOPE_API_KEY;

    const response = await axios.post(this.apiUrl, {
      model: "qwen-plus",
      input: input,
      parameters: {
        enable_search: true,
        result_format: "message"
      }
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  }
}
