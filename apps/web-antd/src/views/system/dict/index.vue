<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';

import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

import { FsButton, FsFormWrapper, useFs } from '@fast-crud/fast-crud';
import { useElementSize } from '@vueuse/core';
import { Modal, notification } from 'ant-design-vue';

import { dictApi } from '#/api';

import createDictFormOptions from './dict';
import createCrudOptions from './dict-item';

const treeData = ref<TreeProps['treeData']>([]);

const pageRef = useTemplateRef<InstanceType<typeof Page> | null>('pageRef');
const pageHeight = ref<number>(0);
const searchValue = ref<string>('');
// 数据字典
const { formWrapperRef, openFormWrapper, formWrapperOptions } =
  useDictFormWrapperUsingTag(() => loadDict());
// 数据字典项
const { crudRef, crudBinding, crudExpose } = useFs({ createCrudOptions });

// 搜索数据字典
const searchTreeData = computed(() => {
  return treeData.value?.filter((item) => {
    if (searchValue.value) {
      return (
        item.dictName.includes(searchValue.value) ||
        item.dictCode.includes(searchValue.value)
      );
    }
    return true;
  });
});

// 加载字典数据
async function loadDict() {
  const dicts = await dictApi().findAllDict();
  treeData.value = (dicts as TreeProps['treeData']) || [];
}

// 清除缓存
async function evictCache() {
  await dictApi().evictCache();
  notification.success({ message: '清除成功' });
}

// 删除字典
function handleDelete(dictId: string) {
  Modal.confirm({
    iconType: 'error',
    title: '删除',
    content: '确定删除？',
    onOk: async () => {
      await dictApi().deleteDictById(dictId);
      notification.success({ message: '删除成功' });
      await loadDict();
      // 把字典项列表清空
      const crudBindRef = crudBinding.value as any;
      crudBindRef.search.initialForm = { 'dict.dictId': 'null' };
      crudBindRef.actionbar.buttons.add.show = false;
      await crudExpose.doRefresh();
    },
  });
}

// dict modal
function useDictFormWrapperUsingTag(callback: any) {
  const formWrapperRef = ref();
  const formWrapperOptions = ref();
  formWrapperOptions.value = createDictFormOptions(callback);
  const initData = {
    dictId: '',
    dictCode: '',
    dictName: '',
    valueType: undefined,
    status: undefined,
    description: '',
  };

  async function openFormWrapper(dictId: any) {
    formWrapperOptions.value.initialForm = dictId
      ? await dictApi().findDictById(dictId)
      : initData;
    formWrapperRef.value.open(formWrapperOptions.value);
  }

  return {
    formWrapperRef,
    openFormWrapper,
    formWrapperOptions,
  };
}

// 字典选择
function handleSelect(_: any, event: any) {
  const nodeRef = event.selectedNodes[0];
  const crudBindRef = crudBinding.value as any;
  crudBindRef.search.initialForm = { 'dict.dictId': nodeRef.dictId };
  crudBindRef.addForm.initialForm = { dict: { dictId: nodeRef.dictId } };
  crudExpose.setSearchFormData({ form: { 'dict.dictId': nodeRef.dictId } });
  crudBindRef.actionbar.buttons.add.show = true;
  crudExpose.doRefresh();
}

// 页面打开后获取字典数据
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
    <ACard :bordered="false" title="字典" class="dict-list w-2/5">
      <template #extra>
        <a-button type="primary" @click="openFormWrapper(undefined)">
          新增字典
        </a-button>
        <span style="margin-left: 10px"></span>
        <a-button type="primary" @click="evictCache"> 清除缓存</a-button>
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
        title="数据字典"
        :height="pageHeight"
        @select="handleSelect"
      >
        <template #title="node">
          <span>{{ node.dictName }}:{{ node.dictCode }}</span>
          <div style="float: right">
            <FsButton
              size="small"
              type="link"
              @click="openFormWrapper(node.dictId)"
            >
              编辑
            </FsButton>
            <FsButton
              size="small"
              type="link"
              @click="handleDelete(node.dictId)"
            >
              删除
            </FsButton>
          </div>
        </template>
      </a-tree>
    </ACard>
    <ACard class="dict-item w-full" title="字典项">
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
