<template>
  <sts-menu-item :key="menu.path">
    <template v-if="!onlyShowIcon && menu.meta.icon" #icon>
      <svg-icon :name="menu.meta && menu.meta.icon" />
    </template>
    <router-link :to="menu.path">
      <div v-if="onlyShowIcon && menu.meta.icon">
        <sts-tooltip :title="$t(menu.meta.title)" color="blue">
          <sts-button type="text" shape="circle">
            <template #icon><svg-icon :name="menu.meta.icon" /></template>
          </sts-button>
        </sts-tooltip>
      </div>
      <span v-else>
        {{ menu.meta && $t(menu.meta.title) }}
      </span>
    </router-link>
  </sts-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import StsMenu from "sts-parent/StsSubMenu";
import StsButton from "sts-parent/StsButton";
import StsTooltip from "sts-parent/StsTooltip";
import SvgIcon from "sts-parent/SvgIcon";

export default defineComponent({
  name: "MenuItem",
  components: {
    StsMenuItem: StsMenu.Item,
    StsButton,
    SvgIcon,
    StsTooltip,
  },
  props: {
    menu: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
    onlyShowIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const getPopupContainer = (trigger: HTMLElement) => {
      return trigger.parentElement;
    };

    return {
      getPopupContainer,
    };
  },
});
</script>

<style lang="less"></style>
