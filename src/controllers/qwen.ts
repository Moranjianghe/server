// qwenController.ts
import { Context } from 'koa';
import { QwenService } from '../services/qwen';

export class QwenController {
  public static async getQwenResponse(ctx: Context): Promise<void> {
    const userInput = ctx.request.body as  string ;  // 这里用 input 字段接收用户输入
    const response = await QwenService.getResponse(userInput);
    ctx.body = response;
  }
}
