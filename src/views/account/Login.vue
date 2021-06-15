<template>
  <div class="account">
    <div class="form-wrap">
      <a-form name="custom-validation" ref="ruleForm">
        <a-form-item>
          <label>用户名</label>
          <a-input type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item>
          <label>密码</label>
          <a-input type="password" utocomplete="off" />
        </a-form-item>

        <a-form-item>
          <CaptCha />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block> 登录 </a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/Forget" class="color-white">忘记密码</router-link>|
        <router-link to="/Register" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from "vue";
//局部组件(导入)
import CaptCha from "@/components/Captcha";
export default {
  name: "Login",
  components: { CaptCha },
  setup(props) {
    const formConfig = reactive({
      //类似于JSON对象的语法
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    });
    const data = toRefs(formConfig);

    return {
      ...data,
    };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
