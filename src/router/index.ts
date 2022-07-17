import { App } from "vue";
import { createMemoryHistory, createRouter, Router } from "vue-router";
import { setupRouterGuard } from "./guard";
import { routes } from "./routes";

let router: Router | null = null;

// config router
export function setupRouter(app: App<Element>, basePath: string) {
  router = createRouter({
    history: createMemoryHistory(basePath),
    routes,
  });
  app.use(router);
  setupRouterGuard(router);
}

export function clearRouter() {
  router = null;
}

export default router;
