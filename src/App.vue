<template>
  <router-view />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "",
  components: {
    // File: defineAsyncComponent(() => import("sts-file/File")),
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
