<template>
  <sts-layout-sider class="sts-layout-sider" collapsible>
    <div class="logo"></div>
    <layout-menu theme="dark" menuMode="inline" :routes="menus" />
  </sts-layout-sider>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StsLayoutSider } from "sts-parent/StsLayoutSider";
import LayoutMenu from "../menu/index.vue";
import { RouteRecordRaw } from "vue-router";
import { useMenuSetting } from "/@/hooks/useMenuSetting";

export default defineComponent({
  name: "LayoutSider",
  components: {
    StsLayoutSider,
    LayoutMenu,
  },
  props: {
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { getCollapsed } = useMenuSetting();

    return {
      getCollapsed,
    };
  },
});
</script>

<style lang="less">
.sts-layout-sider {
  overflow: auto;
  height: 100vh;
  position: "fixed";
  left: 0;
  top: 0;
  bottom: 0;

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
