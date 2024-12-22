// src/controllers/chatController.ts

import axios from 'axios';
import { getUserSession, createUserSession } from '../dao/aiChat'; 
import { v4 as uuidv4 } from 'uuid'; // 用于生成新 session_id，确保已经安装 uuid 库
import { Context } from 'koa';

export const chatWithAI = async (ctx: Context) => {
    const userId = ctx.state.user; // 从鉴权中获取用户 ID
    const { prompt } = ctx.request.body as { prompt: string };
    const apiKey = process.env.DASHSCOPE_API_KEY;
    const appId = process.env.BAILIAN_APP_ID; // 获取真实的应用 ID

    // 检查用户是否已有 session_id
    let userSession = await getUserSession(userId);

    // 如果没有会话记录，则创建新的 session_id
    if (!userSession) {
        const newSessionId = uuidv4(); // 生成新的 session_id
        await createUserSession(userId, newSessionId);
        userSession = { session_id: newSessionId }; // 更新 userSession 以包含新 session_id
    }

    const url = `https://dashscope.aliyuncs.com/api/v1/apps/${appId}/completion`;

    const data = {
        input: {
            prompt: prompt,
            session_id: userSession.session_id, // 使用存储的 session_id
        },
        parameters: {},
        debug: {}
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        ctx.body = response.data;
    } catch (error) {
        console.error(`Error calling DashScope: ${error as Error}`);
        ctx.status = 500;
        ctx.body = { error: 'Error communicating with DashScope API' };
    }
};
