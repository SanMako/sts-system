<template>
  <a-drawer
    width="500"
    placement="left"
    :closable="false"
    :visible="visible"
    @close="onClose"
  >
    <a-descriptions
      title="基本信息"
      bordered
      :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }"
    >
      <template #extra>
        <a-button v-if="!editable" type="primary" @click="edit()"
          >编辑</a-button
        >
        <a-button v-else type="primary" @click="save()">保存</a-button>
      </template>
      <a-descriptions-item label="角色名" :span="2">
        <a-typography-paragraph
          v-model:content="roleState.roleName"
          :editable="{ editing: editable }"
        >
          <template #editableIcon>{{ null }}</template>
          <template #editableEnterIcon>{{ null }}</template>
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="描述" :span="2">
        <a-typography-paragraph
          v-model:content="roleState.roleDesc"
          :editable="{ editing: editable }"
        >
          <template #editableIcon>{{ null }}</template>
          <template #editableEnterIcon>{{ null }}</template>
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="角色状态">
        <a-switch
          v-if="editable"
          v-model:checked="roleState.roleStatus"
          checked-children="启用"
          :checked-value="1"
          un-checked-children="禁用"
          :un-checked-value="2"
        />
        <a-tag
          v-else-if="!editable && roleState.roleStatus === 1"
          color="green"
        >
          {{ $t("common.enabled") }}
        </a-tag>
        <a-tag v-else-if="!editable && roleState.roleStatus === 2" color="red">
          {{ $t("common.disabled") }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="需要授权">
        <a-switch
          v-if="editable"
          v-model:checked="roleState.isNeedAuthorized"
          checked-children="是"
          :checked-value="1"
          un-checked-children="否"
          :un-checked-value="2"
        />
        <a-tag
          v-else-if="!editable && roleState.isNeedAuthorized === 1"
          color="green"
        >
          需要
        </a-tag>
        <a-tag
          v-else-if="!editable && roleState.isNeedAuthorized === 2"
          color="red"
        >
          不需要
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <p>关联菜单</p>
    <role-menu-transfer :role-id="roleId" />
    <a-divider />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import RoleMenuTransfer from "./transfer/index.vue";
import { RoleModel } from "/@/model/RoleModel";
import { getRoleByRoleId } from "/@/apis/roleApi";

export default defineComponent({
  name: "EditRoleDrawer",
  components: {
    RoleMenuTransfer,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    roleId: {
      type: String,
      default: "",
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const editable = ref<boolean>(false);

    const roleState = reactive<RoleModel>({
      roleId: "",
      roleName: "",
      roleStatus: 1,
      roleDesc: "",
      isNeedAuthorized: 1,
    });

    const setRoleState = () => {
      getRoleByRoleId(props.roleId).then((res) => {
        roleState.roleId = res[0].roleId;
        roleState.roleName = res[0].roleName;
        roleState.roleDesc = res[0].roleDesc;
        roleState.roleStatus = res[0].roleStatus;
        roleState.isNeedAuthorized = res[0].isNeedAuthorized;
      });
    };

    setRoleState();

    const onClose = () => {
      emit("update:visible", false);
    };

    const edit = () => {
      editable.value = true;
    };

    const save = () => {
      editable.value = false;
    };

    return {
      editable,
      roleState,
      onClose,
      edit,
      save,
    };
  },
});
</script>

<style lang="less" scoped>
p {
  font-size: 16px;
  color: rgb(0 0 0 / 85%);
  line-height: 24px;
  display: block;
  margin-bottom: 16px;
  font-weight: bold;
}

div.ant-typography-edit-content {
  left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

div.ant-typography,
.ant-typography p {
  margin-bottom: 0;
}

textarea.ant-input {
  max-width: 100%;
  min-height: 0;
}

.ant-input {
  border: 0 solid #d9d9d9;
  padding: 0;
}
</style>
