<template>
  <a-table
    :row-key="(record) => record.roleId"
    class="a-table-striped"
    size="middle"
    :columns="roleTableColumns"
    :data-source="dataSource"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    bordered
    :pagination="pagination"
    :row-selection="rowSelection"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'roleStatus'">
        <span>
          <a-tag v-if="record.roleStatus == 1" color="green">
            {{ $t("common.enabled") }}
          </a-tag>
          <a-tag v-else color="red">{{ $t("common.disabled") }}</a-tag>
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <div class="editable-row-operations">
          <span>
            <a-button
              type="link"
              style="padding: 0"
              @click="showEditDrawer(record.roleId)"
            >
              {{ $t("common.edit") }}
            </a-button>
            <a-divider type="vertical" />
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record.roleId)"
            >
              <a-button type="link" style="padding: 0">
                {{ $t("common.delete") }}
              </a-button>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { PaginationProps } from "ant-design-vue";
import dayjs from "dayjs";
import { defineComponent, PropType, ref } from "vue";
import { RoleModel } from "/@/model/RoleModel";

export default defineComponent({
  name: "RoleTable",
  components: {},
  props: {
    dataSource: {
      type: Array as PropType<RoleModel[]>,
      default: null,
    },
    pagination: {
      type: [Object, Boolean] as PropType<PaginationProps | boolean>,
      default: null,
    },
  },
  emits: ["switchPage", "onDeleteRole", "showEditRoleDrawer"],
  setup(props, { emit }) {
    const handleTableChange = (p: any) => {
      emit("switchPage", p.current, p.pageSize);
    };

    const rowSelection = ref({
      checkStrictly: false,
      onChange: (selectedRowKeys: string[], selectedRows: RoleModel[]) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (
        record: RoleModel,
        selected: boolean,
        selectedRows: RoleModel[]
      ) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (
        selected: boolean,
        selectedRows: RoleModel[],
        changeRows: RoleModel[]
      ) => {
        console.log(selected, selectedRows, changeRows);
      },
    });

    const onDelete = (roleId: string) => {
      emit("onDeleteRole", roleId);
    };

    const showEditDrawer = (roleId: string) => {
      emit("showEditRoleDrawer", roleId);
    };

    return {
      roleTableColumns,
      rowSelection,
      handleTableChange,
      onDelete,
      showEditDrawer,
    };
  },
});

const roleTableColumns = [
  {
    title: "角色名",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "角色描述",
    dataIndex: "roleDesc",
    key: "roleDesc",
  },
  {
    title: "角色状态",
    dataIndex: "roleStatus",
    key: "roleStatus",
  },
  {
    title: "创建者",
    dataIndex: "createUser",
    key: "createUser",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    customRender: (text: any) => {
      return dayjs(text.value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "更新者",
    dataIndex: "updateUser",
    key: "updateUser",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    customRender: (text: any) => {
      return dayjs(text.value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
  },
];
</script>

<style lang="less"></style>
