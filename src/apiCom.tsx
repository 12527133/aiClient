import { useXAgent, useXChat, Sender, Bubble, XRequest } from "@ant-design/x";
import React from "react";

const { create } = XRequest({
  baseURL: "https://api.siliconflow.cn/v1/chat/completions",
  model: "deepseek-ai/DeepSeek-V3",
  fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => {
    // 添加自定义 headers
    const headers = new Headers(init?.headers || {});
    headers.set(
      "Authorization",
      `Bearer sk-vzuijnrppxxjugvnoapfgeaznkkhnetxqconuxoaxbqtfeys`
    );
    // headers.append("Content-Type", "application/json");
    // 返回 fetch 请求
    return fetch(input, {
      ...init,
      headers,
    });
  },
  // fetch: async (baseURL: any, options: any) => {
  //   const response = await fetch(baseURL, {
  //     ...options,
  //     headers: {
  //       Authorization: `Bearer sk-vzuijnrppxxjugvnoapfgeaznkkhnetxqconuxoaxbqtfeys`,
  //       ...options.headers,
  //     },
  //   });
  //   return response;
  // },
});

const Component: React.FC = () => {
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages, message } = info;
      const { onUpdate } = callbacks;

      // current message
      console.log("message", message);
      // messages list
      console.log("messages", messages);

      let content: string = "";

      try {
        create(
          {
            messages: [{ role: "user", content: message }],
            stream: true,
          },
          {
            onSuccess: (chunks) => {
              console.log("sse chunk list", chunks);
            },
            onError: (error) => {
              console.log("error", error);
            },
            onUpdate: (chunk) => {
              // 检查 chunk.data 是否为合法 JSON
              if (chunk.data.trim() === "[DONE]") {
                // 如果是 [DONE]，跳过解析
                return;
              }

              console.log("sse object", chunk);

              const data = JSON.parse(chunk.data);

              content += data?.choices[0].delta.content;

              onUpdate(content);
            },
          }
        );
      } catch (error) {}
    },
  });

  const {
    // use to send message
    onRequest,
    // use to render messages
    messages,
  } = useXChat({ agent });

  const items = messages.map(({ message, id }) => ({
    // key is required, used to identify the message
    key: id,
    content: message,
  }));

  return (
    <div>
      <Bubble.List items={items} />
      <Sender onSubmit={onRequest} />
    </div>
  );
};

export default Component;
