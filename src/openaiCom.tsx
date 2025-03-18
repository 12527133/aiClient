import { useXAgent, useXChat, Sender, Bubble } from "@ant-design/x";
import OpenAI from "openai";
import React from "react";

const client = new OpenAI({
  baseURL: "https://api.siliconflow.cn/v1", // 不带入chat/completions
  apiKey: "sk-vzuijnrppxxjugvnoapfgeaznkkhnetxqconuxoaxbqtfeys", // 不带入Bearer
  dangerouslyAllowBrowser: true,
});

const OpenAIComponent: React.FC = () => {
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages, message } = info;

      const { onSuccess, onUpdate, onError } = callbacks;

      // current message
      console.log("message", message);

      // history messages
      console.log("messages", messages);

      let content: string = "";

      try {
        const stream = await client.chat.completions.create({
          model: "deepseek-ai/DeepSeek-R1",
          // if chat context is needed, modify the array
          messages: [
            {
              role: "user",
              content: message as string,
            },
          ],
          // stream mode
          stream: true,
        });

        for await (const chunk of stream) {
          content += chunk.choices[0]?.delta?.content || "";

          onUpdate(content);
        }

        onSuccess(content);
      } catch (error) {
        // handle error
        // onError();
      }
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

export default OpenAIComponent;
