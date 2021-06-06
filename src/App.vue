<!--
 * @Description: 首次渲染页面
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-06-06 11:56:58
 * @LastEditors: zhangweigang
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
@import 'assets/css/common.css';
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
