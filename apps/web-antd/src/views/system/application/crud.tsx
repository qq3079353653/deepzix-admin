import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import { applicationApi, SysDictCode, sysDictFunc } from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysApplication>) => {
    const { form } = req as { form: System.SysApplication };
    return await applicationApi().saveOrUpdateApplication({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysApplication>) => {
    const { row } = ctx as { row: System.SysApplication };
    return await applicationApi().deleteApplicationById(row.applicationId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysApplication;
  }) => {
    if (mode === 'edit') {
      return await applicationApi().findApplicationById(row.applicationId);
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await applicationApi().findPageApplication(query);
  };

  const editRequest = async (ctx: EditReq<System.SysApplication>) => {
    const { form } = ctx as { form: System.SysApplication };
    return await applicationApi().saveOrUpdateApplication({ ...form });
  };

  return {
    crudOptions: {
      container: {
        is: 'fs-layout-card',
      },
      request: {
        addRequest,
        delRequest,
        infoRequest,
        pageRequest,
        editRequest,
      },
      form: {
        labelWidth: '120px',
        wrapper: {
          width: '850px',
        },
        group: {
          type: 'collapse',
          accordion: true,
          groups: {
            base: {
              show: true,
              collapsed: false,
              header: '基础',
              columns: [
                'applicationName',
                'clientId',
                'clientIdIssuedAt',
                'clientSecret',
                'clientSecretExpiresAt',
                'clientAuthenticationMethods',
                'authorizationGrantTypes',
                'scopes',
                'redirectUris',
                'postLogoutRedirectUris',
                'description',
              ],
            },
            token: {
              show: true,
              collapsed: true,
              header: 'token设置',
              columns: [
                'authorizationCodeTimeToLive',
                'accessTokenTimeToLive',
                'deviceCodeTimeToLive',
                'refreshTokenTimeToLive',
                'accessTokenFormat',
                'idTokenSignatureAlgorithm',
                'reuseRefreshTokens',
              ],
            },
            client: {
              show: true,
              collapsed: true,
              header: 'client设置',
              columns: [
                'tokenEndpointAuthenticationSigningAlgorithm',
                'requireProofKey',
                'requireAuthorizationConsent',
                'jwkSetUrl',
              ],
            },
          },
        },
      },
      columns: {
        _index: {
          title: '序号',
          form: { show: false },
          column: {
            columnSetShow: false,
            align: 'center',
            width: '55px',
            formatter: (context) => {
              return (context.index ?? 0) + 1;
            },
          },
        },
        applicationId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        applicationName: {
          title: '应用名称',
          type: 'text',
          search: { show: true },
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入应用名称' },
            ],
          },
        },
        clientId: {
          title: '客户端ID',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 12 },
            component: {
              disabled: true,
            },
          },
        },
        clientIdIssuedAt: {
          title: '客户端颁发时间',
          type: 'date',
          column: { show: false },
          form: {
            col: { span: 12 },
            value: '2025-02-01 00:00:00',
            component: {
              disabled: true,
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
            },
          },
        },
        clientSecret: {
          title: '客户端密钥',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 12 },
            component: {
              disabled: true,
            },
          },
        },
        clientSecretExpiresAt: {
          title: '密钥过期时间',
          type: 'date',
          column: { show: false },
          form: {
            value: '2026-02-01 00:00:00',
            col: { span: 12 },
            component: {
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
            },
            helper: {
              position: 'label',
              tooltip: {
                placement: 'topLeft',
              },
              text: '为空则永不失效',
            },
          },
        },
        clientAuthenticationMethods: {
          title: '客户端认证模式',
          type: 'dict-select',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: [
              'client_secret_basic',
              'client_secret_post',
              'private_key_jwt',
              'client_secret_jwt',
            ],
            col: { span: 12 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择客户端认证模式',
              },
            ],
            component: { mode: 'multiple', 'max-tag-count': 1 },
          },
          dict: sysDictFunc(SysDictCode.ClientAuthenticationMethods),
        },
        authorizationGrantTypes: {
          title: '授权模式',
          type: 'dict-select',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: [
              'authorization_code',
              'refresh_token',
              'client_secret_basic',
              'client_credentials',
              'password',
            ],
            col: { span: 12 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择授权模式',
              },
            ],
            component: { mode: 'multiple', 'max-tag-count': 1 },
          },
          dict: sysDictFunc(SysDictCode.AuthorizationGrantTypes),
        },
        scopes: {
          title: '应用作用域',
          type: 'dict-select',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: ['message.write', 'message.read', 'openid'],
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择应用作用域',
              },
            ],
            component: { mode: 'multiple', 'max-tag-count': 3 },
          },
          dict: sysDictFunc(SysDictCode.Scope),
        },
        redirectUris: {
          title: '回调地址',
          type: 'text',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: 'http://localhost:8080',
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入回调地址' },
            ],
          },
        },
        postLogoutRedirectUris: {
          title: 'oidc回调地址',
          type: 'text',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: 'http://localhost:8080',
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入oidcLogout回调地址',
              },
            ],
          },
        },
        authorizationCodeTimeToLive: {
          title: '授权码有效期',
          type: 'number',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 12 },
            value: 300,
            rules: [
              {
                required: true,
                type: 'number',
                trigger: 'change',
                message: '请输入授权码有效期',
              },
            ],
            component: {
              showButton: false,
            },
          },
        },
        accessTokenTimeToLive: {
          title: '访问令牌有效期',
          type: 'number',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 12 },
            value: 3600,
            rules: [
              {
                required: true,
                type: 'number',
                trigger: 'change',
                message: '请输入访问令牌有效期',
              },
            ],
            component: {
              showButton: false,
            },
          },
        },
        accessTokenFormat: {
          title: '访问令牌格式',
          type: 'dict-select',
          column: {
            align: 'center',
          },
          form: {
            value: 'self-contained',
            col: { span: 12 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择访问令牌格式',
              },
            ],
          },
          dict: sysDictFunc(SysDictCode.AccessTokenFormat),
        },
        deviceCodeTimeToLive: {
          title: '设备代有效期',
          type: 'number',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 12 },
            value: 3600,
            rules: [
              {
                required: true,
                type: 'number',
                trigger: 'change',
                message: '请输入设备代有效期',
              },
            ],
            component: {
              showButton: false,
            },
          },
        },
        reuseRefreshTokens: {
          title: '刷新令牌可重用',
          type: 'dict-switch',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: true,
            col: {
              span: 12,
            },
          },
        },
        refreshTokenTimeToLive: {
          title: '刷新令牌有效期',
          type: 'number',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 12 },
            value: 7200,
            rules: [
              {
                required: true,
                type: 'number',
                trigger: 'change',
                message: '请输入刷新令牌有效期',
              },
            ],
            component: {
              showButton: false,
            },
          },
        },
        idTokenSignatureAlgorithm: {
          title: 'ID令牌的签名方法',
          type: 'dict-select',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: 'RS256',
            col: { span: 12 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择访ID令牌的签名方法',
              },
            ],
          },
          dict: sysDictFunc(SysDictCode.SignatureAlgorithm),
        },
        requireProofKey: {
          title: '需要证明Key',
          type: 'dict-switch',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: false,
            col: {
              span: 12,
            },
          },
        },
        requireAuthorizationConsent: {
          title: '需要认证确认',
          type: 'dict-switch',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: false,
            col: {
              span: 12,
            },
          },
        },
        jwkSetUrl: {
          title: 'Web密钥集的URL',
          type: 'text',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 24 },
          },
        },
        tokenEndpointAuthenticationSigningAlgorithm: {
          title: 'JWT签名算法',
          type: 'dict-select',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            value: 'RS256',
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择访JWT签名算法',
              },
            ],
          },
          dict: sysDictFunc(SysDictCode.SignatureAlgorithm),
        },
        description: {
          title: '描述',
          type: 'textarea',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
          },
        },
      },
    },
  };
}
