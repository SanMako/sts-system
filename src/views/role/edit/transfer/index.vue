<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      class="tree-transfer"
      :data-source="dataSource"
      :show-select-all="false"
      :render="(item) => item.menuName"
      :rowKey="(record) => record.menuId"
      @change="handleChange"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <a-tree
          v-if="direction === 'left'"
          :checkedKeys="[...selectedKeys, ...targetKeys]"
          checkable
          block-node
          :tree-data="treeData"
          :field-names="{
            children: 'children',
            title: 'menuName',
            key: 'menuId',
            value: 'menuId',
          }"
          @check="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
            }
          "
          @select="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { TreeProps } from "ant-design-vue";
import { getMenuIdsByRoleId, getMenuTreeList } from "/@/apis/menuApi";
import { MenuModel } from "/@/model/MenuModel";
import { bindingRoleMenu, unBundlingRoleMenu } from "/@/apis/roleApi";

export default defineComponent({
  name: "RoleMenuTransfer",
  components: {},
  props: {
    roleId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const targetKeys = ref<string[]>([]);

    const initTargetKeys = async () => {
      const menuIds: string[] = await getMenuIdsByRoleId(props.roleId).then(
        (res) => {
          return res;
        }
      );
      targetKeys.value = [];
      menuIds.forEach((item) => {
        targetKeys.value.push(item);
      });
    };

    initTargetKeys();

    const dataSource = ref(transferDataSource);

    const treeData = computed(() => {
      return menuTreeList;
    });

    const handleChange = (
      nextTargetKeys: string[],
      direction: string,
      moveKeys: string[]
    ) => {
      if (direction === "left") {
        unBundlingRoleMenu(props.roleId, moveKeys);
      }
      if (direction === "right") {
        const menuIds = handleMenuIds(menuTreeList, moveKeys);
        bindingRoleMenu(props.roleId, menuIds);
      }
    };

    const onChecked = (
      e:
        | Parameters<TreeProps["onCheck"]>[1]
        | Parameters<TreeProps["onSelect"]>[1],
      checkedKeys: string[],
      onItemSelect: (n: any, c: boolean) => void
    ) => {
      const { eventKey } = e.node;
      onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
    };

    return {
      dataSource,
      treeData,
      targetKeys,
      handleChange,
      onChecked,
    };
  },
});

const menuTreeList: MenuModel[] = await getMenuTreeList().then((res) => {
  return res.data;
});

const transferDataSource: MenuModel[] = [];

function flatten(treeList: MenuModel[] = []) {
  treeList?.forEach((item) => {
    if (item.children) {
      flatten(item.children);
    } else {
      transferDataSource.push(item);
    }
  });
}

const targetMenuIds: string[] = [];
function handleMenuIds(treeList: MenuModel[] = [], menuIds: string[]) {
  treeList?.forEach((item) => {
    if (menuIds.includes(item.menuId)) {
      if (item.children) {
        handleMenuIds(
          item.children,
          item.children.map((child) => {
            return child.menuId;
          })
        );
      } else {
        targetMenuIds.push(item.menuId);
      }
    } else {
      handleMenuIds(item.children, menuIds);
    }
  });
  return targetMenuIds;
}

flatten(menuTreeList);

// function handleTreeData(data: MenuTreeModel[], targetKeys: string[] = []) {
//   data?.forEach((item) => {
//     item.disabled = targetKeys.includes(item.menuId);
//     if (item.children) {
//       handleTreeData(item.children, targetKeys);
//     }
//   });
//   return cloneDeep(data);
// }

function isChecked(
  selectedKeys: (string | number)[],
  eventKey: string | number
) {
  return selectedKeys.indexOf(eventKey) !== -1;
}
</script>

<style lang="less" scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>
