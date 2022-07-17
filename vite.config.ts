import { ConfigEnv, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import qiankun from "vite-plugin-qiankun";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const root = process.cwd();

const pathResolve = (dir: string) => resolve(root, ".", dir);

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: resolveAlias,
    },
    server: {
      host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: 36120,
      strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      // 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      hmr: {
        overlay: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    plugins: [
      vue(),
      qiankun("sts-system", {
        useDevMode: true,
      }),
      federation({
        name: "sts-system",
        filename: "StsSystem.js",
        remotes: {
          "sts-file": "http://localhost:36110/assets/stsFile.js",
          "sts-parent": "http://localhost:36100/assets/StsParent.js",
        },
        shared: ["vue", "vue-router", "ant-design-vue"],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [pathResolve("src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          minifyInternalExports: false,
        },
      },
    },
  };
};

const resolveAlias = [
  {
    find: /\/@\//,
    replacement: pathResolve("src") + "/",
  },
  {
    find: "vue-i18n",
    replacement: "vue-i18n/dist/vue-i18n.cjs.js",
  },
];
