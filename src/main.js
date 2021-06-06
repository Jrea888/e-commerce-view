/*
 * @Description: 主要配置文件
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-05-23 19:32:32
 * @LastEditors: zhangweigang
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 按需引入ant-design-vue组件
import './plugins/lazy_use.js';
// 引入 ant-design-vue
import 'ant-design-vue/dist/antd.css';

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
