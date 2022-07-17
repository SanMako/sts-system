<template>
  <a-drawer
    width="500"
    placement="left"
    :closable="false"
    :title="$t('menu.edit.title')"
    :visible="visible"
    @close="$emit('update:visible', false)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditMenuDrawer",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    menuId: {
      type: String,
      default: "",
    },
  },
  emits: ["update:visible", "updateMenu"],
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
