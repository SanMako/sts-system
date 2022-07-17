<template>
  <sts-layout has-sider>
    <!-- 侧边菜单栏 -->
    <layout-sider :menus="menus" />
    <sts-layout>
      <!-- 头部 -->
      <layout-header :menus="menus" />
      <!-- 主体内容 -->
      <layout-content />
      <!-- 脚部 -->
      <layout-footer :menus="menus" />
    </sts-layout>
  </sts-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StsLayout from "sts-parent/StsLayout";
import LayoutSider from "./sider/index.vue";
import LayoutHeader from "./header/index.vue";
import LayoutContent from "./content/index.vue";
import LayoutFooter from "./footer/index.vue";
import { menuStrategyFactory } from "/@/service/menuService";

export default defineComponent({
  name: "Layout",
  components: {
    StsLayout,
    LayoutSider,
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
  },
  setup() {
    const menus = getMenuList();

    return {
      menus,
    };
  },
});

function getMenuList() {
  return menuStrategyFactory.call();
}
</script>

<style lang="less"></style>
