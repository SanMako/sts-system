<template>
  <sts-layout-content>
    <div :style="{ background: '#fff', minHeight: '360px' }">
      <router-view />
    </div>
  </sts-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StsLayoutContent from "sts-parent/StsLayoutContent";

export default defineComponent({
  name: "LayoutContent",
  components: {
    StsLayoutContent,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
