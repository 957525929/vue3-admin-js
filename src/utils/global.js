//antd
import { message, Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
//命名周期
const azong = {};

//删除弹窗
azong.deleteConfirm = (params) => {
    Modal.confirm({
        title: params.title || '温馨提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: params.content || '确认删除此信息，删除后无法恢复',
        okText: params.ok_text || '确认',
        okType: 'danger',
        cancelText: params.cancel_text || '取消',

        onOk() {
            // if (params) { data.delete_id = params.member_id; }
            // deleteApi();
            params.ok_fun && Object.prototype.toString.call(params.ok_fun) === "[object Function]" && params.ok_fun()
        },

        onCancel() {
            console.log('Cancel');
        },
    });
}
export default {
    install: (app, options) => {
        app.config.globalProperties['deleteConfirm'] = azong.deleteConfirm
    }
}