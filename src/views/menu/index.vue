<template>
  <a-page-header style="background-color: #fff">
    <div style="display: flex">
      <a-button
        type="primary"
        style="margin: 8px"
        @click="state.addMenuModalVisible = true"
      >
        <template #icon>
          <svg-icon name="menu-add" style="margin-right: 8px" />
        </template>
        {{ $t("menu.button.create") }}
      </a-button>
      <a-button
        type="primary"
        style="margin: 8px"
        @click="state.addMenuModalVisible = true"
      >
        <template #icon>
          <svg-icon name="data-import" style="margin-right: 8px" />
        </template>
        {{ $t("common.data_import") }}
      </a-button>
    </div>
    <menu-table
      :dataSource="state.dataSource"
      @on-delete-menu="onDeleteMenuByMenuId"
      @show-edit-menu-drawer="showEditMenuDrawer"
    />
  </a-page-header>
  <add-menu-modal
    v-model:visible="state.addMenuModalVisible"
    @create-menu="createMenu"
  />
  <suspense>
    <template #default>
      <edit-menu-drawer
        v-if="state.editMenuDrawerVisible"
        v-model:visible="state.editMenuDrawerVisible"
        :menuId="state.menuId"
        @update-menu="updateMenu"
      />
    </template>
    <template #fallback>
      <div>
        <h3>{{ $t("common.loading") }}</h3>
      </div>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  deleteMenuByMenuId,
  getMenuTreeList,
  saveMenu,
  updateMenuByMenuId,
} from "/@/apis/menuApi";
import MenuTable from "./table/index.vue";
import AddMenuModal from "./add/index.vue";
import EditMenuDrawer from "./edit/index.vue";
import { MenuModel } from "/@/model/MenuModel";

export default defineComponent({
  name: "MenuMgr",
  components: {
    MenuTable,
    AddMenuModal,
    EditMenuDrawer,
  },
  setup() {
    const state = reactive({
      dataSource: [],
      loading: false,
      addMenuModalVisible: false,
      editMenuDrawerVisible: false,
      menuId: "",
    });

    const getMenuDataList = async () => {
      state.loading = true;
      const menuData = await await getMenuTreeList().then((res) => {
        return res;
      });
      state.loading = false;
      if (menuData) {
        state.dataSource = menuData;
      }
    };

    getMenuDataList();

    const createMenu = async (menu: MenuModel) => {
      await saveMenu(menu).then(() => {
        state.addMenuModalVisible = false;
        getMenuDataList();
      });
    };

    const onDeleteMenuByMenuId = async (menuId: string) => {
      await deleteMenuByMenuId(menuId);
      getMenuDataList();
    };

    const showEditMenuDrawer = (menuId: string) => {
      state.menuId = menuId;
      state.editMenuDrawerVisible = true;
    };

    const updateMenu = async (menu: MenuModel) => {
      await updateMenuByMenuId(menu).then(() => {
        state.editMenuDrawerVisible = false;
        getMenuDataList();
      });
    };

    return {
      state,

      createMenu,
      onDeleteMenuByMenuId,
      showEditMenuDrawer,
      updateMenu,
    };
  },
});
</script>

<style lang="less"></style>
