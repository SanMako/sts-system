<template>
  <sts-modal
    :visible="visible"
    :title="$t('menu.add.title')"
    :confirm-loading="confirmLoading"
    @cancel="$emit('update:visible', false)"
  >
    <template #footer>
      <sts-button key="reset" @click="handleReset">
        {{ $t("common.reset") }}
      </sts-button>
      <sts-button key="submit" type="primary" @click="saveMenu">
        {{ $t("common.save") }}
      </sts-button>
    </template>
    <sts-form
      ref="menuFormRef"
      :model="menuFormState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <sts-form-item name="parentId" label="父级菜单">
        <menu-tree-select v-model:parentId="menuFormState.parentId" />
      </sts-form-item>
      <sts-form-item name="menuName" label="菜单名称" required>
        <sts-input v-model:value="menuFormState.menuName" />
      </sts-form-item>
      <sts-form-item name="menuUrl" label="菜单地址" required>
        <sts-input v-model:value="menuFormState.menuUrl" />
      </sts-form-item>
      <sts-form-item name="menuDesc" label="菜单描述" required>
        <sts-input v-model:value="menuFormState.menuDesc" />
      </sts-form-item>
      <sts-form-item name="menuType" label="菜单类别" required>
        <sts-radio-group v-model:value="menuFormState.menuType">
          <sts-radio value="1">菜单</sts-radio>
          <sts-radio value="2">页面</sts-radio>
          <sts-radio value="3">操作</sts-radio>
        </sts-radio-group>
      </sts-form-item>
      <sts-form-item name="menuStatus" label="菜单状态" required>
        <sts-switch
          v-model:checked="menuFormState.menuStatus"
          checked-children="启用"
          :checked-value="1"
          un-checked-children="禁用"
          :un-checked-value="2"
        />
      </sts-form-item>
    </sts-form>
  </sts-modal>
</template>

<script lang="ts">
import { FormInstance } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import MenuTreeSelect from "./treeSelect/index.vue";
import { MenuModel } from "/@/model/MenuModel";
import StsButton from "sts-parent/StsButton";
import StsModal from "sts-parent/StsModal";
import { StsForm } from "sts-parent/StsForm";
import { StsInput } from "sts-parent/StsInput";
import { StsSwitch } from "sts-parent/StsSwitch";
import { StsRadio } from "sts-parent/StsRadio";

export default defineComponent({
  name: "AddMenuModal",
  components: {
    StsModal,
    StsInput,
    StsSwitch,
    StsButton,
    MenuTreeSelect,
    StsForm,
    StsFormItem: StsForm.Item,
    StsRadio,
    StsRadioGroup: StsRadio.Group,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "createMenu"],
  setup(_props, { emit }) {
    const confirmLoading = ref<boolean>(false);

    const menuFormRef = ref<FormInstance>();
    const menuFormState = reactive<MenuModel>({
      menuId: "",
      menuName: "",
      menuUrl: "",
      menuDesc: "",
      menuType: 1,
      menuLevel: 1,
      menuStatus: 1,
      sort: 0,
      isNeedAuthorized: 2,
      isSecret: 2,
    });

    const saveMenu = () => {
      confirmLoading.value = true;
      menuFormRef.value
        ?.validateFields()
        .then((values) => {
          emit("createMenu", values);
          confirmLoading.value = false;
        })
        .catch(() => {
          confirmLoading.value = false;
        });
    };

    const handleReset = () => {
      menuFormRef.value?.resetFields();
    };

    return {
      menuFormRef,
      menuFormState,
      confirmLoading,

      saveMenu,
      handleReset,
    };
  },
});
</script>

<style lang="less"></style>
