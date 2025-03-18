import { createStyles } from "antd-style";

export const useStyle = createStyles(({ token, css }) => {
    return {
      layout: css`
        width: 100%;
        min-width: 1000px;
        height: 722px;
        border-radius: ${token.borderRadius}px;
        display: flex;
        background: ${token.colorBgContainer};
        font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
        .ant-prompts {
          color: ${token.colorText};
        }
      `,
      welcome: css`
        text-align: left;
      `,
      menu: css`
        background: ${token.colorBgLayout}80;
        width: 280px;
        height: 100%;
        display: flex;
        flex-direction: column;
      `,
      conversations: css`
        padding: 0 12px;
        flex: 1;
        overflow-y: auto;
      `,
      chat: css`
        height: 100%;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: ${token.paddingLG}px;
        gap: 16px;
        justify-content: center;
      `,
      messages: css`
        width: 100%;
        flex: 1;
      `,
      placeholder: css`
        padding-top: 32px;
      `,
      sender: css`
        box-shadow: ${token.boxShadow};
        &.ant-sender:focus-within {
          border-color: #703E97;
        }
        .ant-sender-actions-list {
          .ant-btn-variant-solid.ant-btn-icon-only.ant-sender-actions-btn.ant-sender-actions-btn-disabled {
            background: #703E97;
          }
          .ant-btn-variant-solid:not(:disabled):not(.ant-btn-disabled):hover {
            background: #703E97;
            color: #fff;
          }
          .ant-sender-actions-btn{
            background: #703E97;
            color: #fff;
          }
        }
      `,
      logo: css`
        display: flex;
        height: 72px;
        align-items: center;
        justify-content: start;
        padding: 0 24px;
        box-sizing: border-box;
  
        img {
          width: 24px;
          height: 24px;
          display: inline-block;
        }
  
        span {
          display: inline-block;
          margin: 0 8px;
          font-weight: bold;
          color: ${token.colorText};
          font-size: 16px;
        }
      `,
      addBtn: css`
        background: #1677ff0f;
        border: 1px solid #1677ff34;
        width: calc(100% - 24px);
        margin: 0 12px 24px 12px;
      `,
      thoughtChain: css`
        background: #eeeeef;
        text-align: left;
        margin: 0 12px 14px 0;
        column-gap: 3px;
  
        &.ant-thought-chain.ant-thought-chain-middle
          .ant-thought-chain-item
          .ant-thought-chain-item-header {
          width:220px;
          background: #F4F0F7;
          column-gap: 10px;
        }
        &.ant-thought-chain.ant-thought-chain-middle>.ant-thought-chain-item .ant-thought-chain-item-header::before {
            height: 0;
        }
      `,
    };
  });