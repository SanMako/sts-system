<template>
  <sts-table
    :columns="menuTableColumns"
    :data-source="dataSource"
    :row-key="(record) => record.menuId"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'menuStatus'">
        <span>
          <sts-tag v-if="record.menuStatus == 1" color="green">
            {{ $t("common.enabled") }}
          </sts-tag>
          <sts-tag v-else color="red">{{ $t("common.disabled") }}</sts-tag>
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <span>
          <sts-button
            type="link"
            style="padding: 0"
            @click="$emit('showEditMenuDrawer', record.menuId)"
          >
            {{ $t("common.edit") }}
          </sts-button>
          <sts-divider type="vertical" />
          <sts-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="$emit('onDeleteMenu', record.menuId)"
          >
            <sts-button type="link" style="padding: 0">
              {{ $t("common.delete") }}
            </sts-button>
          </sts-popconfirm>
        </span>
      </template>
    </template>
  </sts-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";
import { MenuModel } from "/@/model/MenuModel";
import StsButton from "sts-parent/StsButton";
import StsDivider from "sts-parent/StsDivider";
import StsTable from "sts-parent/StsTable";
import StsPopconfirm from "sts-parent/StsPopconfirm";
import StsTag from "sts-parent/StsTag";

export default defineComponent({
  name: "MenuTable",
  components: {
    StsTag,
    StsTable,
    StsButton,
    StsDivider,
    StsPopconfirm,
  },
  props: {
    dataSource: {
      type: Array as PropType<MenuModel[]>,
      default: null,
    },
  },
  emits: ["onDeleteMenu", "showEditMenuDrawer"],
  setup() {
    return {
      menuTableColumns,
    };
  },
});

const menuTableColumns = [
  {
    title: "菜单名称",
    dataIndex: "menuName",
    key: "menuName",
    ellipsis: true,
  },
  {
    title: "菜单描述",
    dataIndex: "menuDesc",
    key: "menuDesc",
    ellipsis: true,
  },
  {
    title: "菜单地址",
    dataIndex: "menuUrl",
    key: "menuUrl",
  },
  {
    title: "菜单状态",
    dataIndex: "menuStatus",
    key: "menuStatus",
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
    title: "操作",
    key: "action",
    dataIndex: "action",
  },
];
</script>

<style lang="less" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
