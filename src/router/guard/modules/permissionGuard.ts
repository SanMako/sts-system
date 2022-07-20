import { useUnInstalledRouterStore } from "/@/store/modules/routerStore";
import { dynamicAddRoute } from "/@/service/routerService";
import { Router } from "vue-router";
import { PageEnum } from "/@/enums/PageEnums";
import { PageNotFoundRouter } from "../../routes";

const whitePathList: PageEnum[] = [];

const routeStore = useUnInstalledRouterStore();

export function createPermissionGuard(router: Router) {
  /**
   * to: 即将要进入的目标 用一种标准化的方式
   * from: 当前导航正要离开的路由 用一种标准化的方式
   */
  router?.beforeEach(async (to, from, next) => {
    /**
     * 白名单放行
     */
    if (toWhiteList(to, next)) {
      return;
    }

    if (routeStore.getIsDynamicRouteLoaded) {
      next();
      return;
    }

    dynamicAddRoute();

    if (to.name === PageNotFoundRouter.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}

/**
 * 白名单放行
 */
function toWhiteList(to, next) {
  if (whitePathList.includes(to.path as PageEnum)) {
    next((to.query?.redirect as string) || "/");
    return true;
  }
  return false;
}
