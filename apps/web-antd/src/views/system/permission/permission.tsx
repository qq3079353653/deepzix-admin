import { useColumns, useCompute } from '@fast-crud/fast-crud';
import { notification } from 'ant-design-vue';

import { permissionApi, SysDictCode, sysDictFunc } from '#/api';

const { compute } = useCompute();
export default function createDictFormOptions(callbackFunc: () => void) {
  const { buildFormOptions } = useColumns();
  return buildFormOptions({
    form: {
      labelWidth: '100px',
      wrapper: {
        width: '520px',
        is: 'a-modal',
        title: '权限',
      },
      doSubmit({ form }: any) {
        if (form.dictId) {
          permissionApi()
            .saveOrUpdatePermission(form)
            .then(() => {
              callbackFunc();
              notification.success({
                message: '修改成功',
              });
            });
        } else {
          permissionApi()
            .saveOrUpdatePermission(form)
            .then(() => {
              callbackFunc();
              notification.success({
                message: '新增成功',
              });
            });
        }
      },
      afterSubmit() {},
    },
    columns: {
      _index: {
        title: '序号',
        form: { show: false },
        column: {
          columnSetShow: false,
          align: 'center',
          width: '55px',
          formatter: (context: any) => {
            return (context.index ?? 0) + 1;
          },
        },
      },
      permissionId: {
        column: {
          show: false,
          columnSetShow: false,
        },
        form: { show: false },
      },
      permissionCode: {
        title: '权限编码',
        type: 'text',
        search: { show: true },
        column: {
          sorter: true,
        },
        form: {
          component: {
            disabled: compute((context) => {
              return Boolean(context.form.dictId);
            }),
          },
          col: { span: 24 },
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请输入权限编码',
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
          rules: [{ required: true, trigger: 'change', message: '请选择状态' }],
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
  });
}
