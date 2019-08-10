import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
// 引入布局组件
import Vant, { Lazyload } from 'vant';
// 引入布局组件样式
import 'vant/lib/index.css';
// 引入rem适配组件
import 'amfe-flexible';
// 引入全局样式
import './styles/index.css';
// 引入验证组件
import VeeValidate, { Validator } from 'vee-validate';
// 引入验证提示语言
import zhCN from 'vee-validate/dist/locale/zh_CN';
// 默认是input事件触发，可以改成 blur 事件触发
Vue.use(VeeValidate, {
    events: 'blur'
});
Validator.localize('zh-cn', zhCN);

// 使用前挂载
Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
