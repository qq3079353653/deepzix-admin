import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password: string;
    username: string;
    grant_type: string;
    scope: string;
  }

  /** 属性token接口参数 */
  export interface RefreshTokenParams {
    grant_type: string;
    refresh_token: string;
    scope: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
    refreshToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(
  params: AuthApi.LoginParams,
  authorization: string,
) {
  return requestClient.request<AuthApi.LoginResult>(
    '/deepzix-uaa/oauth2/token',
    {
      method: 'post',
      headers: { Authorization: authorization },
      params,
    },
  );
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi(
  body: AuthApi.RefreshTokenParams,
  authorization: string,
) {
  return baseRequestClient.request<AuthApi.LoginResult>(
    '/deepzix-uaa/oauth2/token',
    {
      method: 'post',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
    },
  );
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/deepzix-uaa/identity/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/deepzix-upms/user/codes');
}
