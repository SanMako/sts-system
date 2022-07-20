import { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/layout";

/**
 * 首页
 */
const HomeRouter: RouteRecordRaw = {
  path: "/index",
  name: "Home",
  component: Layout,
  redirect: "/home",
  meta: {
    title: "home.title",
    icon: "home-2",
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/home",
      name: "DefaultHome",
      component: () => import("/@/views/Home.vue"),
      meta: {
        title: "home.title",
        icon: "home-2",
      },
    },
  ],
};

export default HomeRouter;
