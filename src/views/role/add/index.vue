<template>
  <a-modal
    :visible="visible"
    :title="$t('role.add.title')"
    :confirm-loading="confirmLoading"
    @cancel="$emit('update:visible', false)"
  >
    <template #footer>
      <a-button key="reset" @click="handleReset">
        {{ $t("common.reset") }}
      </a-button>
      <a-button key="submit" type="primary" @click="saveRole">
        {{ $t("common.save") }}
      </a-button>
    </template>
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ style: { width: '80px' } }"
    >
      <a-form-item
        :name="['role', 'roleName']"
        label="角色名称"
        :rules="[
          { required: true, message: $t('role.add.form.role_name_require') },
        ]"
      >
        <a-input v-model:value="formState.role.roleName" />
      </a-form-item>
      <a-row :gutter="[24]">
        <a-col :span="12">
          <a-form-item :name="['role', 'roleStatus']" label="角色状态">
            <a-switch
              v-model:checked="formState.role.roleStatus"
              checked-children="启用"
              :checked-value="1"
              un-checked-children="禁用"
              :un-checked-value="2"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :name="['role', 'isNeedAuthorized']" label="需要授权">
            <a-switch
              v-model:checked="formState.role.isNeedAuthorized"
              checked-children="Y"
              :checked-value="1"
              un-checked-children="N"
              :un-checked-value="2"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :name="['role', 'roleDesc']" label="角色描述" required>
        <a-textarea v-model:value="formState.role.roleDesc" />
      </a-form-item>
      <a-form-item name="menuIds" label="关联菜单" required>
        <menu-tree-select v-model:menuIds="formState.menuIds" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { FormInstance } from "ant-design-vue";
import MenuTreeSelect from "./treeSelect/index.vue";
import { RoleMenuRelation } from "/@/model/RoleModel";

export default defineComponent({
  name: "RoleAddModal",
  components: {
    MenuTreeSelect,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "createRole"],
  setup(_props, { emit }) {
    const confirmLoading = ref<boolean>(false);

    const formRef = ref<FormInstance>();
    const formState = reactive<RoleMenuRelation>({
      role: {
        roleId: "",
        roleName: "",
        roleDesc: "",
        roleStatus: 1,
        isNeedAuthorized: 1,
      },
      menuIds: [],
    });

    const saveRole = () => {
      confirmLoading.value = true;
      formRef.value
        ?.validateFields()
        .then((values) => {
          emit("createRole", values);
          confirmLoading.value = false;
        })
        .catch(() => {
          confirmLoading.value = false;
        });
    };

    const handleReset = () => {
      formRef.value?.resetFields();
    };

    return {
      formState,
      formRef,
      confirmLoading,

      saveRole,
      handleReset,
    };
  },
});
</script>

<style lang="less"></style>
