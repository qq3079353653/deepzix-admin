import type { CipherMode } from 'sm-crypto';

import CryptoJS from 'crypto-js';
import { sm2, sm4 } from 'sm-crypto';

export class Crypto<T extends object> {
  /** Secret */
  secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  /**
   * 解密数据
   *
   * @param cipherText 密文
   */
  decrypt(cipherText: string) {
    const decrypted = CryptoJS.AES.decrypt(cipherText, this.secret);
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!originalText) {
      return null;
    }
    try {
      return JSON.parse(originalText) as T;
    } catch {
      // avoid parse error
      return null;
    }
  }

  /**
   * 加密数据
   *
   * @param data 待加密对象
   */
  encrypt(data: T): string {
    const dataString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataString, this.secret).toString();
  }
}

class SM2Utilities {
  private static instance = new SM2Utilities();

  private cipherMode = 1 as CipherMode; // 1 - C1C3C2，0 - C1C2C3

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): SM2Utilities {
    return this.instance;
  }

  public createKeyPair() {
    return sm2.generateKeyPairHex();
  }

  public decrypt(content: string, privateKey: string) {
    const data = content.slice(2).toLocaleLowerCase();
    return sm2.doDecrypt(data, privateKey, this.cipherMode);
  }

  public encrypt(content: string, publicKey: string) {
    return `04${sm2.doEncrypt(content, publicKey, this.cipherMode)}`;
  }
}

class SM4Utilities {
  private static instance = new SM4Utilities();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): SM4Utilities {
    return this.instance;
  }

  public decrypt(content: string, privateKey: string) {
    return sm4.decrypt(content, privateKey);
  }

  public encrypt(content: string, publicKey: string) {
    return sm4.encrypt(content, publicKey);
  }
}

export const SM2Utils = SM2Utilities.getInstance();
export const SM4Utils = SM4Utilities.getInstance();
