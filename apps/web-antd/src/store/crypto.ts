import { defineStore } from 'pinia';

import { cryptoApi } from '#/api';
import { SM2Utils, SM4Utils } from '#/utils';

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    sessionId: '',
    symmetricKey: '',
    publicKey: '',
    secretKey: '8b026adcaa59468fd47ef361c623ce10',
  }),
  actions: {
    setSessionId(sessionId: string) {
      this.sessionId = sessionId;
    },
    getSessionId() {
      return this.sessionId;
    },
    getSecretKey() {
      return this.secretKey;
    },
    setSymmetricKey(symmetricKey: string) {
      this.symmetricKey = SM4Utils.encrypt(symmetricKey, this.getSecretKey());
    },
    getSymmetricKey() {
      return SM4Utils.decrypt(this.symmetricKey, this.getSecretKey());
    },
    setPublicKey(publicKey: string) {
      this.publicKey = SM4Utils.encrypt(publicKey, this.getSecretKey());
    },
    /**
     * 对称加密
     *
     * @param content
     */
    encrypt(content: string) {
      const key = this.getSymmetricKey();
      return SM4Utils.encrypt(content, key);
    },
    /**
     * 对称解密
     *
     * @param content
     */
    decrypt(content: string) {
      const key = this.getSymmetricKey();
      return SM4Utils.decrypt(content, key);
    },
    /**
     * 交换密钥获取后端对称密钥
     *
     * @param identity 身份ID
     */
    async exchange(identity = '') {
      const session = await cryptoApi().fetchSession({
        sessionId: identity,
        clientId: import.meta.env.VITE_OAUTH2_CLIENT_ID,
        clientSecret: import.meta.env.VITE_OAUTH2_CLIENT_SECRET,
      });
      if (session) {
        const sessionId = session.sessionId;
        const backendPublicKey = session.publicKey;
        const pair = SM2Utils.createKeyPair();
        const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
        const key = await cryptoApi().exchange(sessionId, encryptData);
        if (key) {
          const symmetricKey = SM2Utils.decrypt(key, pair.privateKey);
          this.setSessionId(sessionId);
          this.setSymmetricKey(symmetricKey);
          this.setPublicKey(backendPublicKey);
        }
      }
    },
  },
  persist: true,
});
