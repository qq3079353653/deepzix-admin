import { dict } from '@fast-crud/fast-crud';

export enum SysDictCode {
  AccessTokenFormat = 'AccessTokenFormat',
  AuthorizationGrantTypes = 'AuthorizationGrantTypes',
  ClientAuthenticationMethods = 'ClientAuthenticationMethods',
  Color = 'Color',
  DbType = 'DbType',
  DictValueType = 'DictValueType',
  MenuType = 'MenuType',
  RequestMethod = 'RequestMethod',
  Scope = 'Scope',
  Sex = 'Sex',
  SignatureAlgorithm = 'SignatureAlgorithm',
  SystemStatus = 'SystemStatus',
  TrueOrFalse = 'TrueOrFalse',
  UserStatus = 'UserStatus',
}

export const sysDictFunc = (code: SysDictCode) => {
  return dict({
    url: `/deepzix-upms/dict/find/item//${code}`,
  });
};
