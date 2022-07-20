<template>
  <div style="display: inline-flex; margin: 0px 0px -1px 0px">
    <sts-breadcrumb separator="">
      <sts-breadcrumb-item>{{ $t("common.location") }}</sts-breadcrumb-item>
    </sts-breadcrumb>
    <sts-breadcrumb :routes="routes" style="padding-left: 10px">
      <template #itemRender="{ route, routes: routesMatched }">
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ $t(route.meta.title) }}
        </span>
        <router-link v-else :to="route.path">
          {{ $t(route.meta.title) }}
        </router-link>
      </template>
    </sts-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from "vue";
import { RouteLocationMatched, RouteRecordRaw, useRouter } from "vue-router";
import { StsBreadcrumb } from "sts-parent/StsBreadcrumb";

export default defineComponent({
  name: "LayoutBreadcrumb",
  components: {
    StsBreadcrumb,
    StsBreadcrumbItem: StsBreadcrumb.Item,
  },
  props: {
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
  },
  setup(props) {
    const routes = ref<RouteLocationMatched[]>([]);
    const { currentRoute } = useRouter();

    watchEffect(() => {
      const menus = props.menus;
      const routeMatched = currentRoute.value.matched;
      const parent = routeMatched.map((item) => item.path);
      const filterMenus = menus.filter((item) => item.path === parent[0]);
      const matched = getMatched(filterMenus, parent) as any;

      if (!matched || matched.length === 0) {
        return;
      }

      routes.value = matched.filter((item) => !item.meta?.hideBreadcrumb);
    });

    function getMatched(menus: RouteRecordRaw[], parent: string[]) {
      const matchedMenu: RouteRecordRaw[] = [];
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          matchedMenu.push(item);
        }
        if (item.children?.length) {
          matchedMenu.push(...getMatched(item.children, parent));
        }
      });
      return matchedMenu;
    }

    function hasRedirect(
      routes: RouteLocationMatched[],
      route: RouteLocationMatched
    ) {
      return routes.indexOf(route) !== routes.length - 1;
    }

    return {
      routes,
      hasRedirect,
    };
  },
});
</script>
