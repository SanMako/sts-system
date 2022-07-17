<template>
  <sts-layout-header class="sts-layout-header">
    <div class="sts-layout-header-left">
      <sts-sider-trigger />
      <!-- <layout-breadcrumb :menus="menus" /> -->
    </div>
    <div class="sts-layout-header-right">
      <!-- <locale-switch />
      <user-dropdown />
      <setting-drawer /> -->
    </div>
  </sts-layout-header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StsLayoutHeader } from "sts-parent/StsLayoutHeader";
import StsSiderTrigger from "../components/SiderTrigger.vue";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    StsLayoutHeader,
    StsSiderTrigger,
  },
  props: {},
  setup() {
    return {};
  },
});
</script>

<style lang="less">
.sts-layout-header {
  background: #fff !important;
  display: flex;
  padding: 0;
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
