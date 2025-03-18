import {
  Attachments,
  Bubble,
  Conversations,
  ConversationsProps,
  Prompts,
  Sender,
  ThoughtChain,
  Welcome,
  useXAgent,
  useXChat,
} from "@ant-design/x";
import React, { useEffect } from "react";
import IconBase from "./assets/logo512.png";
import { useStyle } from "./styles";

import {
  CloudUploadOutlined,
  CommentOutlined,
  EllipsisOutlined,
  FireOutlined,
  HeartOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ReadOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Badge, Button, type GetProp, Space } from "antd";
import { url } from "inspector";

const renderTitle = (icon: React.ReactElement, title: string) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);

const defaultConversationsItems = [
  {
    key: "0",
    label: "默认第一个对话",
  },
];

const senderPromptsItems: GetProp<typeof Prompts, "items"> = [
  {
    key: "1",
    description: "客户购进毛销额的口径",
    icon: <FireOutlined style={{ color: "#FF4D4F" }} />,
  },
  {
    key: "2",
    description: "品牌/MNC-out Volume份额定义",
    icon: <ReadOutlined style={{ color: "#1890FF" }} />,
  },
  {
    key: "3",
    description: "终端购进毛销额的依赖数据有哪些？",
    icon: <ReadOutlined style={{ color: "#1890FF" }} />,
  },
];

const roles: GetProp<typeof Bubble.List, "roles"> = {
  ai: {
    placement: "start",
    typing: { step: 5, interval: 20 },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
  },
  local: {
    placement: "end",
    variant: "shadow",
  },
};

const Independent: React.FC = () => {
  // ==================== Style ====================
  const { styles } = useStyle();

  // ==================== State ====================
  const [headerOpen, setHeaderOpen] = React.useState(false);

  const [content, setContent] = React.useState("");

  const [conversationsItems, setConversationsItems] = React.useState(
    defaultConversationsItems
  );

  const [activeKey, setActiveKey] = React.useState(
    defaultConversationsItems[0].key
  );

  const [attachedFiles, setAttachedFiles] = React.useState<
    GetProp<typeof Attachments, "items">
  >([]);

  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess }) => {
      onSuccess(`Mock success return. You said: ${message}`);
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });

  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = (nextContent: string) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent("");
  };

  const onPromptsItemClick: GetProp<typeof Prompts, "onItemClick"> = (info) => {
    onRequest(info.data.description as string);
  };

  // const items: GetProp<ConversationsProps, "items"> = Array.from({
  //   length: 4,
  // }).map((_, index) => ({
  //   key: `item${index + 1}`,
  //   label: `Conversation Item ${index + 1}`,
  //   disabled: index === 3,
  //   group: index === 3 ? "Group2" : "Group1",
  // }));

  const onAddConversation = () => {
    setConversationsItems(
      [
        ...conversationsItems,
        {
          key: `${conversationsItems.length}`,
          label: `新对话 ${conversationsItems.length}`,
        },
      ].map((_, index) => ({
        key: `item${index + 1}`,
        label: `Conversation Item ${index + 1}`,
        disabled: index === 3,
        group: index < 3 ? "Group2" : "Group1",
      }))
    );
    setActiveKey(`${conversationsItems.length}`);
  };

  const onConversationClick: GetProp<typeof Conversations, "onActiveChange"> = (
    key
  ) => {
    setActiveKey(key);
  };

  const handleFileChange: GetProp<typeof Attachments, "onChange"> = (info) =>
    setAttachedFiles(info.fileList);

  // ==================== Nodes ====================
  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        style={{ textAlign: "left", marginBottom: 40 }}
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="你好！欢迎使用问答机器人"
        description="我能为您解答在看板、折扣、奖金中不同指标的定义以及其口径，也能帮您区分不同指标依赖的数据源相关信息”，作为配置项，可以随时更新"
      />
    </Space>
  );

  const thinkItems = [
    {
      icon: <LoadingOutlined />,
      title: "深度思考中 (用时18秒)",
      content:
        "深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中深度思考中",
      key: "THOUGHT_NODE2",
    },
  ];

  const items: GetProp<typeof Bubble.List, "items"> = messages.map(
    ({ id, message, status }) => ({
      key: id,
      loading: status === "loading",
      role: status === "local" ? "local" : "ai",
      content: message,
      messageRender(content) {
        console.log("content", status);
        return status === "local" ? (
          message
        ) : (
          <div style={{ textAlign: "left" }}>
            <ThoughtChain
              className={styles.thoughtChain}
              items={thinkItems}
              collapsible={false}
            />
            <p>正式答案</p>
          </div>
        );
      },
    })
  );

  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button
        type="text"
        icon={<PaperClipOutlined />}
        onClick={() => setHeaderOpen(!headerOpen)}
      />
    </Badge>
  );

  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === "drop"
            ? { title: "Drop file here" }
            : {
                icon: <CloudUploadOutlined />,
                title: "Upload files",
                description: "Click or drag files to this area to upload",
              }
        }
      />
    </Sender.Header>
  );

  const logoNode = (
    <div className={styles.logo}>
      <img
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
        draggable={false}
        alt="logo"
      />
      <span>Ant Design X</span>
    </div>
  );
  const Component = ({ children }: any) => <div>{children}</div>;

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 Logo */}
        {/* {logoNode} */}
        {/* 🌟 添加会话 */}
        <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
        >
          开启新对话
        </Button>
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          onActiveChange={onConversationClick}
          groupable
        />
      </div>
      <div className={styles.chat}>
        {/* 🌟 消息列表 */}
        <Bubble.List
          items={
            items.length > 0
              ? items
              : [{ content: placeholderNode, variant: "borderless" }]
          }
          roles={roles}
          className={items.length > 0 ? styles.messages : ""}
        />
        {/* 🌟 输入框 */}
        <Sender
          placeholder="询问关于指标的任何问题"
          value={content}
          header={senderHeader}
          onSubmit={onSubmit}
          onChange={setContent}
          loading={agent.isRequesting()}
          className={styles.sender}
        />
        {/* 🌟 提示词 */}
        <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} />
      </div>
    </div>
  );
};

export default Independent;
