<!--
 * @Description: 首次渲染页面
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-06-18 17:09:08
 * @LastEditors: zhangweigang
-->
<template>
  <div id="app">
    <!-- 路由 占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
@import 'assets/styles/common.css';
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
