<template>
  <div>
    system--------mmmmmmmmmmmmmmmmm
    <hr />
    <file />
    <hr />
    <sts-button type="primary">Primary Button</sts-button>
    <sts-button>Default Button</sts-button>
    <sts-button type="dashed">Dashed Button</sts-button>
    <sts-button type="text">Text Button</sts-button>
    <sts-button type="link">Link Button</sts-button>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    File: defineAsyncComponent(() => import("sts-file/File")),
    StsButton: defineAsyncComponent(() => import("sts-parent/StsButton")),
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
