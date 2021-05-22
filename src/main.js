/*
 * @Description: 主要配置文件
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-05-22 10:30:23
 * @LastEditors: zhangweigang
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/lazy_use.js';

import 'ant-design-vue/dist/antd.css';
import 'assets/css/common.css';

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
