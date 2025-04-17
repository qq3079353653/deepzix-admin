import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  PageRes,
} from '@fast-crud/fast-crud';

import { dict, useCompute } from '@fast-crud/fast-crud';

import { departmentApi, SysDictCode, sysDictFunc } from '#/api';

const { compute } = useCompute();

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysDepartment>) => {
    const { form } = req as { form: System.SysDepartment };
    return await departmentApi().saveOrUpdateDepartment({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysDepartment>) => {
    const { row } = ctx as { row: System.SysDepartment };
    return await departmentApi().deleteDepartmentById(row.departmentId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysDepartment;
  }) => {
    if (mode === 'edit') {
      return await departmentApi().findDepartmentById(row.departmentId);
    }
    return row;
  };

  const pageRequest = async () => {
    return await departmentApi().findTree(undefined);
  };

  const editRequest = async (ctx: EditReq<System.SysDepartment>) => {
    const { form } = ctx as { form: System.SysDepartment };
    return await departmentApi().saveOrUpdateDepartment({ ...form });
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
        transformRes: ({ res }): PageRes => {
          return {
            currentPage: res.pageNumber ?? 1,
            pageSize: res.pageSize ?? 15,
            total: res.total ?? 0,
            records: res ?? [],
          } as PageRes;
        },
      },
      pagination: { show: false },
      search: { show: false },
      toolbar: {
        show: false,
        buttons: {
          search: { show: false },
          export: { show: false },
        },
      },
      actionbar: {
        buttons: {
          add: {
            show: true,
          },
        },
      },
      form: {
        labelWidth: '100px',
        wrapper: {
          width: '520px',
        },
      },
      rowHandle: {
        width: 120,
        align: 'center',
        fixed: 'right',
        buttons: {
          view: { show: false },
          edit: { order: 2, size: 'small', type: 'link', icon: '' },
          remove: {
            icon: '',
            show: compute(({ row }) => {
              return !row.children;
            }),
          },
        },
        dropdown: { more: { type: 'link' } },
      },
      columns: {
        departmentId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        parentId: {
          title: '上级部门',
          type: 'dict-tree',
          dict: dict({
            isTree: true,
            value: 'departmentId',
            label: 'departmentName',
            async getData() {
              const children = await departmentApi().findTree(undefined);
              return [
                {
                  departmentId: '0',
                  departmentName: '根部门',
                  children,
                },
              ];
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
        departmentCode: {
          title: '部门编码',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入部门编码' },
            ],
          },
          editForm: {
            component: {
              disabled: true,
            },
          },
        },
        departmentName: {
          title: '部门名称',
          type: 'text',
          column: {
            order: 0,
            width: 180,
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入部门名称' },
            ],
          },
        },
        rank: {
          title: '排序',
          type: 'number',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                type: 'number',
                trigger: 'change',
                message: '请输入排序',
              },
            ],
            component: {
              showButton: false,
            },
          },
        },
        status: {
          title: '状态',
          type: 'dict-radio',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            value: 'ENABLE',
            rules: [
              { required: true, trigger: 'change', message: '请选择状态' },
            ],
          },
          dict: sysDictFunc(SysDictCode.SystemStatus),
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
