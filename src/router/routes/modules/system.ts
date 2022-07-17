import { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/layout";

const SystemRouter: RouteRecordRaw = {
  path: "/system",
  name: "System",
  component: Layout,
  redirect: "/system/user",
  meta: {
    title: "system.title",
    icon: "setting",
  },
  children: [
    {
      path: "dept",
      name: "DeptMgr",
      meta: {
        title: "system.dept.title",
      },
      component: () => import("/@/views/dept/index.vue"),
    },
    {
      path: "user",
      name: "UserMgr",
      meta: {
        title: "system.user.title",
      },
      component: () => import("/@/views/user/index.vue"),
    },
    {
      path: "menu",
      name: "MenuMgr",
      meta: {
        title: "system.menu.title",
      },
      component: () => import("/@/views/menu/index.vue"),
    },
    {
      path: "role",
      name: "RoleMgr",
      meta: {
        title: "system.role.title",
      },
      component: () => import("/@/views/role/index.vue"),
    },
  ],
};

export default SystemRouter;
