<template>
  <div class="account">
    <div class="form-wrap">
      <a-form name="custom-validation" ref="ruleForm" :model="account_form" :rules="rules_form" @finish="handleFinish">
        <label>用户名</label>
        <a-form-item name="username">
          <a-input v-model:value="account_form.username" type="text" autocomplete="off" />
        </a-form-item>

        <label>密码</label>
        <a-form-item name="password">
          <a-input v-model:value="account_form.password" type="text" autocomplete="off" />
        </a-form-item>

        <label>确认密码</label>
        <a-form-item name="passwords">
          <a-input v-model:value="account_form.passwords" type="text" autocomplete="off" />
        </a-form-item>
        <label>验证码</label>
        <a-form-item>
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input v-model:value="account_form.code" type="text" autocomplete="off" maxlength="6" />
            </a-col>
            <a-col :span="10">
              <a-button type="primary" @click="getCode" block :disabled="button_disabled" :loading="button_loading">{{ button_text }}</a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <CaptCha />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            重置密码
          </a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/" class="color-white">登录</router-link>|
        <router-link to="/Register" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//antd
import { message } from "ant-design-vue";
//导入验证类的方法
import {
  checkPhone as phone,
  checkPassword as passWord,
  checkCode as code,
} from "@/utils/verification";
import { onMounted, reactive, toRefs, ref } from "vue";
//局部组件(导入)
import CaptCha from "@/components/Captcha";
export default {
  name: "Login",
  components: { CaptCha },
  setup(props) {
    //校验用户名
    const checkUsername = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        return Promise.reject("请输入用户名"); //不存在情况
      } else if (!phone(value)) {
        return Promise.reject("请输入11位数字的手机号码"); //手机号错误的情况
      } else {
        // callback();
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
      } else if (passwords && value && passwords !== value) {
        //必须是两次密码都存在，才会检测密码是否一致，否则不检测
        return Promise.reject("两次密码不一致");
      } else {
        // callback();
        return Promise.resolve();
      }
    };

    //再次校验密码
    const checkPasswords = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      const password = formConfig.account_form.password;
      if (!value) {
        return Promise.reject("请再次输入密码"); //不存在情况
      } else if (!passWord(value)) {
        return Promise.reject("请输入6~20位的，数字加英文"); //密码错误的情况
      } else if (value && password && password !== value) {
        return Promise.reject("两次密码不一致");
      } else {
        // callback();
        return Promise.resolve();
      }
    };

    //校验验证码
    const checkCode = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject("请输入验证码"); //不存在情况
      } else if (!code(value)) {
        return Promise.reject("请输入6位的数字加英文"); //密码错误的情况
      } else {
        return Promise.resolve();
      }
    };

    const formConfig = reactive({
      //类似于JSON对象的语法
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      account_form: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
        passwords: [{ validator: checkPasswords, trigger: "change" }],
        code: [{ validator: checkCode, trigger: "change" }],
      },
    });

    const dataItem = reactive({
      //获取验证码
      button_text: "获取验证码",
      button_loading: false,
      button_disabled: false,
      sec: 5,
      //定时器
      timer: null,
    });

    const form = toRefs(formConfig);
    const data = toRefs(dataItem);

    //提交表单
    const handleFinish = (value) => {
      console.log(value);
    };
    //获取验证码
    const getCode = () => {
      //用户名不存在的情况
      if (!formConfig.account_form.username) {
        message.error("用户名不能为空");
        return false;
      }
      //优先判断定时器是否存在，如果存在则清除清除在开始
      dataItem.timer && clearInterval(dataItem.timer);
      //开启定时器
      dataItem.timer = setInterval(() => {

        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        if (s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = `重新获取`;
        }
      }, 1000);
    };
    onMounted(() => { });
    return {
      ...form,
      ...data,
      handleFinish,
      getCode,
    };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>