<template>
  <sts-layout-sider class="sts-layout-sider" collapsible>
    <div class="logo"></div>
  </sts-layout-sider>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StsLayoutSider } from "sts-parent/StsLayoutSider";

export default defineComponent({
  name: "SLayoutSider",
  components: {
    StsLayoutSider,
  },
  props: {},
  setup(props) {
    return {};
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
