/** 加密 */
declare namespace Crypto {
  /** 创建加密密钥对象 */
  interface SecretKeyCreate {
    /** 会话id */
    sessionId?: string;
    /** oauth2客户端Id */
    clientId: string;
    /** 客户端秘钥 */
    clientSecret: string;
  }

  /** 身份认证 */
  interface Session {
    /** 自定义sessionId */
    sessionId: string;
    /**
     * 服务器端非对称加密算法公钥
     *
     * 1. RSA 为 Base64 格式
     * 2. SM2 为 Hex 格式
     */
    publicKey: string;
  }
}
