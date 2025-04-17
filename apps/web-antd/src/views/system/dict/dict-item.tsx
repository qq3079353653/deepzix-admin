import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import { Tag } from 'ant-design-vue';

import { dictItemApi, SysDictCode, sysDictFunc } from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysDictItem>) => {
    const { form } = req as { form: System.SysDictItem };
    return await dictItemApi().saveOrUpdateDictItem({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysDictItem>) => {
    const { row } = ctx as { row: System.SysDictItem };
    return await dictItemApi().deleteDictItemById(row.dictItemId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysDictItem;
  }) => {
    if (mode === 'edit') {
      return await dictItemApi().findDictItemById(row.dictItemId);
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await dictItemApi().findPageDictItem(query);
  };

  const editRequest = async (ctx: EditReq<System.SysDictItem>) => {
    const { form } = ctx as { form: System.SysDictItem };
    return await dictItemApi().saveOrUpdateDictItem({ ...form });
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
        'dict.dictId': {
          search: { show: false },
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        dictItemCode: {
          title: '字典项编码',
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
        dictItemName: {
          title: '字典项名称',
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
                message: '请输入字典项名称',
              },
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
        color: {
          title: '标签色',
          type: 'text',
          column: {
            align: 'center',
            cellRender(scope) {
              return <Tag color={scope.row.color}>{scope.row.color}</Tag>;
            },
          },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入标签色',
              },
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
      },
    },
  };
}
