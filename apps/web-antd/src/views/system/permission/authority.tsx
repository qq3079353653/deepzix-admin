import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import { authorityApi, SysDictCode, sysDictFunc } from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysAuthority>) => {
    const { form } = req as { form: System.SysAuthority };
    return await authorityApi().saveOrUpdateAuthority({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysAuthority>) => {
    const { row } = ctx as { row: System.SysAuthority };
    return await authorityApi().deleteAuthorityById(row.authorityId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysAuthority;
  }) => {
    if (mode === 'edit') {
      return await authorityApi().findAuthorityById(row.authorityId);
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await authorityApi().findPageAuthority(query);
  };

  const editRequest = async (ctx: EditReq<System.SysAuthority>) => {
    const { form } = ctx as { form: System.SysAuthority };
    return await authorityApi().saveOrUpdateAuthority({ ...form });
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
      actionbar: {
        buttons: {
          add: {
            show: false,
          },
        },
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
        dictItemId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        permissions: {
          search: { show: false },
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        authorityCode: {
          title: '权限项编码',
          type: 'text',
          search: { show: true },
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入字典项编码',
              },
            ],
          },
        },
        serviceId: {
          title: '服务ID',
          type: 'text',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入服务ID',
              },
            ],
          },
        },
        className: {
          title: '类名',
          type: 'text',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入类名' },
            ],
          },
        },
        methodName: {
          title: '方法名',
          type: 'text',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入方法名' },
            ],
          },
        },
        requestMethod: {
          title: '请求方法',
          type: 'dict-select',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请选择请求方法' },
            ],
          },
          dict: sysDictFunc(SysDictCode.RequestMethod),
        },
        url: {
          title: '请求URL',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入请求URL' },
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
        description: {
          title: '描述',
          type: 'textarea',
          search: { show: true },
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
