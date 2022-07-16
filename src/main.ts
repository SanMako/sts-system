import { createApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "/@/router";

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

let router = null;
let instance = null;

renderWithQiankun({
  mount(props) {
    console.log("%c ", "color: green;", "sts system app mount");
    // storeTest(props);
    render(props);
    // instance.config.globalProperties.$onGlobalStateChange =
    //   props.onGlobalStateChange;
    // instance.config.globalProperties.$setGlobalState = props.setGlobalState;
  },
  bootstrap() {
    console.log("%c ", "color: green;", "sts system app bootstraped");
  },
  update(props: any) {
    console.log("sts system update props", props);
  },
  unmount(props: any) {
    console.log("%c ", "color: green;", "sts system app unmount");
    instance.unmount();
    instance._container.innerHTML = "";
    instance = null;
    router = null;
  },
});

function render(props = {}) {
  const { container } = props;
  router = createRouter({
    history: createMemoryHistory(
      !qiankunWindow.__POWERED_BY_QIANKUN__ ? "/system" : "/"
    ),
    routes,
  });
  // const StsButton = defineAsyncComponent(() => import("sts-parent/StsButton"));
  instance = createApp(App);
  // instance.use(StsButton);
  instance.use(router);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log("独立运行");
  render({});
}
