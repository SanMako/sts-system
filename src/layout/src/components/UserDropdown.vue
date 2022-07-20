<template>
  <sts-dropdown placement="bottom">
    <span class="layout-header-user-dropdown">
      <img :src="DefaultAvatar" />
      <span>
        <span class="layout-header-user-dropdown-name"> 码客-大白菜 </span>
      </span>
    </span>
    <template #overlay>
      <sts-menu>
        <sts-menu-item key="0">
          {{ $t("layout.header.dropdown.profile") }}
        </sts-menu-item>
        <sts-menu-divider />
        <sts-menu-item key="3">
          {{ $t("layout.header.dropdown.logout") }}
        </sts-menu-item>
      </sts-menu>
    </template>
  </sts-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DefaultAvatar from "/@/assets/images/avatar.jpg";
import { StsDropdown } from "sts-parent/StsDropdown";
import { StsMenu, StsMenuItem, StsMenuDivider } from "sts-parent/StsMenu";

export default defineComponent({
  name: "UserDropdown",
  components: {
    StsDropdown,
    StsMenu,
    StsMenuItem,
    StsMenuDivider,
  },
  setup() {
    return {
      DefaultAvatar,
    };
  },
});
</script>

<style lang="less">
.layout-header-user-dropdown {
  display: flex;
  padding: 0 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 50%;
  }

  &-name {
    font-size: 14px;
  }
}
</style>
