import type { RouteRecordRaw } from "vue-router";
import HomeRouter from "./modules/home";
import { Layout } from "/@/layout";

/**
 * 首页
 */
export const RootRouter: RouteRecordRaw = {
  path: "/",
  name: "Index",
  redirect: "/index",
  meta: {
    title: "首页",
    hidden: true,
  },
};

/**
 * 页面找不到找不到 404
 */
export const PageNotFoundRouter: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: Layout,
  meta: {
    title: "404",
    hidden: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PageNotFound",
      component: () => import("/@/views/404.vue"),
      meta: {
        title: "404",
        hidden: true,
      },
    },
  ],
};

/**
 * 静态路由
 */
export const routes: RouteRecordRaw[] = [
  RootRouter,
  HomeRouter,
  PageNotFoundRouter,
];

const modules = import.meta.globEager("./modules/*.ts");

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

/**
 * 动态路由
 */
export const asyncRoutes: RouteRecordRaw[] = [
  ...routeModuleList,
  PageNotFoundRouter,
];
