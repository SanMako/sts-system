<template>
  <a-tree-select
    :value="menuIds"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    allow-clear
    :placeholder="$t('common.select')"
    tree-checkable
    :max-tag-count="6"
    :field-names="{
      children: 'children',
      label: 'menuName',
      key: 'menuId',
      value: 'menuId',
    }"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getMenuTreeList } from "/@/apis/menuApi";
import { MenuModel } from "/@/model/MenuModel";

const treeData: MenuModel[] = await getMenuTreeList().then((res) => {
  return res;
});

export default defineComponent({
  name: "MenuTreeSelect",
  components: {},
  props: {
    menuIds: {
      type: Array as PropType<String[]>,
      default: null,
    },
  },
  emits: ["update:menuIds"],
  setup(_props, { emit }) {
    const onChange = (value: string) => {
      emit("update:menuIds", value);
    };

    return {
      treeData,

      onChange,
    };
  },
});
</script>

<style lang="less"></style>
