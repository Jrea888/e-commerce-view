<!--
 * @Description: 首次渲染页面
 * @Author: zhangweigang
 * @Date: 2021-05-18 00:10:23
 * @LastEditTime: 2021-05-21 18:16:12
 * @LastEditors: zhangweigang
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <a-button type="primary">按钮</a-button>
    <a-switch default-checked @change="onChange" />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onChange(e) {
      console.log(`a-switch to `);
    }
  }
};
</script>

<style></style>
