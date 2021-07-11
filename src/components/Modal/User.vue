<template>
  <a-modal v-model:visible="visible" :title="rowId?'编辑用户':'新增用户'" @cancel="close" :confirm-loading="data.confirmLoading" @ok="handleOk" :footer="null">
    <a-form name="custom-validation" ref="formRef" :model="formState" :label-col="labelCol" :rules="rules_form" :wrapper-col="wrapperCol">

      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="真实姓名" name="truename">
        <a-input v-model:value="formState.truename" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>

      <a-form-item label="身份证" name="card_id">
        <a-input v-model:value="formState.card_id" />
      </a-form-item>

      <a-form-item label="角色类型" name="role">
        <a-radio-group :options="roleOptions" v-model:value="formState.role" />
      </a-form-item>

      <a-form-item label="禁启用" name="status">
        <a-radio-group :options="isOptions" v-model:value="formState.status" />
      </a-form-item>

      <div class="line"></div>

      <a-row type="flex" justify="end" align="middle" class="layout-1">
        <a-col :span="4">
          <a-form-item>
            <a-button @click="close"> 取消 </a-button>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-button type="primary" html-type="submit" @click="submit"> 确认 </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, ref, watch } from "vue";
//API
import { UserCreate, UserInfo, UserUpdate } from "@/api/user"
//加密
import md5 from 'js-md5';
import { message } from 'ant-design-vue';
//导入验证类的方法
import {
  checkPhone as phone,
  checkEmail as email,
  checkTruename as truename,
  checkPassword as passWord,
  checkCardId as cardId
} from "@/utils/verification";
//utils
import { requestDataFormat } from "@/utils/formData"
export default {
  name: "",
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: [Number, String],
      default: ""
    }
  },
  emits: ["update:show", "update:rowId", "loadData"],
  setup(props, context) {
    const data = reactive({
      confirmLoading: false,
    })

    let formState = reactive({
      username: "",
      truename: "",
      phone: "",
      card_id: "",
      role: "",
      password: "",
      status: true,
    });

    //校验手机号
    const checkPhone = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        return Promise.reject("请输入手机号"); //不存在情况
      } else if (!phone(value)) {
        return Promise.reject("请输入11位数字的手机号码"); //错误的情况
      } else {
        // checkUsernameFn();
        return Promise.resolve();
      }
    };

    //校验用户名
    const checkUsername = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        return Promise.reject("请输入用户名"); //不存在情况
      } else if (!email(value)) {
        return Promise.reject("请输入正确格式的用户名"); //错误的情况
      } else {
        // checkUsernameFn();
        return Promise.resolve();
      }
    };

    //校验真实姓名
    const checkTruename = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        return Promise.reject("请输入真实姓名"); //不存在情况
      } else if (!truename(value)) {
        return Promise.reject("请输入汉字"); //错误的情况
      } else {
        // checkUsernameFn();
        return Promise.resolve();
      }
    };

    //校验密码
    const checkPassword = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject("请输入密码"); //不存在情况
      } else if (!passWord(value)) {
        return Promise.reject("请输入6~20位的，数字加英文"); //密码错误的情况
      } else {
        return Promise.resolve();
      }
    };

    //校验身份证
    const checkCardId = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        return Promise.reject("请输入身份证"); //不存在情况
      } else if (!cardId(value)) {
        return Promise.reject("请输入正确格式的身份证"); //错误的情况
      } else {
        // checkUsernameFn();
        return Promise.resolve();
      }
    };

    //校验角色类型
    const checkRole = async (rule, value, callback) => {
      // console.log(regPhone.test(value));
      if (!value) {
        return Promise.reject("请选择一个角色类型"); //不存在情况
      } else {
        // checkUsernameFn();
        return Promise.resolve();
      }
    };

    const rules_form = {
      phone: [{ validator: checkPhone, trigger: "change" }],
      username: [{ validator: checkUsername, trigger: "change" }],
      truename: [{ validator: checkTruename, trigger: "change" }],
      password: [{ validator: checkPassword, trigger: "change" }],
      card_id: [{ validator: checkCardId, trigger: "change" }],
      role: [{ validator: checkRole, trigger: "change" }],
    };

    const roleOptions = [
      {
        label: '超管',
        value: 'admin',
      },
      {
        label: '产品管理员',
        value: 'product',
      },
      {
        label: '用户管理',
        value: 'user',
      },
    ];

    const isOptions = [
      {
        label: '启用',
        value: true,
      },
      {
        label: '禁用',
        value: false,
      },
    ]
    const visible = ref(false);
    // console.log(props.show)
    watch(() => props.show, (newValue, oldValue) => {
      // console.log(newValue)
      visible.value = newValue;
      // console.log(visible.value)
      // //用户详情请求
      if (props.rowId && newValue) {
        getUserInfo();
      }
    })

    const getUserInfo = () => {
      UserInfo({ member_id: props.rowId }).then(response => {
        // console.log(response.content)
        // requestDataFormat(response.content, formState, ["status"])
        requestDataFormat({
          data: response.content,
          form: formState,
          match: ["status", "type"]
        })
      })
    }

    //关闭按钮事件
    const close = () => {
      resetForm();
      data.member_id = "";
      context.emit("update:show", false);
      context.emit("update:rowId", "");
    }

    //确认按钮事件
    const submit = () => {
      props.rowId ? handlerUserEdit() : handlerUserAdd();
    }
    //用户新增
    const handlerUserAdd = () => {
      data.confirmLoading = true;
      //密码加密
      //浅拷贝
      // const request_Data = JSON.parse(JSON.stringify(formState))
      const request_data = Object.assign({}, formState);
      request_data.password = md5(request_data.password);
      // if ((!formState.phone || !formState.username || !formState.truename || !formState.password || !formState.cardId || !formState.role)) {
      //   // console.log(checkPassword().PromiseState)
      //   //还原加载状态
      //   data.confirmLoading = false;
      // } else {
      UserCreate(formState).then(response => {
        // console.log(rules_form.cardId[0].validator)
        // console.log(async - validator)
        // console.log(!formState.phone || !formState.username || !formState.truename || !formState.password || !formState.cardId || !formState.role )
        // return false
        const resopnse_data = response.content;
        // console.log(resopnse_data);
        //还原加载状态
        data.confirmLoading = false;

        // 用户存在
        if (!resopnse_data.user) {
          message.error(response.msg)
          return false
        }

        //用户新增成功
        message.success(response.msg);
        close();
        context.emit("loadData");
        // close();
      }).catch(error => {
        data.confirmLoading = false;
      })
    }
    //用户编辑
    const handlerUserEdit = () => {
      data.confirmLoading = true;
      //密码加密
      const request_data = Object.assign({}, formState);

      if (request_data.password) {
        request_data.password = md5(request_data.password);
      } else {
        delete request_data.password;
      }
      UserUpdate({ ...request_data, member_id: props.rowId }).then(response => {
        const resopnse_data = response.content;
        //还原加载状态
        data.confirmLoading = false;
        //用户新增成功
        message.success(response.msg);
        close();
        context.emit("loadData")
        // close();
      }).catch(error => {
        data.confirmLoading = false;
      })
    }
    //获取form表单
    const formRef = ref(null);
    const resetForm = () => {
      formRef.value.resetFields();
    }

    return {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
      visible,
      close,
      formState,
      roleOptions,
      isOptions,
      formRef,
      data,
      submit,
      rules_form
    }
  }
}
</script>

<style lang='scss' scoped>
</style>