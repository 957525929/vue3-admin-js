<template>
  <div>
    <div class="form-wrap">
      <a-form name="custom-validation" ref="ruleForm" :model="account_form" :rules="rules_form" @finish="handleFinish">
        <label>用户名</label>
        <a-form-item name="username">
          <a-input v-model:value="account_form.username" type="text" autocomplete="off" placeholder="请输入用户名" />
        </a-form-item>

        <label>密码</label>
        <a-form-item name="password">
          <a-input-password v-model:value="account_form.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block> 登录 </a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/forget" class="color-white">忘记密码</router-link> |
        <router-link to="/register" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//antd
import { message } from "ant-design-vue";
//api
import { Login } from "@/api/account";
//导入验证类的方法
import {
  checkPhone as phone,
  checkPassword as passWord,
} from "@/utils/verification";
import { onMounted, reactive, toRefs, ref } from "vue";
//路由
import { useRouter } from "vue-router";
//局部组件(导入)
import CaptCha from "@/components/Captcha";
//加密
import md5 from 'js-md5';
//cookie
import { setToken, setUsername, getToken } from "@/utils/cookies";
export default {
  name: "Login",
  components: { CaptCha },
  setup(props) {
    // console.log(useRouter());
    //js语法
    /**
     * 1、js语法跳转
     * 2、dom标签跳转
     */

    /**
     * 需要用户返回上一个页面就用push（追加了一个历史记录）
     * 不让用户返回上一个界面就用replace（替换了当前的历史记录）
     */
    const { replace, push } = useRouter();

    //校验用户名
    const checkUsername = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        dataItem.disabled_code_button = true;
        return Promise.reject("请输入用户名"); //不存在情况
      } else if (!phone(value)) {
        dataItem.disabled_code_button = true;
        return Promise.reject("请输入11位数字的手机号码"); //手机号错误的情况
      } else {
        // callback();
        // checkUsernameFn();
        dataItem.disabled_code_button = false;
        return Promise.resolve();
      }
    };
    //校验密码
    const checkPassword = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      const passwords = formConfig.account_form.passwords;
      if (!value) {
        return Promise.reject("请输入密码"); //不存在情况
      } else if (!passWord(value)) {
        return Promise.reject("请输入6~20位的，数字加英文"); //密码错误的情况
      } else {
        // callback();
        return Promise.resolve();
      }
    };


    //from 表单配置 
    const formConfig = reactive({
      //类似于JSON对象的语法
      layout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      },
      account_form: {
        username: "",
        password: "",
      },
      input_diabled: {
        username: false
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
      },
    });
    //data
    const dataItem = reactive({
    });

    const form = toRefs(formConfig);
    const data = toRefs(dataItem);
    /**
     * 
     * =====================================
     * 
     */
    //提交表单
    const handleFinish = (value) => {
      const requestData = {
        username: formConfig.account_form.username,
        password: md5(formConfig.account_form.password),
      }
      // console.log("加密:" + getAES("qqq123"))
      // console.log("解密:" + getDAes("b3dbfaff46d25c83cee5786c510690a6"))
      Login(requestData).then(response => {
        const data = response.content;
        setToken({ token: data.token })
        setUsername({ value: data.username })
        //进入后台
        push({
          name: "Index"
        })
      })
    };

    return {
      ...form,
      ...data,
      handleFinish
    };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>