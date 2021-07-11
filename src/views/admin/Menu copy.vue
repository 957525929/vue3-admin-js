<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="当前菜单">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item label="菜单名称(中文)">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary">Create</a-button>
      <a-button style="margin-left: 10px">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
  setup(props) {
    const formState = reactive({
      username: "",
      truename: "",
      phone: "",
      cardId: "",
      role: "",
      password: "",
      status: 'true'
    });

    return {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 7,
      },
      formState
    }
  },
}
</script>

<style>
</style>