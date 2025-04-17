import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import { dict } from '@fast-crud/fast-crud';

import {
  departmentApi,
  roleApi,
  SysDictCode,
  sysDictFunc,
  userApi,
} from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysUser>) => {
    const { form } = req as { form: System.SysUser };
    return await userApi().saveOrUpdateUser({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysUser>) => {
    const { row } = ctx as { row: System.SysUser };
    return await userApi().deleteUserById(row.userId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysUser;
  }) => {
    if (mode === 'edit') {
      return await userApi().findUserById(row.userId);
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await userApi().findPageUser(query);
  };

  const editRequest = async (ctx: EditReq<System.SysUser>) => {
    const { form } = ctx as { form: System.SysUser };
    return await userApi().saveOrUpdateUser({ ...form });
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
        userId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        'department.departmentId': {
          title: '上级部门',
          type: 'dict-tree',
          dict: dict({
            isTree: true,
            value: 'departmentId',
            label: 'departmentName',
            async getData() {
              return await departmentApi().findTree(undefined);
            },
          }),
          column: {
            show: false,
          },
          form: {
            col: {
              span: 24,
            },
            rules: [
              { required: true, trigger: 'change', message: '请选择上级部门' },
            ],
          },
        },
        username: {
          title: '用户名',
          type: 'text',
          search: { show: true },
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入用户名' },
            ],
          },
          editForm: {
            component: {
              disabled: true,
            },
          },
        },
        password: {
          title: '密码',
          type: 'password',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入密码' },
            ],
          },
          editForm: {
            component: {
              disabled: true,
            },
          },
        },
        fullName: {
          title: '姓名',
          type: 'text',
          search: { show: true },
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入姓名' },
            ],
          },
        },
        phoneNumber: {
          title: '手机号',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入手机号' },
            ],
          },
        },
        sex: {
          title: '性别',
          type: 'dict-select',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请选择性别' },
            ],
          },
          dict: sysDictFunc(SysDictCode.Sex),
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
          dict: sysDictFunc(SysDictCode.UserStatus),
        },
        roles: {
          title: '权限项',
          type: 'dict-select',
          column: {
            show: false,
            columnSetShow: false,
          },
          dict: dict({
            value: 'roleId',
            label: 'roleName',
            async getData() {
              return await roleApi().findAllRole();
            },
          }),
          form: {
            col: { span: 24 },
            component: { mode: 'multiple', 'max-tag-count': 2 },
            valueBuilder: (context) => {
              context.form.roles =
                context.form?.roles?.map(
                  (role: System.SysRole) => role.roleId,
                ) || [];
            },
            valueResolve: (context) => {
              context.form.roles = context.form?.roles?.map(
                (roleId: string) => {
                  return {
                    roleId,
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
