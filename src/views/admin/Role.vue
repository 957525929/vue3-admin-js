<template>
  <a-table :columns="data.columns" :data-source="data.dataSource" bordered>
    <template #status="{text}">
      <a-switch v-model:checked="checked" :checked="text" />
    </template>
    <template #operation>
      <a-button type="primary">详情</a-button>
      <a-button type="dashed">编辑</a-button>
      <a-button type="danger">删除</a-button>
    </template>
  </a-table>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
  setup(props) {
    const data = reactive({
      dataSource: [
        {
          key: "1",
          role: 'admin',
          status: '',
          power: "",
          operation: ""
        },
        {
          key: "2",
          role: '产品管理员',
          status: '',
          power: "",
          operation: ""
        },
        {
          key: "3",
          role: '会员管理员',
          status: '',
          power: "",
          operation: ""
        },
      ],

      columns: [
        {
          title: '角色',
          dataIndex: 'role',
          key: 'role',
          width: 120,
          align: 'center',
        },
        {
          title: '状态(禁/启用)',
          dataIndex: 'status',
          key: 'status',
          width: 120,
          align: 'center',
          slots: {
            customRender: 'status',
          },
        },
        {
          title: '权限',
          dataIndex: 'power',
          key: 'power',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 260,
          align: 'center',
          slots: {
            customRender: 'operation',
          },
        },
      ],
    })
    return {
      data
    }
  }

}

</script>

<style>
</style>