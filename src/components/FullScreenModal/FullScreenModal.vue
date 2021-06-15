<!--
 * @Author: your name
 * @Date: 2021-03-15 15:43:21
 * @LastEditTime: 2021-05-12 18:08:56
 * @LastEditors: wangning
 * @Description: In User Settings Edit
 * @FilePath: \stma-cmm-view\src\components\FullScreenModal\FullScreenModal.vue
-->

<template>
  <a-modal :visible="visible" destroy-on-close width="100%" height="100%" :footer="null" :closable="false" dialog-class="modal-full-screen">
    <div class="contain">
      <slot></slot>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.modal-full-screen {
  background: #f2ecdf;
  height: 100%;
  padding-bottom: 0 !important;
  top: 0 !important;
  max-width: none !important;
  margin: 0 !important;
  .ant-modal-content {
    background: #f2ecdf;
    height: 100%;
    .ant-modal-header {
      display: none;
    }
    .ant-modal-body {
      background: #f2ecdf;
    }
  }
}
.contain {
  overflow-y: hidden;
}
</style>
