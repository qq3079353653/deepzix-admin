import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  PageRes,
} from '@fast-crud/fast-crud';

import { dict, useCompute } from '@fast-crud/fast-crud';

import { menuApi, SysDictCode, sysDictFunc } from '#/api';

const { compute } = useCompute();

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<System.SysMenu>) => {
    const { form } = req as { form: System.SysMenu };
    return await menuApi().saveOrUpdateMenu({ ...form });
  };

  const delRequest = async (ctx: DelReq<System.SysMenu>) => {
    const { row } = ctx as { row: System.SysMenu };
    return await menuApi().deleteMenuById(row.menuId);
  };

  const infoRequest = async ({
    mode,
    row,
  }: {
    mode: string;
    row: System.SysMenu;
  }) => {
    if (mode === 'edit') {
      const data = await menuApi().findMenuById(row.menuId);
      return {
        component: data.routerComponent || data.link || data.iframeSrc,
        ...data,
      };
    }
    return row;
  };

  const pageRequest = async () => {
    return await menuApi().findTree(undefined);
  };

  const editRequest = async (ctx: EditReq<System.SysMenu>) => {
    const { form } = ctx as { form: System.SysMenu };
    return await menuApi().saveOrUpdateMenu({ ...form });
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
      form: {
        labelWidth: '80px',
        wrapper: {
          width: '850px',
        },
      },
      columns: {
        menuId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: { show: false },
        },
        menuType: {
          title: '菜单类型',
          type: 'dict-radio',
          column: {
            align: 'center',
            width: 75,
          },
          form: {
            col: { span: 12 },
            rules: [
              { required: true, trigger: 'change', message: '请选择菜单类型' },
            ],
            component: {
              on: {
                change: ({ form }) => {
                  if (form.menuType === 'DIRECTORY') {
                    form.component = 'BasicLayout';
                    form.routerComponent = 'BasicLayout';
                  } else {
                    form.component = '';
                    form.routerComponent = '';
                  }
                  form.link = '';
                  form.iframeSrc = '';
                },
              },
            },
          },
          dict: sysDictFunc(SysDictCode.MenuType),
        },
        status: {
          title: '状态',
          type: 'dict-radio',
          column: {
            align: 'center',
            width: 75,
          },
          form: {
            col: { span: 12 },
            value: 'ENABLE',
            rules: [
              { required: true, trigger: 'change', message: '请选择状态' },
            ],
          },
          dict: sysDictFunc(SysDictCode.SystemStatus),
        },
        parentId: {
          title: '上级菜单',
          type: 'dict-tree',
          dict: dict({
            isTree: true,
            value: 'menuId',
            label: 'menuTitle',
            async getData() {
              const children = await menuApi().findTree(undefined);
              return [
                {
                  menuId: '0',
                  menuTitle: '根目录',
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
              { required: true, trigger: 'change', message: '请选择上级菜单' },
            ],
          },
        },
        routerName: {
          title: '路由名称',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: {
              span: 12,
            },
            rules: [
              { required: true, trigger: 'change', message: '请输入路由名称' },
            ],
          },
        },
        routerPath: {
          title: '路由地址',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: {
              span: 12,
            },
            rules: [
              { required: true, trigger: 'change', message: '请输入路由地址' },
            ],
          },
        },
        routerRedirect: {
          title: '路由重定向',
          type: 'text',
          search: {
            show: true,
          },
          column: {
            align: 'center',
            sorter: true,
            show: false,
          },
          form: {
            col: {
              span: 12,
            },
          },
        },
        component: {
          title: '组件',
          type: 'text',
          column: {
            align: 'center',
            cellRender: ({ row }) => {
              switch (row.menuType) {
                case 'DIRECTORY':
                case 'MENU': {
                  return row.routerComponent;
                }
                case 'IFRAME': {
                  return row.iframeSrc;
                }
                case 'LINK': {
                  return row.link;
                }
                default: {
                  return null;
                }
              }
            },
          },
          form: {
            submit: false,
            col: {
              span: 12,
            },
            rules: [
              { required: true, trigger: 'change', message: '请输入组件' },
            ],
            component: {
              disabled: compute(({ form }) => {
                return form.menuType === 'DIRECTORY';
              }),
              on: {
                change: ({ form }) => {
                  switch (form.menuType) {
                    case 'DIRECTORY': {
                      form.routerComponent = 'BasicLayout';
                      form.link = '';
                      form.iframeSrc = '';
                      break;
                    }
                    case 'IFRAME': {
                      form.routerComponent = '';
                      form.link = '';
                      form.iframeSrc = form.component;
                      break;
                    }
                    case 'LINK': {
                      form.routerComponent = '';
                      form.link = form.component;
                      form.iframeSrc = '';
                      break;
                    }
                    case 'MENU': {
                      form.routerComponent = form.component;
                      form.link = '';
                      form.iframeSrc = '';
                      break;
                    }
                  }
                },
              },
            },
            helper: {
              position: 'label',
              tooltip: {
                placement: 'topLeft',
              },
              text: '分类为 [菜单] 则为页面路由地址 ,  [内嵌/外链] 则打开网页',
            },
          },
        },
        routerComponent: {
          title: '路由组件',
          type: 'text',
          column: {
            show: false,
          },
          form: {
            show: false,
          },
        },
        link: {
          title: '路由组件',
          type: 'text',
          column: {
            show: false,
          },
          form: {
            show: false,
          },
        },
        iframeSrc: {
          title: '路由组件',
          type: 'text',
          column: {
            show: false,
          },
          form: {
            show: false,
          },
        },
        menuTitle: {
          title: '菜单标题',
          type: 'text',
          search: {
            show: true,
          },
          column: {
            order: 0,
            width: 180,
          },
          form: {
            col: {
              span: 12,
            },
            rules: [
              { required: true, trigger: 'change', message: '请输入菜单标题' },
            ],
          },
        },
        icon: {
          title: '图标',
          type: 'icon',
          search: {
            show: true,
          },
          column: {
            width: 75,
            align: 'center',
          },
          form: {
            col: {
              span: 12,
            },
            rules: [
              { required: true, trigger: 'change', message: '请输入图标' },
            ],
          },
        },
        // activeIcon: {
        //   title: '激活图标',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请输入激活图标' },
        //     ],
        //   },
        // },
        rank: {
          title: '排序',
          type: 'number',
          column: {
            align: 'center',
            width: 75,
          },
          form: {
            col: {
              span: 8,
            },
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
        keepAlive: {
          title: '开启缓存',
          type: 'dict-switch',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: {
              span: 8,
            },
          },
        },
        hideInMenu: {
          title: '隐藏菜单',
          type: 'dict-switch',
          column: {
            align: 'center',
            show: false,
          },
          form: {
            col: {
              span: 8,
            },
          },
        },
        // hideInTab: {
        //   title: '隐藏标签',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请选择隐藏标签' },
        //     ],
        //   },
        // },
        // hideInBreadcrumb: {
        //   title: '隐藏面包屑',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请选择隐藏面包屑',
        //       },
        //     ],
        //   },
        // },
        // hideChildrenInMenu: {
        //   title: '隐藏子菜单',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请选择隐藏子菜单',
        //       },
        //     ],
        //   },
        // },
        // authority: {
        //   title: '权限',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请输入权限' },
        //     ],
        //   },
        // },
        // badge: {
        //   title: '激活图标',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请输入激活图标' },
        //     ],
        //   },
        // },
        // badgeType: {
        //   title: '徽标类型',
        //   type: 'dict-select',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请选择徽标类型' },
        //     ],
        //   },
        //   dict: sysDictFunc(SysDictCode.SystemStatus),
        // },
        // badgeVariants: {
        //   title: '徽标颜色',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请输入徽标颜色' },
        //     ],
        //   },
        // },
        // activePath: {
        //   title: '激活菜单',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       { required: true, trigger: 'change', message: '请输入激活菜单' },
        //     ],
        //   },
        // },
        // affixTab: {
        //   title: '是否固定标签页',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请选择是否固定标签页',
        //       },
        //     ],
        //   },
        // },
        // affixTabOrder: {
        //   title: '标签页的排序',
        //   type: 'number',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     value: 3600,
        //     rules: [
        //       {
        //         required: true,
        //         type: 'number',
        //         trigger: 'change',
        //         message: '请输入标签页的排序',
        //       },
        //     ],
        //     component: {
        //       showButton: false,
        //     },
        //   },
        // },
        // iframeSrc: {
        //   title: 'iframe地址',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请输入iframe地址',
        //       },
        //     ],
        //   },
        // },
        // ignoreAccess: {
        //   title: '忽略权限',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请选择忽略权限',
        //       },
        //     ],
        //   },
        // },
        // link: {
        //   title: '外链跳转路径',
        //   type: 'text',
        //   search: { show: true },
        //   column: {
        //     align: 'center',
        //     sorter: true,
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请输入外链跳转路径',
        //       },
        //     ],
        //   },
        // },
        // maxNumOfOpenTab: {
        //   title: '标签页最大打开数量',
        //   type: 'number',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     value: 3600,
        //     rules: [
        //       {
        //         required: true,
        //         type: 'number',
        //         trigger: 'change',
        //         message: '请输入标签页最大打开数量',
        //       },
        //     ],
        //     component: {
        //       showButton: false,
        //     },
        //   },
        // },
        // openInNewWindow: {
        //   title: '新窗口打开页面',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请选择新窗口打开页面',
        //       },
        //     ],
        //   },
        // },
        // noBasicLayout: {
        //   title: '不使用基础布局',
        //   type: 'dict-switch',
        //   column: {
        //     align: 'center',
        //   },
        //   form: {
        //     col: { span: 24 },
        //     rules: [
        //       {
        //         required: true,
        //         trigger: 'change',
        //         message: '请选择不使用基础布局',
        //       },
        //     ],
        //   },
        // },
      },
    },
  };
}
