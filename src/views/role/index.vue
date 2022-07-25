<template>
  <div>
    <sts-page-header style="background-color: #fff">
      <role-search-form @filter-table-data="filterTableData" />
      <div style="display: flex">
        <sts-button
          type="primary"
          style="margin: 8px"
          @click="state.addRoleModalVisible = true"
        >
          <template #icon>
            <svg-icon name="role-add" style="margin-right: 8px" />
          </template>
          {{ $t("role.button.create") }}
        </sts-button>
        <sts-button type="primary" danger style="margin: 8px">
          {{ $t("common.batch.delete") }}
        </sts-button>
      </div>
      <role-table
        :dataSource="state.dataSource"
        :loading="state.loading"
        :pagination="state.pagination"
        @switch-page="switchPage"
        @on-delete-role="onDeleteRoleByRoleId"
        @show-edit-role-drawer="showEditRoleDrawer"
      />
    </sts-page-header>
    <add-role-modal
      v-model:visible="state.addRoleModalVisible"
      @create-role="createRole"
    />
    <suspense>
      <template #default>
        <edit-role-drawer
          v-if="state.editRoleDrawerVisible"
          v-model:visible="state.editRoleDrawerVisible"
          :roleId="state.roleId"
        />
      </template>
      <template #fallback>
        <div>
          <h3>{{ $t("common.loading") }}</h3>
        </div>
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { deleteRoleByRoleId, getRolePageList, saveRole } from "/@/apis/roleApi";
import RoleSearchForm from "./searchForm/index.vue";
import RoleTable from "./table/index.vue";
import AddRoleModal from "./add/index.vue";
import { RoleMenuRelation } from "/@/model/RoleModel";
import EditRoleDrawer from "./edit/index.vue";
import { DefaultPagination } from "/@/config/PageConfig";
import SvgIcon from "sts-parent/SvgIcon";
import StsButton from "sts-parent/StsButton";
import StsPageHeader from "sts-parent/StsPageHeader";

export default defineComponent({
  name: "RoleMgr",
  components: {
    SvgIcon,
    StsButton,
    StsPageHeader,
    EditRoleDrawer,
    RoleSearchForm,
    RoleTable,
    AddRoleModal,
  },
  setup() {
    const state = reactive({
      roleId: "",
      dataSource: [],
      conditions: {},
      loading: false,
      addRoleModalVisible: false,
      editRoleDrawerVisible: false,
      pagination: DefaultPagination,
    });

    const getRoleDataList = async () => {
      const { current, pageSize: size } = state.pagination;
      state.loading = true;
      const rolePageList = await getRolePageList(
        size,
        current,
        state.conditions
      ).then((res) => {
        return res;
      });
      state.loading = false;
      if (rolePageList) {
        const { totalCount, dataList } = rolePageList;
        state.dataSource = dataList;
        state.pagination.total = totalCount;
      }
    };

    getRoleDataList();

    const switchPage = (current: number, pageSize: number) => {
      state.pagination.current = current;
      state.pagination.pageSize = pageSize;
      getRoleDataList();
    };

    const filterTableData = (values: any) => {
      state.conditions = values;
      getRoleDataList();
    };

    const onDeleteRoleByRoleId = async (roleId: string) => {
      await deleteRoleByRoleId(roleId).then(() => {
        getRoleDataList();
      });
    };

    const createRole = async (role: RoleMenuRelation) => {
      await saveRole(role).then(() => {
        state.addRoleModalVisible = false;
        getRoleDataList();
      });
    };

    const showEditRoleDrawer = (value: string) => {
      state.roleId = value;
      state.editRoleDrawerVisible = true;
    };

    return {
      state,

      switchPage,
      filterTableData,
      onDeleteRoleByRoleId,
      createRole,
      showEditRoleDrawer,
    };
  },
});
</script>

<style lang="less"></style>
