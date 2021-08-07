<template>
  <a-row :gutter="30">
    <a-col :span="8">
      <div class="header-wrap">
        <h4>菜单列表</h4>
        <div class="button-group">
          <a-button type="primary" @click="handlerCategory('first_category_add')">一级添加菜单</a-button>
        </div>
      </div>
      <hr />
      <a-tree :tree-data="data.tree_data" :defaultExpandAll="true">
        <template #title="{ menu_id, menu_name_cn }">
          <div class="menu-item">
            <span>{{menu_name_cn}}</span>
            <div class="button-group">
              <a-button type="primary" class="button-mini" @click="handlerCategory('child_category_add',menu_id)">添加子菜单</a-button>
              <a-button class="button-mini" @click="handlerCategory('category_edit',menu_id)">编辑</a-button>
              <a-button class="button-mini" @click="handlerDelete(menu_id)">删除</a-button>
            </div>
          </div>
        </template>
      </a-tree>
    </a-col>
    <a-col :span="16">
      <div class="header-wrap">
        <h4>菜单信息</h4>
      </div>
      <hr />
      <div class="form-wrap">
        <a-spin :spinning="data.spinning">
          <a-form ref="formDom" @finish="handleFinish" :model="field" :rules="rules_form" :label-col="labelCol" :wrapper-col="wrapperCol">

            <a-form-item label="菜单名称（中文）" name="menu_name_cn">
              <a-input v-model:value="field.menu_name_cn" />
            </a-form-item>
            <a-form-item label="菜单名称（英文）" name="menu_name_en">
              <a-input v-model:value="field.menu_name_en" />
            </a-form-item>
            <a-form-item label="Path路径" name="router_path">
              <a-input v-model:value="field.router_path" />
            </a-form-item>
            <a-form-item label="路由名称" name="router_name">
              <a-input v-model:value="field.router_name" />
            </a-form-item>
            <a-form-item label="页面路径" name="component">
              <a-input v-model:value="field.component" />
            </a-form-item>
            <a-form-item label="图标" name="icon">
              <a-upload v-model:file-list="field.icon" name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload" @change="handleChange">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="排序" name="sort">
              <a-input-number :min="1" :max="10" v-model:value="field.sort" />
            </a-form-item>
            <a-form-item label="隐藏路由" name="hidden">
              <a-radio-group :options="data.isOptions" v-model:value="field.hidden" />
            </a-form-item>
            <a-form-item label="禁启用" name="disabled">
              <a-radio-group :options="data.isOptions" v-model:value="field.disabled" />
            </a-form-item>
            <a-form-item label="页面缓存" name="keep">
              <a-radio-group :options="data.isOptions" v-model:value="field.keep" />
            </a-form-item>
            <a-form-item label="重定向" name="redirect">
              <a-input v-model:value="field.redirect" />
            </a-form-item>

            <a-form-item :wrapper-col="{span:14,offset:8}">
              <a-button html-Type="submit" type="primary" :disabled="!data.menu_type" :loading="data.submit_loading">
                确认{{data.menu_type==="category_edit"?"编辑":"添加"}}
              </a-button>
              <a-button>重置</a-button>
            </a-form-item>
          </a-form>
        </a-spin>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { reactive, ref, toRefs, onBeforeMount, getCurrentInstance } from 'vue'
