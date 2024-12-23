# API 文档

## 用户相关接口

### 用户注册

**URL:** `/users/register`

**方法:** `POST`

**请求体:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**响应:**
```json
{
  "message": "User created with ID: {userId}"
}
```

### 用户登录

**URL:** `/users/login`

**方法:** `POST`

**请求体:**
```json
{
  "username": "string",
  "password": "string"
}
```

**响应:**
```json
{
  "token": "string"
}
```

## 帖子相关接口

### 创建帖子

**URL:** `/posts`

**方法:** `POST`

**请求头:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**请求体:**
```json
{
  "title": "string",
  "content": "string"
}
```

**响应:**
```json
{
  "message": "Post created",
  "postId": "number"
}
```

### 获取帖子列表

**URL:** `/posts`

**方法:** `GET`

**响应:**
```json
[
  {
    "id": "number",
    "user_id": "number",
    "title": "string",
    "content": "string",
    "likes_count": "number",
    "created_at": "string",
    "updated_at": "string"
  }
]
```

### 点赞帖子

**URL:** `/posts/{postId}/like`

**方法:** `POST`

**请求头:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**响应:**
```json
{
  "message": "Post liked" | "Post unliked"
}
```

## 评论相关接口

### 添加评论

**URL:** `/comments`

**方法:** `POST`

**请求头:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**请求体:**
```json
{
  "post_id": "number",
  "content": "string"
}
```

**响应:**
```json
{
  "message": "Comment added",
  "commentId": "number"
}
```

### 获取帖子评论

**URL:** `/posts/{postId}/comments`

**方法:** `GET`

**响应:**
```json
[
  {
    "id": "number",
    "user_id": "number",
    "post_id": "number",
    "content": "string",
    "created_at": "string"
  }
]
```

## AI 聊天相关接口

### 与 AI 聊天

**URL:** `/aichat/chat`

**方法:** `POST`

**请求头:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**请求体:**
```json
{
  "prompt": "string"
}
```

**响应:**
```json
{
  "response": "string"
}
```

## Qwen 相关接口

### 获取 Qwen 响应

**URL:** `/qwen/qwen`

**方法:** `POST`

**请求头:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**请求体:**
```json
{
  "input": "string"
}
```

**响应:**
```json
{
  "response": "string"
}
```
