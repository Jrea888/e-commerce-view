<!--
 * @Description: 商品分类
 * @Author: zhangweigang
 * @Date: 2021-06-14 23:20:38
 * @LastEditTime: 2021-06-15 23:50:28
 * @LastEditors: zhangweigang
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <a-breadcrumb>
      <span slot="separator" style="color: white">></span>
      <a-breadcrumb-item href="/index" class="c_white">首页</a-breadcrumb-item>
      <a-breadcrumb-item class="c_white">商品分类</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 内容区域 -->
    <a-card class="cs_card">
      <a-button type="primary" icon="plus" @click="visibleRecInfo = true"> 添加分类 </a-button>
    </a-card>
    <a-card class="cs_card">
      <!-- 商品分类表格 -->
      <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="data" />
    </a-card>
    <!-- 添加分类 弹出框 -->
    <!-- search查询 undo重置-->
    <a-modal v-model="visibleRecInfo" title="选择收信人" :destroy-on-close="true" :footer="null" width="1200px">
      <a-row type="flex" align="middle">
        <a-col :span="2">分类名称：</a-col>
        <a-col :span="2">描述：</a-col>
      </a-row>
      <a-row>
        <a-col :span="24" align="right">
          <a-button type="default" @click="visibleRecInfo = false">取消</a-button>
          <a-button type="primary" class="cs_ml" @click="saveProCate">确定</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
export default {
  data() {
    return {
      visibleRecInfo: false,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 保存商品分类
    saveProCate() {
      this.visibleRecInfo = false;
    }
  }
};
</script>

<style></style>