// API
import { MenuCreate, MenuListTree, MenuList, MenuDetailed, MenuUpdate, MenuRemove } from "@/api/menu";
// antdesign
import { message } from 'ant-design-vue';
//utils
import { requestDataFormat } from "@/utils/formData"
export default {
  name: "Menu",
  components: {},
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      tree_data: [
      ],
      isOptions: [
        {
          label: '启用',
          value: '0',
        },
        {
          label: '禁用',
          value: '1',
        },
      ],
      menu_type: "",
      menu_id: 0,
      submit_loading: false,
      spinning: false,
      row_id: 0
    })
    const form = reactive({
      field: {
        menu_name_cn: "",
        menu_name_en: "",
        router_name: "",
        component: "",
        icon: "",
        sort: "",
        disabled: "1",
        keep: "0",
        lang: "",
        router_path: "",
        hidden: "",
        // parent_id: "en",
      },
      rules_form: {
        menu_name_cn: [{ required: true, message: "请输入中文名称", trigger: 'blur' }],
        menu_name_en: [{ required: true, message: "请输入英文名称", trigger: 'blur' }],
        router_name: [{ required: true, message: "请输入路由名称", trigger: 'blur' }],
        component: [{ required: true, message: "请输入组件路由", trigger: 'blur' }]
      },
    })
    // const form_data = toRefs(form);
    //菜单添加
    const handlerCategory = (type, menu_id) => {
      console.log(menu_id)
      //标记类型
      data.menu_type = type;
      //菜单ID
      data.menu_id = menu_id || 0;
      //重置表单
      handlerResetField()
      if (data.menu_type === "category_edit") {
        handlerMenuDetailed();
      }
    }
    //表单提交
    const handleFinish = () => {
      if (data.menu_type === "category_edit") { handlerMenuEdit() }
      if (data.menu_type === "first_category_add" || data.menu_type === "child_category_add") { handlerFirstCategoryAdd() }
      // console.log(data.menu_type)
    }
    //一级菜单添加
    const handlerFirstCategoryAdd = () => {
      data.submit_loading = true;
      //parent_id
      const request_data = {};
      if (data.menu_type === "child_category_add") {
        request_data.parent_id = data.menu_id;
      }
      MenuCreate({ ...form.field, ...request_data }).then(response => {
        data.submit_loading = false;
        message.success("添加成功");
        handlerResetField();
        data.menu_type = "";
        // getMenuListTree();
        getMenuList();
      }).catch(error => {
        data.submit_loading = false;
        // message.error("添加失败")
      })
    }
    //清除表单数据
    const formDom = ref(null);
    const handlerResetField = () => {
      formDom.value.resetFields()
    }

    const getMenuListTree = () => {
      MenuListTree().then(response => {
        data.tree_data = response.content;
      })
    }

    const getMenuList = () => {
      MenuList().then(response => {
        const response_data = response.content;
        data.tree_data = formatTree({
          data: response_data,
          id: "menu_id",
          parent_id: "parent_id",
          child: "children",
          root: 0
        });
        // console.log(tree)
      })
    }

    const formatTree = (params) => {  //递归
      const tree = [];
      if (params.data.length > 0) {
        params.data.forEach(item => {
          //获取顶部菜单
          if (item[params.parent_id] === params.root) {
            const child = formatTree({
              data: params.data,
              id: params.id,
              parent_id: params.parent_id,
              child: params.child,
              root: item[params.id]
            });
            if (child) {
              item[params.child] = child;
            }
            tree.push(item);
          }
        })
        // console.log(tree)

      }
      return tree;
    }


    onBeforeMount(() => {
      // getMenuListTree();
      getMenuList();
    })

    /**获取菜单详情 */
    const handlerMenuDetailed = () => {
      if (data.spinning) { return false }
      //添加表单的遮罩
      data.spinning = true;
      MenuDetailed({ menu_id: data.menu_id }).then(response => {
        console.log(response)
        requestDataFormat({
          data: response.content,
          form: form.field
        })
        data.spinning = false;
      }).catch(error => {
        data.spinning = false;
      })
    }
    /**修改菜单 */
    const handlerMenuEdit = () => {
      data.submit_loading = true;
      MenuUpdate({ ...form.field, menu_id: data.menu_id }).then(response => {
        data.submit_loading = false;
        message.success("修改成功");
        handlerResetField();
        data.menu_type = "";
        // getMenuListTree();
        getMenuList();
      })
    }
    /**删除菜单 */
    const handlerDelete = (id) => {
      data.row_id = id;
      proxy.deleteConfirm({
        ok_fun: () => handlerDeleteApi()
      });

    }

    const handlerDeleteApi = () => {
      MenuRemove({ menu_id: data.row_id }).then(response => {
        getMenuList();
      })
    }
    return {
      data,
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
      ...(toRefs(form)),
      handleFinish,
      formDom,
      handlerCategory,
      handlerDelete
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  height: 32px;
  .button-group {
    margin-left: auto;
  }
}
.menu-item {
  display: flex;
  align-items: center;
  .button-group {
    margin-left: auto;
  }
}
.form-wrap {
  width: 500px;
}
:deep(.button-mini) {
  height: auto;
  padding: 5px 8px;
  font-size: 12px;
}
:deep(.ant-tree li .ant-tree-node-content-wrapper) {
  padding: 4px 5px;
  height: auto;
}
:deep(.ant-tree li) {
  display: flex;
  flex-wrap: wrap;
}
:deep(.ant-tree li .ant-tree-node-content-wrapper) {
  flex: 1;
}
:deep(.ant-tree li ul) {
  width: 100%;
}
</style>