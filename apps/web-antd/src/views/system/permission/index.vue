<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';

import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

import { FsButton, FsFormWrapper, useFs } from '@fast-crud/fast-crud';
import { useElementSize } from '@vueuse/core';
import { Modal, notification } from 'ant-design-vue';

import { permissionApi } from '#/api';

import createCrudOptions from './authority';
import createDictFormOptions from './permission';

const treeData = ref<TreeProps['treeData']>([]);

const pageRef = useTemplateRef<InstanceType<typeof Page> | null>('pageRef');
const pageHeight = ref<number>(0);
const searchValue = ref<string>('');
// 权限
const { formWrapperRef, openFormWrapper, formWrapperOptions } =
  useDictFormWrapperUsingTag(() => loadDict());
// 权限项
const { crudRef, crudBinding, crudExpose } = useFs({ createCrudOptions });

// 搜索权限
const searchTreeData = computed(() => {
  return treeData.value?.filter((item) => {
    if (searchValue.value) {
      return (
        item.permissionCode.includes(searchValue.value) ||
        item.description.includes(searchValue.value)
      );
    }
    return true;
  });
});

// 加载权限数据
async function loadDict() {
  const permissions = await permissionApi().findAllPermission();
  treeData.value = (permissions as TreeProps['treeData']) || [];
}

// 删除权限
function handleDelete(dictId: string) {
  Modal.confirm({
    iconType: 'error',
    title: '删除',
    content: '确定删除？',
    onOk: async () => {
      await permissionApi().deletePermissionById(dictId);
      notification.success({ message: '删除成功' });
      await loadDict();
      // 把权限项列表清空
      const crudBindRef = crudBinding.value as any;
      crudBindRef.search.initialForm = {
        'permissions[0].permissionId': 'null',
      };
      crudBindRef.actionbar.buttons.add.show = false;
      await crudExpose.doRefresh();
    },
  });
}

// permission modal
function useDictFormWrapperUsingTag(callback: any) {
  const formWrapperRef = ref();
  const formWrapperOptions = ref();
  formWrapperOptions.value = createDictFormOptions(callback);
  const initData = {
    permissionId: '',
    permissionCode: '',
    status: undefined,
    description: '',
  };

  async function openFormWrapper(permissionId: any) {
    formWrapperOptions.value.initialForm = permissionId
      ? await permissionApi().findPermissionById(permissionId)
      : initData;
    formWrapperRef.value.open(formWrapperOptions.value);
  }

  return {
    formWrapperRef,
    openFormWrapper,
    formWrapperOptions,
  };
}

// 权限选择
function handleSelect(_: any, event: any) {
  const nodeRef = event.selectedNodes[0];
  const crudBindRef = crudBinding.value as any;
  crudBindRef.search.initialForm = {
    permissions: [{ permissionId: nodeRef.permissionId }],
  };
  crudBindRef.addForm.initialForm = {
    permissions: [{ permissionId: nodeRef.permissionId }],
  };
  crudExpose.setSearchFormData({
    form: { permissions: [{ permissionId: nodeRef.permissionId }] },
  });
  crudBindRef.actionbar.buttons.add.show = true;
  crudExpose.doRefresh();
}

// 页面打开后获取权限数据
onMounted(() => {
  loadDict();
  nextTick(() => {
    const { height } = useElementSize(pageRef);
    pageHeight.value = height.value;
  });
});
</script>

<template>
  <Page ref="pageRef" auto-content-height content-class="flex flex-row gap-2">
    <ACard :bordered="false" title="权限" class="dict-list w-1/4">
      <template #extra>
        <a-button type="primary" @click="openFormWrapper(undefined)">
          新增权限
        </a-button>
      </template>
      <FsFormWrapper ref="formWrapperRef" v-bind="formWrapperOptions" />
      <a-input-search
        v-model:value="searchValue"
        style="margin-bottom: 8px"
        allow-clear
      />
      <a-tree
        :checkable="false"
        :click-row-to-expand="false"
        :tree-data="searchTreeData"
        block-node
        title="权限"
        :height="pageHeight"
        @select="handleSelect"
      >
        <template #title="node">
          <span>{{ node.description }}</span>
          <div style="float: right">
            <FsButton
              size="small"
              type="link"
              @click="openFormWrapper(node.permissionId)"
            >
              编辑
            </FsButton>
            <FsButton
              size="small"
              type="link"
              @click="handleDelete(node.permissionId)"
            >
              删除
            </FsButton>
          </div>
        </template>
      </a-tree>
    </ACard>
    <ACard class="dict-item w-full" title="权限项">
      <FsCrud ref="crudRef" v-bind="crudBinding" />
    </ACard>
  </Page>
</template>

<style lang="less" scoped>
/deep/ .p-4 {
  padding: 8px !important;
}

/deep/ .dict-list {
  .ant-card-body {
    padding: 10px;
  }
}

/deep/ .dict-item {
  .fs-crud-container {
    min-height: 730px !important;
  }

  .ant-card-body {
    padding: 8px;
  }
}

/deep/ .ant-tree {
  .ant-tree-switcher {
    width: 4px;
  }
}
</style>
