<template>
  <a-form
    ref="formRef"
    name="advanced_search"
    :model="formState"
    @finish="onFinish"
  >
    <a-row :gutter="24" style="margin: 0">
      <a-col v-for="item in roleSearch" :key="item.name" :span="8">
        <a-form-item :name="item.name" :label="item.label">
          <a-input
            v-model:value="formState[item.name]"
            :placeholder="item.placeholder"
            allow-clear
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-button type="primary" html-type="submit">
          {{ $t("common.search") }}
        </a-button>
        <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">
          {{ $t("common.reset") }}
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { FormInstance } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "RoleSearchForm",
  components: {},
  props: {},
  emits: ["filterTableData"],
  setup(_props, { emit }) {
    const formRef = ref<FormInstance>();
    const formState = reactive({});

    const onFinish = () => {
      emit("filterTableData", formState);
    };

    return {
      formRef,
      formState,
      roleSearch,

      onFinish,
    };
  },
});

const roleSearch = [
  {
    name: "roleName",
    label: "角色名",
    placeholder: "请输入角色名",
  },
];
</script>

<style lang="less"></style>
