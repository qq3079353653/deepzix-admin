import { useColumns, useCompute } from '@fast-crud/fast-crud';
import { notification } from 'ant-design-vue';

import { dictApi, SysDictCode, sysDictFunc } from '#/api';

const { compute } = useCompute();
export default function createDictFormOptions(callbackFunc: () => void) {
  const { buildFormOptions } = useColumns();
  return buildFormOptions({
    form: {
      labelWidth: '100px',
      wrapper: {
        width: '520px',
        is: 'a-modal',
        title: '字典',
      },
      doSubmit({ form }: any) {
        if (form.dictId) {
          dictApi()
            .saveOrUpdateDict(form)
            .then(() => {
              callbackFunc();
              notification.success({
                message: '修改成功',
              });
            });
        } else {
          dictApi()
            .saveOrUpdateDict(form)
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
      dictId: {
        column: {
          show: false,
          columnSetShow: false,
        },
        form: { show: false },
      },
      dictCode: {
        title: '字典编码',
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
              message: '请输入字典编码',
            },
          ],
        },
      },
      dictName: {
        title: '字典名称',
        type: 'text',
        search: { show: true },
        column: {
          sorter: true,
        },
        form: {
          col: { span: 24 },
          rules: [
            {
              required: true,
              trigger: 'change',
              message: '请输入字典名称',
            },
          ],
        },
      },
      valueType: {
        title: '值类型',
        type: 'dict-select',
        column: {
          align: 'center',
        },
        form: {
          col: { span: 24 },
          rules: [
            { required: true, trigger: 'change', message: '请选择值类型' },
          ],
        },
        dict: sysDictFunc(SysDictCode.DictValueType),
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
