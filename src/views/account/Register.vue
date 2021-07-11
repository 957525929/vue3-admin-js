<template>
  <div class="account">
    <div class="form-wrap">
      <a-form name="custom-validation" ref="ruleForm" :model="account_form" :rules="rules_form" @finish="handleFinish">
        <label>用户名</label>
        <a-form-item name="username">
          <a-input v-model:value="account_form.username" type="text" :disabled="input_diabled.username" autocomplete="off" />
        </a-form-item>

        <label>密码</label>
        <a-form-item name="password">
          <a-input-password v-model:value="account_form.password" placeholder="请输入密码" />
        </a-form-item>

        <label>确认密码</label>
        <a-form-item name="passwords">
          <a-input-password v-model:value="account_form.passwords" placeholder="请再次输入密码" />
        </a-form-item>
        <label>验证码</label>
        <a-form-item name="code">
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input v-model:value="account_form.code" type="text" autocomplete="off" maxlength="6" />
            </a-col>
            <a-col :span="10">
              <a-button type="primary" @click="getCode" block :disabled="disabled_code_button" :loading="button_loading">{{ button_text }}</a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block> 注册 </a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/" class="color-white">登录</router-link> |
        <router-link to="/Forget" class="color-white">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//antd
import { message } from "ant-design-vue";
//api
import { CheckUsername, Send, Register } from "@/api/account";
//导入验证类的方法
import {
  checkPhone as phone,
  checkPassword as passWord,
  checkCode as code,
} from "@/utils/verification";
import { onMounted, reactive, toRefs, ref } from "vue";
//路由
import { useRouter } from "vue-router";
//局部组件(导入)
import CaptCha from "@/components/Captcha";
//加密
import md5 from 'js-md5';
// import { getAES, getDAes } from "@/utils/crypto"

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
    const { replace } = useRouter();
    // setTimeout(() => {
    //   replace({
    //     name: "Login"
    //   })
    // }, 3000)
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
        return Promise.reject("请输入6位的数字"); //密码错误的情况
      } else {
        return Promise.resolve();
      }
    };
    //from 表单配置 
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
      input_diabled: {
        username: false
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
        passwords: [{ validator: checkPasswords, trigger: "change" }],
        code: [{ validator: checkCode, trigger: "change" }],
      },
    });
    //data
    const dataItem = reactive({
      //获取验证码
      button_text: "获取验证码",
      button_loading: false,
      disabled_code_button: true,

      sec: 0,
      //定时器
      timer: null,
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
        code: formConfig.account_form.code,
      }
      // console.log("加密:" + getAES("qqq123"))
      // console.log("解密:" + getDAes("b3dbfaff46d25c83cee5786c510690a6"))
      Register(requestData).then(response => {
        const code = response.content.code;
        const msg = code ? "注册成功" : response.msg;
        message.success(msg)
        //注册成功跳转登录页面，不需要返回上一个页面
        replace({
          name: "Login"
        })
      })
    };
    //获取验证码
    const getCode = async () => {  //async,await
      const usernameStatus = await checkUsernameFn();  //等待哪个接口，await就给谁用
      console.log("usernameStatus", usernameStatus)
      if (usernameStatus) { return false }

      //按钮的加载
      dataItem.button_loading = true;
      //按钮文本
      dataItem.button_text = "发送中"
      //接口请求
      Send({ username: formConfig.account_form.username, type: "Register" }).then(response => {
        // console.log(response)
        message.success("验证码发送成功，验证码为：" + response.content)
        //关闭按钮加载
        dataItem.button_loading = false;
        //禁用
        dataItem.disabled_code_button = true;
        //倒计时
        countDown();

      }).catch(error => {
        dataItem.button_text = `重新获取`;
        //按钮激活
        dataItem.disabled_code_button = false;
      })
    };
    //倒计时
    const countDown = () => {
      //更新时间
      dataItem.sec = process.env.VUE_APP_COUNTDOWN
      //优先判断定时器是否存在，如果存在则清除清除在开始
      dataItem.timer && clearInterval(dataItem.timer);
      //开启定时器
      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        if (s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = `重新获取`;
          //按钮激活
          dataItem.disabled_code_button = false;
        }
      }, 1000);
    }
    //
    const checkUsernameFn = () => {
      formConfig.input_diabled.username = true;
      return CheckUsername({ username: formConfig.account_form.username }).then(response => {
        //用户名状态
        const user_status = response.content.user;
        //发送验证码按钮状态
        dataItem.disabled_code_button = user_status;
        //用户名输入框状态
        formConfig.input_diabled.username = false;
        // console.log(111)
        if (user_status) {
          message.error(response.msg)
        }
        return user_status;
      }).catch(error => {
        formConfig.input_diabled.username = false;

        // console.log(222)
      })
    }
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