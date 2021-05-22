/*
 * @Description: 配置页面路由
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-05-21 10:59:30
 * @LastEditors: zhangweigang
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ 'views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // 魔法注释，给打包后的文件单独命名
    component: () => import(/* webpackChunkName: "about" */ 'views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
