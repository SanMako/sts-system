<template>
  <sts-layout-header class="sts-layout-header">
    <div class="sts-layout-header-left">
      <sts-sider-trigger />
      <layout-breadcrumb :menus="menus" />
    </div>
    <div class="sts-layout-header-right">
      <locale-switch />
      <user-dropdown />
      <setting-drawer />
    </div>
  </sts-layout-header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StsLayoutHeader } from "sts-parent/StsLayoutHeader";
import StsSiderTrigger from "../components/SiderTrigger.vue";
import LayoutBreadcrumb from "../components/LayoutBreadcrumb.vue";
import LocaleSwitch from "../components/LocaleSwitch.vue";
import UserDropdown from "../components/UserDropdown.vue";
import SettingDrawer from "../components/SettingDrawer.vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    StsLayoutHeader,
    StsSiderTrigger,
    LayoutBreadcrumb,
    LocaleSwitch,
    UserDropdown,
    SettingDrawer,
  },
  props: {
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less">
.sts-layout-header {
  background: #fff !important;
  display: flex;
  padding: 0px !important;
  align-items: center;
  justify-content: space-between;

  &-left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-right {
    display: flex;
    min-width: 180px;
    align-items: center;
  }
}
</style>
