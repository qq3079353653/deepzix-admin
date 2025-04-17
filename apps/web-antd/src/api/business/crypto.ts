import { requestClient } from '#/api/request';

export const cryptoApi = () => {
  return {
    /**
     * 获取session和非对称后端公钥
     *
     * @param secretKeyCreate
     */
    fetchSession: (secretKeyCreate: Crypto.SecretKeyCreate) => {
      return requestClient.post<Crypto.Session>(
        '/deepzix-uaa/identity/session',
        secretKeyCreate,
      );
    },
    /**
     * 用后端公钥加密前端公钥，再使用前端公钥加密对称密钥并传给前端，前端再解密后端对称密钥。前端与后端多次确认，确保不被窃取
     *
     * @param sessionId 会话ID
     * @param publicKey 后端公钥加密的前端公钥
     */
    exchange: (sessionId: string, publicKey: string) => {
      return requestClient.post<string>('/deepzix-uaa/identity/exchange', {
        sessionId,
        publicKey,
      });
    },
  };
};
