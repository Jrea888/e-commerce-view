/*
 * @Description: 配置页面路由
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-05-23 21:28:45
 * @LastEditors: zhangweigang
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/login'
  },
  // 登录模块
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ 'views/login/Login.vue'),
    meta: {
      title: '登录-电商后台管理系统'
    }
  },
  // 系统主页
  {
    path: '/index',
    name: 'Index',
    // 魔法注释，给打包后的文件单独命名
    component: () => import(/* webpackChunkName: "index" */ 'views/index.vue'),
    meta: {
      title: '主页-电商后台管理系统'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
