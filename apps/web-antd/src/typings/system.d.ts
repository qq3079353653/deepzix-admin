/** 系统管理 */
declare namespace System {
  /** 数据字典 */
  interface SysDict {
    // 主键
    dictId: string;
    // 数据字典编码
    dictCode: string;
    // 数据字典名称
    dictName: string;
    // 值类型
    valueType: string;
    // 状态
    status: string;
    // 描述
    description?: string;
    // 数据字典项
    dictItems?: SysDictItem[];
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 数据字典项 */
  interface SysDictItem {
    // 主键
    dictItemId: string;
    // 系统数据字典
    dict?: SysDict;
    // 数据字典项编码
    dictItemCode: string;
    // 数据字典项名称
    dictItemName: string;
    // 标签色
    color: string;
    // 排序
    rank: number | undefined;
    // 状态
    status: string;
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 租户数据源 */
  interface SysTenantDatasource {
    // 主键
    tenantDatasourceId: string;
    // 租户ID
    tenantId: string;
    // 数据库类型
    dbType: string;
    // 数据库驱动
    driverClassName: string;
    // 数据库url
    url: string;
    // 租户名称
    tenantName: string;
    // 数据库用户名
    username: string;
    // 数据库密码
    password: string;
    // 是否已经完成初始化
    initialize: boolean | undefined;
    // 描述
    description?: string;
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 应用 */
  interface SysApplication {
    // 主键
    applicationId: string;
    // 应用名称
    applicationName: string;
    // 客户端ID
    clientId: string;
    // 客户端ID颁发时间
    clientIdIssuedAt: string;
    // 客户端密钥
    clientSecret: string;
    // 客户端密钥过期时间
    clientSecretExpiresAt: string;
    // 客户端认证模式
    clientAuthenticationMethods: string[];
    // 授权模式
    authorizationGrantTypes: string[];
    // 回调地址
    redirectUris: string;
    // oidc Logout回调地址
    postLogoutRedirectUris: string;
    // 应用作用域范围
    scopes: string[];
    /* TokenSettings */
    // 授权码的有效期
    authorizationCodeTimeToLive: number;
    // 访问令牌的有效期
    accessTokenTimeToLive: number;
    // 访问令牌的格式
    accessTokenFormat: string;
    // 设备代码的有效期
    deviceCodeTimeToLive: number;
    // 刷新令牌是否可重用
    reuseRefreshTokens: boolean;
    // 刷新令牌的有效期
    refreshTokenTimeToLive: number;
    // ID令牌的签名方法
    idTokenSignatureAlgorithm: string;
    /* ClientSettings */
    // 是否需要证明Key
    requireProofKey: boolean;
    // 是否需要认证确认
    requireAuthorizationConsent: boolean;
    // Web密钥集的URL
    jwkSetUrl: string;
    // JWT签名算法
    tokenEndpointAuthenticationSigningAlgorithm: string;
    // 描述
    description: string;
  }

  /** 权限 */
  interface SysPermission {
    // 主键
    permissionId: string;
    // 权限编码
    permissionCode: string;
    // 状态
    status: string;
    // 描述
    description: string;
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 权限项 */
  interface SysAuthority {
    // 主键
    authorityId: string;
    // 权限项编码
    authorityCode: string;
    // 服务ID
    serviceId: string;
    // 类名
    className: string;
    // 方法名
    methodName: string;
    // 请求方法
    requestMethod: string;
    // 请求URL
    url: string;
    // 状态
    status: string;
    // 描述
    description: string;
    // 属性对应权限
    permissions: SysPermission[];
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 菜单 */
  interface SysMenu {
    // 菜单主键
    menuId: string;
    // 父级菜单ID
    parentId: string;
    // 菜单类型
    menuType: string;
    // 路由名称（唯一标识）
    routerName: string;
    // 路由地址
    routerPath: string;
    // 路由重定向
    routerRedirect?: string;
    // 路由组件
    routerComponent?: string;
    // 菜单标题
    menuTitle: string;
    // 图标
    icon?: string;
    // 激活图标
    activeIcon?: string;
    // 开启缓存
    keepAlive?: boolean;
    // 隐藏菜单
    hideInMenu?: boolean;
    // 隐藏标签
    hideInTab?: boolean;
    // 隐藏面包屑
    hideInBreadcrumb?: boolean;
    // 隐藏子菜单
    hideChildrenInMenu?: boolean;
    // 权限（多个权限用逗号分隔）
    authority?: string;
    // 徽章
    badge?: string;
    // 徽标类型
    badgeType?: string;
    // 徽标颜色
    badgeVariants?: string;
    // 激活菜单
    activePath?: string;
    // 是否固定标签页
    affixTab?: boolean;
    // 标签页的排序（升序）
    affixTabOrder?: number;
    // iframe地址
    iframeSrc?: string;
    // 忽略权限
    ignoreAccess?: boolean;
    // 外链跳转路径
    link?: string;
    // 标签页最大打开数量（打开新标签页时自动关闭最早打开的）
    maxNumOfOpenTab?: number;
    // 没权限是否能看到菜单（可以看到但跳转403）
    menuVisibleWithForbidden?: boolean;
    // 新窗口打开页面
    openInNewWindow?: boolean;
    // 排序（升序）
    rank: number;
    // 菜单参数
    query?: string;
    // 不使用基础布局
    noBasicLayout?: boolean;
    // 状态
    status: string;
    // 子菜单
    children?: SysMenu[];
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 角色表 */
  interface SysRole {
    // 主键
    roleId: string;
    // 角色编码
    roleCode: string;
    // 角色名称
    roleName: string;
    // 状态
    status: string;
    // 描述
    description?: string;
    // 权限
    permissions?: SysPermission[];
    // 菜单
    menus?: SysMenu[];
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 部门表 */
  interface SysDepartment {
    // 主键
    departmentId: string;
    // 父级部门ID
    parentId: string;
    // 部门编号
    departmentCode: string;
    // 部门名称
    departmentName: string;
    // 排序
    rank: number | undefined;
    // 状态
    status: string;
    // 描述
    description?: string;
    // 子部门
    children?: SysDepartment[];
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }

  /** 用户表 */
  interface SysUser {
    // 主键
    userId: string;
    // 用户名
    username: string;
    // 密码
    password?: string;
    // 姓名
    fullName: string;
    // 手机号
    phoneNumber: string;
    // 性别
    sex: string;
    // 状态
    status: string;
    // 描述
    description?: string;
    // 所属部门
    department: SysDepartment;
    // 用户角色
    roles?: SysRole[];
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }
}
