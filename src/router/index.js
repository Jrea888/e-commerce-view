/*
 * @Description: 配置页面路由
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-06-18 17:11:36
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
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  // 系统主页
  {
    path: '/index',
    name: 'Index',
    redirect: '/home',
    // 魔法注释，给打包后的文件单独命名
    component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "welcome" */ '@/views/home/Home.vue'),
        meta: {
          title: '主页'
        }
      },
      // 商品分类
      {
        path: '/productCategorg',
        name: 'productCategorg',
        component: () => import(/* webpackChunkName: "proCate" */ '@/views/commodity/productCategorg.vue'),
        meta: {
          title: '商品分类'
        }
      },
      // 下级分类
      {
        path: '/subCategorg',
        name: 'subCategorg',
        component: () => import(/* webpackChunkName: "subCategorg" */ '@/views/commodity/subCategorg.vue'),
        meta: {
          title: '商品分类'
        }
      },
      // 商品类型
      {
        path: '/productType',
        name: 'productType',
        component: () => import(/* webpackChunkName: "proType" */ '@/views/commodity/productType.vue'),
        meta: {
          title: '商品类型'
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-电商后台管理系统';
  }
  next();
});

export default router;
