import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import { dict } from '@fast-crud/fast-crud';

import {
  menuApi,
  permissionApi,
  roleApi,
  SysDictCode,
  sysDictFunc,
} from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysRole>) => {
    const { form } = req as { form: System.SysRole };
    return await roleApi().saveOrUpdateRole({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysRole>) => {
    const { row } = ctx as { row: System.SysRole };
    return await roleApi().deleteRoleById(row.roleId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysRole;
  }) => {
    if (mode === 'edit') {
      return await roleApi().findRoleById(row.roleId);
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await roleApi().findPageRole(query);
  };

  const editRequest = async (ctx: EditReq<System.SysRole>) => {
    const { form } = ctx as { form: System.SysRole };
    return await roleApi().saveOrUpdateRole({ ...form });
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
        labelWidth: '100px',
        wrapper: {
          width: '520px',
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
        roleId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        roleCode: {
          title: '角色编码',
          type: 'text',
          search: { show: true },
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入角色编码' },
            ],
          },
          editForm: {
            component: {
              disabled: true,
            },
          },
        },
        roleName: {
          title: '角色名称',
          type: 'text',
          search: { show: true },
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入角色名称' },
            ],
          },
        },
        status: {
          title: '状态',
          type: 'dict-select',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请选择状态' },
            ],
          },
          dict: sysDictFunc(SysDictCode.SystemStatus),
        },
        permissions: {
          title: '权限项',
          type: 'dict-select',
          column: {
            show: false,
            columnSetShow: false,
          },
          dict: dict({
            value: 'permissionId',
            label: 'description',
            async getData() {
              return await permissionApi().findAllPermission();
            },
          }),
          form: {
            col: { span: 24 },
            component: { mode: 'multiple', 'max-tag-count': 2 },
            valueBuilder: (context) => {
              context.form.permissions =
                context.form?.permissions?.map(
                  (permission: System.SysPermission) => permission.permissionId,
                ) || [];
            },
            valueResolve: (context) => {
              context.form.permissions = context.form?.permissions?.map(
                (permissionId: string) => {
                  return {
                    permissionId,
                  };
                },
              );
            },
          },
        },
        menus: {
          title: '菜单',
          type: 'dict-tree',
          dict: dict({
            isTree: true,
            value: 'menuId',
            label: 'menuTitle',
            async getData() {
              return await menuApi().findTree(undefined);
            },
          }),
          column: {
            show: false,
          },
          form: {
            col: {
              span: 24,
            },
            component: {
              'tree-checkable': true,
              'max-tag-count': 2,
            },
            valueBuilder: (context) => {
              context.form.menus =
                context.form?.menus?.map(
                  (menu: System.SysMenu) => menu.menuId,
                ) || [];
            },
            valueResolve: (context) => {
              context.form.menus = context.form?.menus?.map(
                (menuId: string) => {
                  return {
                    menuId,
                  };
                },
              );
            },
          },
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
        createdTime: {
          title: '创建时间',
          type: 'text',
          column: {
            align: 'center',
          },
          form: { show: false },
        },
      },
    },
  };
}
