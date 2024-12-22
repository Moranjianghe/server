// src/services/chatService.ts

import axios from 'axios';

export const callDashScopeAPI = async (prompt: string, sessionId: string) => {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    const appId = process.env.BAILIAN_APP_ID; // 获取真实的应用 ID

    const url = `https://dashscope.aliyuncs.com/api/v1/apps/${appId}/completion`;

    const data = {
        input: {
            prompt: prompt,
            session_id: sessionId, // 使用传递的 session_id
        },
        parameters: {},
        debug: {}
    };

    const response = await axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data; // 返回 API 响应数据
};
