import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'grommet-icons:system',
      order: 2,
      title: '系统管理',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'Dict',
        path: '/system/dict',
        component: () => import('#/views/system/dict/index.vue'),
        meta: {
          order: 1,
          icon: 'arcticons:thai-dict',
          title: '数据字典',
        },
      },
      {
        name: 'TenantDatasource',
        path: '/system/tenant-datasource',
        component: () => import('#/views/system/tenant-datasource/index.vue'),
        meta: {
          order: 2,
          icon: 'akar-icons:data',
          title: '租户数据源',
        },
      },
      {
        name: 'Application',
        path: '/system/application',
        component: () => import('#/views/system/application/index.vue'),
        meta: {
          order: 3,
          icon: 'icon-park-outline:all-application',
          title: '应用管理',
        },
      },
      {
        name: 'Permission',
        path: '/system/permission',
        component: () => import('#/views/system/permission/index.vue'),
        meta: {
          order: 4,
          icon: 'arcticons:permissionsmanager',
          title: '权限管理',
        },
      },
      {
        name: 'Menu',
        path: '/system/menu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          order: 5,
          icon: 'gridicons:menus',
          title: '菜单管理',
        },
      },
    ],
  },
];

export default routes;
