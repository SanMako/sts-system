<template>
  <sts-dropdown placement="bottom" :trigger="['click']">
    <span class="layout-header-locale">
      <svg-icon name="i18n" />
    </span>
    <template #overlay>
      <sts-menu @click="switchLanguage">
        <div v-for="item in availableLocales" :key="item">
          <sts-menu-item :key="item">{{ item }} </sts-menu-item>
          <sts-menu-divider />
        </div>
      </sts-menu>
    </template>
  </sts-dropdown>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import type { MenuProps } from "ant-design-vue";
import { useInstalledLocaleStore } from "/@/store/modules/localeStore";
import { useI18n } from "vue-i18n";
import { StsDropdown } from "sts-parent/StsDropdown";
import { StsMenu, StsMenuItem, StsMenuDivider } from "sts-parent/StsMenu";

export default defineComponent({
  name: "LocaleSwitch",
  components: {
    SvgIcon: defineAsyncComponent(() => import("sts-parent/SvgIcon")),
    StsDropdown,
    StsMenu,
    StsMenuItem,
    StsMenuDivider,
  },
  setup() {
    const { locale, availableLocales } = useI18n();

    const localeStore = useInstalledLocaleStore();

    const switchLanguage: MenuProps["onClick"] = ({ key }) => {
      localeStore.setCurrentLocale(key.toString());
      locale.value = key.toString();
    };

    return {
      switchLanguage,
      availableLocales,
    };
  },
});
</script>

<style lang="less">
.layout-header-locale {
  cursor: pointer;
  align-items: center;
}
</style>
