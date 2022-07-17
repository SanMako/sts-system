import { App, createApp } from "vue";
import MicroApp from "./App.vue";
import { clearRouter, setupRouter } from "/@/router";
import { store } from "/@/store";
import "virtual:svg-icons-register";
import i18n from "/@/locales";

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

let instance: App | null = null;

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
    console.log("%c ", "color: green;", "sts system app unmount" + props);
    instance?.unmount();
    instance!._container.innerHTML = "";
    instance = null;
    clearRouter();
  },
});

function render(props: any) {
  const { container } = props;
  instance = createApp(MicroApp);
  setupRouter(
    instance,
    !qiankunWindow.__POWERED_BY_QIANKUN__ ? "/system" : "/"
  );
  // 全局加载store
  instance.use(store);
  // 全局加载 vue-i18n
  instance.use(i18n);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log("独立运行");
  render({});
}
