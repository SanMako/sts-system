import { useUnInstalledRouterStore } from "/@/store/modules/routerStore";
import { menuStrategyFactory } from "./menuService";
import { RouteRecordRaw } from "vue-router";
import { installRouter } from "/@/router";
import { PageEnum } from "/@/enums/PageEnums";
import { PageNotFoundRouter } from "/@/router/routes";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

/**
 * 动态添加routes
 */
export async function dynamicAddRoute() {
  const routerStore = useUnInstalledRouterStore();
  const router = installRouter(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? "/system" : "/"
  );
  if (!routerStore.getIsDynamicRouteLoaded) {
    const routes = await menuStrategyFactory.call();
    routes.forEach((route) => {
      router?.addRoute(route as unknown as RouteRecordRaw);
    });
    router?.addRoute(PageNotFoundRouter as unknown as RouteRecordRaw);
    routerStore.setIsDynamicRouteLoaded(true);
  }
  const toPath = router?.currentRoute.value.redirectedFrom?.fullPath;
  router?.replace(toPath ? toPath : PageEnum.DEFAULT_HOME);
}
