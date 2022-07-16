<template>
  <sts-layout-footer class="sts-layout-footer"> </sts-layout-footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StsLayoutFooter from "sts-parent/StsLayoutFooter";
// import StsLayoutMenu from "../menu/index.vue";
// import { MenuPosition } from "/@/enums/MenuEnums";

export default defineComponent({
  name: "LayoutFooter",
  components: {
    StsLayoutFooter,
  },
  props: {
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
  },
  setup(props) {
    // const routes = props.menus.filter(
    //   (menu) => menu.meta && menu.meta.position === MenuPosition.FOOTER
    // );

    return {
      // routes,
    };
  },
});
</script>

<style lang="less">
.sts-layout-footer {
  text-align: center;
  padding: 0;
  background: #fff;
}
</style>
