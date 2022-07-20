<template>
  <div v-if="!onlyShowChild">
    <sts-sub-menu :key="menu.path">
      <template #icon>
        <svg-icon :name="menu.meta && menu.meta.icon" />
      </template>
      <template #title>
        <span>{{ menu.meta && $t(menu.meta.title) }}</span>
      </template>
      <template v-for="item in menu.children">
        <template v-if="item.meta && !item.meta.hidden">
          <template v-if="!item.children">
            <menu-item
              :key="item.path"
              :menu="item"
              :onlyShowIcon="onlyShowIcon"
            />
          </template>
          <template v-else>
            <sub-menu
              :key="menu.path"
              :menu="item"
              :onlyShowIcon="onlyShowIcon"
              :onlyShowChild="onlyShowChild"
            />
          </template>
        </template>
      </template>
    </sts-sub-menu>
  </div>
  <div v-else>
    <template v-for="item in menu.children">
      <template v-if="item.meta && !item.meta.hidden">
        <template v-if="!item.children">
          <menu-item
            :key="item.path"
            :menu="item"
            :onlyShowIcon="onlyShowIcon"
          />
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import MenuItem from "../MenuItem/index.vue";
import StsMenu from "sts-parent/StsSubMenu";
import SvgIcon from "sts-parent/SvgIcon";

export default defineComponent({
  name: "SubMenu",
  components: {
    MenuItem,
    StsSubMenu: StsMenu.SubMenu,
    SvgIcon,
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
    onlyShowChild: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
