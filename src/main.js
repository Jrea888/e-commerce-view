/*
 * @Description: 主要配置文件
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-06-21 14:21:28
 * @LastEditors: zhangweigang
 */
// 根据 browserslistrc 目标导入所有polyfills
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
// 进度条加载样式
import 'nprogress/nprogress.css';
// 阿里矢量图标
import './assets/iconfont/iconfont.css';
// 全局样式
import './assets/styles/global.less';

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
