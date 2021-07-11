import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
//router拦截
import "./router/permit";
//axios
import Axios from "axios";
//语言
import VueI18n from "./language/index";
//svg文件解析   
import "./js/svg"
//注册全局组件
import Svgicon from "@/components/Svgicon"

const app = createApp(App);
//注入Axios
app.config.globalProperties.$axios = Axios;

app
    .use(store)
    .use(router)
    .use(Antd)
    .use(VueI18n)
    .component("svg-icon", Svgicon)
    .mount("#app");
