<template>
  <div>
    <sts-button type="text" class="setting-button" @click="visible = true">
      <svg-icon name="setting" />
    </sts-button>
    <sts-drawer
      :width="500"
      :title="$t('layout.header.setting.title')"
      :visible="visible"
      placement="left"
      @close="visible = false"
    >
      <template #extra>
        <sts-button style="margin-right: 8px" @click="visible = false">
          Cancel
        </sts-button>
        <sts-button type="primary" @click="visible = false">Submit</sts-button>
      </template>
      <p>Some contents...</p>
    </sts-drawer>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";
import StsButton from "sts-parent/StsButton";
import StsDrawer from "sts-parent/StsDrawer";

export default defineComponent({
  name: "SettingDrawer",
  components: {
    SvgIcon: defineAsyncComponent(() => import("sts-parent/SvgIcon")),
    StsButton,
    StsDrawer,
  },
  setup() {
    const visible = ref<boolean>(false);

    return {
      visible,
    };
  },
});
</script>

<style lang="less">
.setting-button {
  padding: 0 !important;
}
</style>
