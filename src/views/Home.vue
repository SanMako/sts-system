<template>
  <div>
    system--------mmmmmmmmmmmmmmmmm
    <hr />
    <file />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    File: defineAsyncComponent(() => import("sts-file/File")),
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
