import { Context } from 'koa';
import { QwenService } from '../services/qwen';

interface RequestBody {
  input: string; // 根据需要添加其他字段
}

export class QwenController {
  public static async getQwenResponse(ctx: Context): Promise<void> {
    const requestBody = ctx.request.body as RequestBody;
    const userInput = requestBody.input;  // 现在 TypeScript 知道 input 是 string 类型
    const response = await QwenService.getResponse(userInput);
    ctx.body = response;
  }
}
