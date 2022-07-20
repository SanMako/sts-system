<template>
  <sts-modal
    :visible="visible"
    :title="$t('user.add.title')"
    :confirm-loading="state.confirmLoading"
    @cancel="$emit('update:visible', false)"
  >
    <template #footer>
      <sts-button key="reset" @click="handleReset">
        {{ $t("common.reset") }}
      </sts-button>
      <sts-button key="submit" type="primary" @click="handleOk">
        {{ $t("common.save") }}
      </sts-button>
    </template>
    <sts-form
      ref="formRef"
      :model="state.formState"
      :label-col="state.labelCol"
      :rules="rules"
      name="form_in_modal"
    >
      <sts-row type="flex" justify="space-around" align="middle">
        <sts-col flex="140px">
          <sts-form-item name="avatar">
            <sts-upload
              name="files"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :customRequest="upload"
              @change="handleChange"
            >
              <div v-if="state.avatarThumbUrl">
                <sts-img
                  :src="state.avatarThumbUrl"
                  alt="avatar"
                  width="100%"
                />
              </div>
              <div v-else>
                <svg-icon v-if="state.loading" name="loading" />
                <svg-icon v-else name="upload-image" size="30" />
                <div class="ant-upload-text">
                  {{ $t("user.add.form.upload_avatar") }}
                </div>
              </div>
            </sts-upload>
          </sts-form-item>
        </sts-col>
        <sts-col :flex="3">
          <sts-form-item
            name="username"
            class="height-50"
            :label="$t('user.add.form.username')"
          >
            <sts-input
              v-model:value="state.formState.username"
              :placeholder="$t('user.add.form.username_placeholder')"
            />
          </sts-form-item>
          <sts-form-item
            name="nickName"
            class="height-50"
            :label="$t('user.add.form.nickName')"
            :rules="[
              {
                required: true,
                message: $t('user.add.form.nickName_require'),
              },
            ]"
          >
            <sts-input
              v-model:value="state.formState.nickName"
              :placeholder="$t('user.add.form.nickName_placeholder')"
            />
          </sts-form-item>
        </sts-col>
      </sts-row>
      <sts-form-item name="phoneNum" :label="$t('user.add.form.phone')">
        <sts-input
          v-model:value="state.formState.phoneNum"
          :placeholder="$t('user.add.form.phone_placeholder')"
        />
      </sts-form-item>
      <sts-form-item name="emailAddress" :label="$t('user.add.form.email')">
        <sts-input
          v-model:value="state.formState.emailAddress"
          :placeholder="$t('user.add.form.email_placeholder')"
        />
      </sts-form-item>
    </sts-form>
  </sts-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { RuleObject } from "ant-design-vue/lib/form";
import { FormInstance } from "ant-design-vue/es/form";
import {
  checkChineseSymbol,
  fileIsImage,
  isEmail,
  isPhoneNum,
} from "/@/utils/TypeUtils";
import { FileItem } from "/@/model/FileModel";
import { message } from "ant-design-vue";
// import { getPreviewImage, sliceUpload } from "/@/service/fileService";
import i18n from "/@/locales";
import StsInput from "sts-parent/StsInput";
import StsButton from "sts-parent/StsButton";
import { StsForm } from "sts-parent/StsForm";
import StsCol from "sts-parent/StsCol";
import StsRow from "sts-parent/StsRow";
import StsImg from "sts-parent/StsImg";
import SvgIcon from "sts-parent/SvgIcon";
import StsModal from "sts-parent/StsModal";
import StsUpload from "sts-parent/StsUpload";

export default defineComponent({
  name: "AddUserModal",
  components: {
    StsCol,
    StsRow,
    StsImg,
    SvgIcon,
    StsModal,
    StsInput,
    StsUpload,
    StsButton,
    StsForm,
    StsFormItem: StsForm.Item,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "createUser"],
  setup(_props, { emit }) {
    const formRef = ref<FormInstance>();
    const state = reactive({
      confirmLoading: false,
      loading: false,
      avatarThumbUrl: "",
      formState: {
        userId: "",
        username: "",
        nickName: "",
        avatar: "",
        phoneNum: "",
        emailAddress: "",
      },
      labelCol: { style: { width: "70px" } },
    });

    const handleOk = () => {
      state.confirmLoading = true;
      formRef.value
        ?.validateFields()
        .then((values) => {
          emit("createUser", values);
          state.confirmLoading = false;
        })
        .catch(() => {
          state.confirmLoading = false;
        });
    };

    const handleReset = () => {
      formRef.value?.resetFields();
    };

    const beforeUpload = (file: FileItem) => {
      if (!fileIsImage(file.type)) {
        message.error("You can only upload image file!");
        return false;
      } else if (file.size / 1024 / 1024 > 2) {
        message.error("Image must smaller than 2MB!");
        return false;
      }
    };

    const upload = async (options: any) => {
      state.formState.avatar = await sliceUpload(
        options.file,
        options.onProgress,
        options.onSuccess,
        options.onError
      ).then((res) => {
        return res;
      });
      // await getPreviewImage(state.formState.avatar).then((res) => {
      //   state.avatarThumbUrl = res;
      // });
    };

    const handleChange = (file: FileItem) => {
      state.loading = file.status === "uploading";
    };

    return {
      state,
      formRef,
      rules,
      // getPreviewImage,
      handleOk,
      handleReset,
      beforeUpload,
      handleChange,
      upload,
    };
  },
});

const validateUsername = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject(i18n.global.t("user.add.form.username_require"));
  }
  if (checkChineseSymbol(value)) {
    return Promise.reject(i18n.global.t("user.add.form.username_check"));
  }
  return Promise.resolve();
};

const validatePhoneNum = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject(i18n.global.t("user.add.form.phone_require"));
  }
  if (!isPhoneNum(value)) {
    return Promise.reject(i18n.global.t("user.add.form.phone_check"));
  }
  return Promise.resolve();
};

const validateEmailAddress = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject(i18n.global.t("user.add.form.email_require"));
  }
  if (!isEmail(value)) {
    return Promise.reject(i18n.global.t("user.add.form.email_check"));
  }
  return Promise.resolve();
};

const rules = {
  username: [
    { required: true, validator: validateUsername, trigger: "change" },
  ],
  phoneNum: [
    { required: true, validator: validatePhoneNum, trigger: "change" },
  ],
  emailAddress: [
    { required: true, validator: validateEmailAddress, trigger: "change" },
  ],
};
</script>

<style lang="less">
.collection-create-form_last-form-item {
  margin-bottom: 0;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 2px;
  color: #666;
}
</style>
