<template>
  <sts-form
    ref="formRef"
    name="advanced_search"
    :model="formState"
    @finish="$emit('filterTableData', $event)"
  >
    <sts-row :gutter="24" style="margin: 0">
      <sts-col v-for="item in userSearch" :key="item.name" :span="8">
        <sts-form-item :name="item.name" :label="$t(item.label)">
          <sts-input
            v-model:value="formState[item.name]"
            :placeholder="$t(item.placeholder)"
          />
        </sts-form-item>
      </sts-col>
      <sts-col :span="8">
        <sts-button type="primary" html-type="submit">
          {{ $t("common.search") }}
        </sts-button>
        <sts-button style="margin: 0 8px" @click="() => formRef.resetFields()">
          {{ $t("common.reset") }}
        </sts-button>
      </sts-col>
    </sts-row>
  </sts-form>
</template>

<script lang="ts">
import { FormInstance } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import StsInput from "sts-parent/StsInput";
import StsButton from "sts-parent/StsButton";
import { StsForm } from "sts-parent/StsForm";
import StsCol from "sts-parent/StsCol";
import StsRow from "sts-parent/StsRow";

export default defineComponent({
  name: "UserSearchForm",
  components: {
    StsCol,
    StsRow,
    StsInput,
    StsButton,
    StsForm,
    StsFormItem: StsForm.Item,
  },
  props: {},
  emits: ["filterTableData"],
  setup() {
    const formRef = ref<FormInstance>();
    const formState = reactive({});

    return {
      formRef,
      formState,
      userSearch,
    };
  },
});

const userSearch = [
  {
    name: "username",
    label: "user.form.username",
    placeholder: "user.form.username_placeholder",
  },
  {
    name: "phoneNum",
    label: "user.form.phoneNum",
    placeholder: "user.form.phoneNum_placeholder",
  },
];
</script>

<style lang="less"></style>
