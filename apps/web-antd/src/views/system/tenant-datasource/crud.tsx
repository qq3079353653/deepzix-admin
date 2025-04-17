import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import { SysDictCode, sysDictFunc, tenantDatasourceApi } from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysTenantDatasource>) => {
    const { form } = req as { form: System.SysTenantDatasource };
    return await tenantDatasourceApi().saveOrUpdateTenantDatasource({
      ...form,
    });
  };

  const delRequest = async (ctx: DelReq<System.SysTenantDatasource>) => {
    const { row } = ctx as { row: System.SysTenantDatasource };
    return await tenantDatasourceApi().deleteTenantDatasourceById(
      row.tenantDatasourceId,
    );
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysTenantDatasource;
  }) => {
    if (mode === 'edit') {
      return await tenantDatasourceApi().findTenantDatasourceById(
        row.tenantDatasourceId,
      );
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await tenantDatasourceApi().findPageTenantDatasource(query);
  };

  const editRequest = async (ctx: EditReq<System.SysTenantDatasource>) => {
    const { form } = ctx as { form: System.SysTenantDatasource };
    return await tenantDatasourceApi().saveOrUpdateTenantDatasource({
      ...form,
    });
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
        tenantDatasourceId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        tenantId: {
          title: '租户ID',
          type: 'text',
          search: { show: true },
          column: { align: 'center' },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入租户ID' },
            ],
          },
        },
        tenantName: {
          title: '租户名',
          type: 'text',
          search: { show: true },
          column: { align: 'center' },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入租户名' },
            ],
          },
        },
        dbType: {
          title: '数据库类型',
          type: 'dict-select',
          column: {
            align: 'center',
          },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请选择数据库类型',
              },
            ],
          },
          dict: sysDictFunc(SysDictCode.DbType),
        },
        driverClassName: {
          title: '数据库驱动',
          type: 'text',
          column: { align: 'center' },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入数据库驱动',
              },
            ],
          },
        },
        url: {
          title: '数据库URL',
          type: 'text',
          column: { align: 'center' },
          form: {
            col: { span: 24 },
            rules: [
              { required: true, trigger: 'change', message: '请输入数据库URL' },
            ],
          },
        },
        username: {
          title: '数据库用户名',
          type: 'text',
          column: { align: 'center', width: 120 },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入数据库用户名',
              },
            ],
          },
        },
        password: {
          title: '数据库密码',
          type: 'text',
          column: { align: 'center' },
          form: {
            col: { span: 24 },
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入数据库密码',
              },
            ],
          },
        },
        initialize: {
          title: '初始化',
          type: 'dict-select',
          column: { align: 'center', width: 75 },
          form: {
            value: false,
            show: false,
            submit: true,
          },
          dict: sysDictFunc(SysDictCode.TrueOrFalse),
        },
        description: {
          title: '描述',
          type: 'textarea',
          column: { align: 'center', show: false },
          form: { col: { span: 24 } },
        },
      },
    },
  };
}
