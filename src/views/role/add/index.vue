<template>
  <sts-modal
    :visible="visible"
    :title="$t('role.add.title')"
    :confirm-loading="confirmLoading"
    @cancel="$emit('update:visible', false)"
  >
    <template #footer>
      <sts-button key="reset" @click="handleReset">
        {{ $t("common.reset") }}
      </sts-button>
      <sts-button key="submit" type="primary" @click="saveRole">
        {{ $t("common.save") }}
      </sts-button>
    </template>
    <sts-form
      ref="formRef"
      :model="formState"
      :label-col="{ style: { width: '80px' } }"
    >
      <sts-form-item
        :name="['role', 'roleName']"
        label="角色名称"
        :rules="[
          { required: true, message: $t('role.add.form.role_name_require') },
        ]"
      >
        <sts-input v-model:value="formState.role.roleName" />
      </sts-form-item>
      <sts-row :gutter="[24]">
        <sts-col :span="12">
          <sts-form-item :name="['role', 'roleStatus']" label="角色状态">
            <sts-switch
              v-model:checked="formState.role.roleStatus"
              checked-children="启用"
              :checked-value="1"
              un-checked-children="禁用"
              :un-checked-value="2"
            />
          </sts-form-item>
        </sts-col>
        <sts-col :span="12">
          <sts-form-item :name="['role', 'isNeedAuthorized']" label="需要授权">
            <sts-switch
              v-model:checked="formState.role.isNeedAuthorized"
              checked-children="Y"
              :checked-value="1"
              un-checked-children="N"
              :un-checked-value="2"
            />
          </sts-form-item>
        </sts-col>
      </sts-row>
      <sts-form-item :name="['role', 'roleDesc']" label="角色描述" required>
        <sts-textarea v-model:value="formState.role.roleDesc" />
      </sts-form-item>
      <sts-form-item name="menuIds" label="关联菜单" required>
        <menu-tree-select v-model:menuIds="formState.menuIds" />
      </sts-form-item>
    </sts-form>
  </sts-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { FormInstance } from "ant-design-vue";
import MenuTreeSelect from "./treeSelect/index.vue";
import { RoleMenuRelation } from "/@/model/RoleModel";
import StsInput from "sts-parent/StsInput";
import StsButton from "sts-parent/StsButton";
import { StsForm } from "sts-parent/StsForm";
import StsCol from "sts-parent/StsCol";
import StsRow from "sts-parent/StsRow";
import StsImg from "sts-parent/StsImg";
import SvgIcon from "sts-parent/SvgIcon";
import StsModal from "sts-parent/StsModal";
import StsUpload from "sts-parent/StsUpload";
import StsSwitch from "sts-parent/StsSwitch";
import StsTextarea from "sts-parent/StsTextarea";

export default defineComponent({
  name: "RoleAddModal",
  components: {
    MenuTreeSelect,
    StsCol,
    StsRow,
    StsImg,
    SvgIcon,
    StsModal,
    StsInput,
    StsUpload,
    StsButton,
    StsSwitch,
    StsTextarea,
    StsForm,
    StsFormItem: StsForm.Item,
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
