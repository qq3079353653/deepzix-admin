import type { TreeProps } from 'ant-design-vue';

import { requestClient } from '#/api/request';

export const dictApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param dict 实体对象
     */
    saveOrUpdateDict: (dict: System.SysDict) => {
      return requestClient.post<System.SysDict>(
        '/deepzix-upms/dict/save',
        dict,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteDictById: (id: string) => {
      return requestClient.get<boolean>(`/deepzix-upms/dict/delete/${id}`);
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllDictById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/dict/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findDictById: (id: string) => {
      return requestClient.get<System.SysDict>(`/deepzix-upms/dict/find/${id}`);
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageDict: (params: object) => {
      return requestClient.get<BusinessCommon.PaginatingRecord<System.SysDict>>(
        '/deepzix-upms/dict/find/page',
        { params },
      );
    },

    /**
     * 查找全部字典
     */
    findAllDict: () => {
      return requestClient.get<System.SysDict[] | TreeProps['treeData']>(
        '/deepzix-upms/dict/find/all',
      );
    },

    /**
     * 清除缓存
     */
    evictCache: () => {
      return requestClient.get<boolean>('/deepzix-upms/dict/evict/cache');
    },
  };
};
export const dictItemApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param dictItem 实体对象
     */
    saveOrUpdateDictItem: (dictItem: System.SysDictItem) => {
      return requestClient.post<System.SysDictItem>(
        '/deepzix-upms/dict-item/save',
        dictItem,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteDictItemById: (id: string) => {
      return requestClient.get<boolean>(`/deepzix-upms/dict-item/delete/${id}`);
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllDictItemById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/dict-item/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findDictItemById: (id: string) => {
      return requestClient.get<System.SysDictItem>(
        `/deepzix-upms/dict-item/find/${id}`,
      );
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageDictItem: (params: object) => {
      return requestClient.get<
        BusinessCommon.PaginatingRecord<System.SysDictItem>
      >('/deepzix-upms/dict-item/find/page', { params });
    },

    /**
     * 查找全部字典
     */
    findAllDictItem: () => {
      return requestClient.get<System.SysDictItem[] | TreeProps['treeData']>(
        '/deepzix-upms/dict-item/find/all',
      );
    },

    /**
     * 清除缓存
     */
    evictCache: () => {
      return requestClient.get<boolean>('/deepzix-upms/dict-item/evict/cache');
    },
  };
};
export const tenantDatasourceApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param tenantDatasource 实体对象
     */
    saveOrUpdateTenantDatasource: (
      tenantDatasource: System.SysTenantDatasource,
    ) => {
      return requestClient.post<System.SysTenantDatasource>(
        '/deepzix-upms/tenant-datasource/save',
        tenantDatasource,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteTenantDatasourceById: (id: string) => {
      return requestClient.get<boolean>(
        `/deepzix-upms/tenant-datasource/delete/${id}`,
      );
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllTenantDatasourceById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/tenant-datasource/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findTenantDatasourceById: (id: string) => {
      return requestClient.get<System.SysTenantDatasource>(
        `/deepzix-upms/tenant-datasource/find/${id}`,
      );
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageTenantDatasource: (params: object) => {
      return requestClient.get<
        BusinessCommon.PaginatingRecord<System.SysTenantDatasource>
      >('/deepzix-upms/tenant-datasource/find/page', { params });
    },
  };
};
export const applicationApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param application 实体对象
     */
    saveOrUpdateApplication: (application: System.SysApplication) => {
      return requestClient.post<System.SysApplication>(
        '/deepzix-uaa/application/save',
        application,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteApplicationById: (id: string) => {
      return requestClient.get<boolean>(
        `/deepzix-uaa/application/delete/${id}`,
      );
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllApplicationById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-uaa/application/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findApplicationById: (id: string) => {
      return requestClient.get<System.SysApplication>(
        `/deepzix-uaa/application/find/${id}`,
      );
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageApplication: (params: object) => {
      return requestClient.get<
        BusinessCommon.PaginatingRecord<System.SysApplication>
      >('/deepzix-uaa/application/find/page', { params });
    },
  };
};
export const permissionApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param permission 实体对象
     */
    saveOrUpdatePermission: (permission: System.SysPermission) => {
      return requestClient.post<System.SysPermission>(
        '/deepzix-upms/permission/save',
        permission,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deletePermissionById: (id: string) => {
      return requestClient.get<boolean>(
        `/deepzix-upms/permission/delete/${id}`,
      );
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllPermissionById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/permission/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findPermissionById: (id: string) => {
      return requestClient.get<System.SysPermission>(
        `/deepzix-upms/permission/find/${id}`,
      );
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPagePermission: (params: object) => {
      return requestClient.get<
        BusinessCommon.PaginatingRecord<System.SysPermission>
      >('/deepzix-upms/permission/find/page', { params });
    },

    /**
     * 查询全部权限
     *
     */
    findAllPermission: () => {
      return requestClient.get<System.SysPermission[] | TreeProps['treeData']>(
        '/deepzix-upms/permission/find/all',
      );
    },
  };
};
export const authorityApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param authority 实体对象
     */
    saveOrUpdateAuthority: (authority: System.SysAuthority) => {
      return requestClient.post<System.SysAuthority>(
        '/deepzix-upms/authority/save',
        authority,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteAuthorityById: (id: string) => {
      return requestClient.get<boolean>(`/deepzix-upms/authority/delete/${id}`);
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllAuthorityById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/authority/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findAuthorityById: (id: string) => {
      return requestClient.get<System.SysAuthority>(
        `/deepzix-upms/authority/find/${id}`,
      );
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageAuthority: (params: object) => {
      return requestClient.request<
        BusinessCommon.PaginatingRecord<System.SysAuthority>
      >('/deepzix-upms/authority/find/page', {
        method: 'post',
        params,
        data: params,
      });
    },

    /**
     * 查询全部权限
     *
     */
    findAllAuthority: () => {
      return requestClient.get<System.SysAuthority[]>(
        '/deepzix-upms/authority/find/all',
      );
    },
  };
};
export const menuApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param menu 实体对象
     */
    saveOrUpdateMenu: (menu: System.SysMenu) => {
      return requestClient.post<System.SysMenu>(
        '/deepzix-upms/menu/save',
        menu,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteMenuById: (id: string) => {
      return requestClient.get<boolean>(`/deepzix-upms/menu/delete/${id}`);
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllMenuById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/menu/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findMenuById: (id: string) => {
      return requestClient.get<System.SysMenu>(`/deepzix-upms/menu/find/${id}`);
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageMenu: (params: object) => {
      return requestClient.get<BusinessCommon.PaginatingRecord<System.SysMenu>>(
        '/deepzix-upms/menu/find/page',
        { params },
      );
    },

    /**
     * 菜单树
     * @param currentId 当前菜单ID
     */
    findTree: (currentId: string | undefined) => {
      return requestClient.get<System.SysMenu[]>(
        '/deepzix-upms/menu/find/tree',
        { params: { currentId } },
      );
    },
  };
};
export const roleApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param role 实体对象
     */
    saveOrUpdateRole: (role: System.SysRole) => {
      return requestClient.post<System.SysRole>(
        '/deepzix-upms/role/save',
        role,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteRoleById: (id: string) => {
      return requestClient.get<boolean>(`/deepzix-upms/role/delete/${id}`);
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllRoleById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/role/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findRoleById: (id: string) => {
      return requestClient.get<System.SysRole>(`/deepzix-upms/role/find/${id}`);
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageRole: (params: object) => {
      return requestClient.get<BusinessCommon.PaginatingRecord<System.SysRole>>(
        '/deepzix-upms/role/find/page',
        { params },
      );
    },

    /**
     * 查询全部角色
     *
     */
    findAllRole: () => {
      return requestClient.get<System.SysRole[]>('/deepzix-upms/role/find/all');
    },
  };
};
export const departmentApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param department 实体对象
     */
    saveOrUpdateDepartment: (department: System.SysDepartment) => {
      return requestClient.post<System.SysDepartment>(
        '/deepzix-upms/department/save',
        department,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteDepartmentById: (id: string) => {
      return requestClient.get<boolean>(
        `/deepzix-upms/department/delete/${id}`,
      );
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllDepartmentById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/department/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findDepartmentById: (id: string) => {
      return requestClient.get<System.SysDepartment>(
        `/deepzix-upms/department/find/${id}`,
      );
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageDepartment: (params: object) => {
      return requestClient.get<
        BusinessCommon.PaginatingRecord<System.SysDepartment>
      >('/deepzix-upms/department/find/page', { params });
    },

    /**
     * 部门树
     * @param currentId 当前菜单ID
     */
    findTree: (currentId: string | undefined) => {
      return requestClient.get<System.SysDepartment[]>(
        '/deepzix-upms/department/find/tree',
        { params: { currentId } },
      );
    },
  };
};
export const userApi = () => {
  return {
    /**
     * 新增或者更新
     *
     * @param user 实体对象
     */
    saveOrUpdateUser: (user: System.SysUser) => {
      return requestClient.post<System.SysUser>(
        '/deepzix-upms/user/save',
        user,
      );
    },

    /**
     * 根据主键删除
     *
     * @param id 主键
     */
    deleteUserById: (id: string) => {
      return requestClient.get<boolean>(`/deepzix-upms/user/delete/${id}`);
    },

    /**
     * 根据主键批量删除数据
     *
     * @param ids 主键集合
     */
    deleteAllUserById: (ids: string[]) => {
      return requestClient.post<string[]>(
        '/deepzix-upms/user/batch/delete',
        ids,
      );
    },

    /**
     * 根据主键查询
     *
     * @param id 主键
     */
    findUserById: (id: string) => {
      return requestClient.get<System.SysUser>(`/deepzix-upms/user/find/${id}`);
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageUser: (params: object) => {
      return requestClient.get<BusinessCommon.PaginatingRecord<System.SysUser>>(
        '/deepzix-upms/user/find/page',
        { params },
      );
    },
  };
};
