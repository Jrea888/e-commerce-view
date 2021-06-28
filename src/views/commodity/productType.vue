<!--
 * @Description: 商品类型
 * @Author: zhangweigang
 * @Date: 2021-06-14 23:21:34
 * @LastEditTime: 2021-06-23 23:02:25
 * @LastEditors: zhangweigang
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <a-breadcrumb>
      <span slot="separator" style="color: white">></span>
      <a-breadcrumb-item><a class="c-white" href="/index">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item class="c-white">商品类型</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 内容区域 -->
    <div class="cs_card add_cate">
      <a-button type="primary" icon="plus" @click="visibleAttCateRest = true"> 添加类型 </a-button>
      <a-button class="batch-btn cs_ml" type="primary" icon="delete" @click="showDeleteConfirm">批量删除</a-button>
    </div>
    <a-card class="cs_card">
      <!-- 商品类型表格 -->
      <d-table
        :row-key="(record, index) => index"
        :data="loadData"
        :columns="columns"
        show-pagination="auto"
        bordered
        size="small"
        ref="table"
        :row-selection="{
          columnWidth: '30px',
          selectedRowKeys: batchStatus,
          onChange: onSelectChange
        }"
      >
        <!-- 序号 -->
        <span slot="rowIndex" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- 操作 -->
        <span slot="rowAction" slot-scope="text, record">
          <a @click="editHandle(record)"><a-icon type="edit" /> 编辑 </a>
          <a-popconfirm ok-text="删除" cancel-text="取消" @confirm="deleteHandle(record)">
            <template slot="title">
              <p style="color: #f00">您确定要删除吗？</p>
            </template>
            <a-icon slot="icon" type="warning" style="color: #f00" />
            <a class="cs_ml"> <a-icon type="delete" /> 删除 </a>
          </a-popconfirm>
        </span>
      </d-table>
    </a-card>
    <!-- 添加类型 弹出框  search查询 undo重置 -->
    <a-modal v-model="visibleAttCateRest" title="添加属性类型" :destroy-on-close="true" :footer="null" width="600px">
      <a-form-model ref="addAttrCateRef" :model="addAttrCate" :rules="addAttrCateRules" :layout="formLayout" v-bind="formItemLayout">
        <a-form-model-item ref="name" label="属性类型名称" prop="name">
          <a-input v-model="addAttrCate.name" placeholder="请输入属性类型" />
        </a-form-model-item>
      </a-form-model>
      <a-row>
        <a-col class="cs_mt" :span="24" align="right">
          <a-button type="default" class="rui-gray-btn rui-right" @click="visibleAttCateRest = false">取消</a-button>
          <a-button type="primary" class="rui-btn cs_ml" @click="addAttCate">确认</a-button>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 编辑类型 弹出框  search查询 undo重置 -->
    <a-modal v-model="visibleEditCateRest" title="编辑属性类型" :destroy-on-close="true" :footer="null" width="600px">
      <a-form-model ref="editAttrCateRef" :model="editAttrCate" :rules="editAttrCateRules" :layout="formLayout" v-bind="formItemLayout">
        <a-form-model-item ref="name" label="属性类型名称" prop="name">
          <a-input v-model="editAttrCate.name" placeholder="请输入属性类型" />
        </a-form-model-item>
      </a-form-model>
      <a-row>
        <a-col class="cs_mt" :span="24" align="right">
          <a-button type="default" class="rui-gray-btn rui-right" @click="visibleEditCateRest = false">取消</a-button>
          <a-button type="primary" class="rui-btn cs_ml" @click="saveAttCate">保存</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { DTable } from '@/components';
import commerceInfoAipService from '@/network/apiCommerceService.js';
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 50,
    align: 'center',
    scopedSlots: { customRender: 'rowIndex' }
  },
  {
    title: '类型名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    align: 'center'
  },
  {
    title: '属性数量',
    dataIndex: 'attributeNum',
    key: 'attributeNum',
    width: 80,
    align: 'center'
  },
  {
    title: '参数数量',
    dataIndex: 'paramNum',
    key: 'paramNum',
    width: 80,
    align: 'center'
  },
  {
    title: '操作',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'rowAction' }
  }
];
export default {
  components: { DTable },
  data() {
    return {
      columns,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
      },
      formLayout: 'horizontal',
      // 添加类型
      addAttrCate: { name: '' },
      addAttrCateRules: {
        name: [{ required: true, message: '请输入属性类型', trigger: 'blur' }]
      },
      // 编辑类型
      editAttrCate: { id: '', name: '' },
      editAttrCateRules: {
        name: [{ required: true, message: '请输入属性类型', trigger: 'blur' }]
      },
      batchStatus: [],
      batchInfo: [], // 保存选择当前的item
      visibleAttCateRest: false,
      visibleEditCateRest: false
    };
  },
  methods: {
    // 数据加载
    loadData(pagination) {
      let params = {
        size: pagination.pageSize,
        current: pagination.pageNo
      };
      return commerceInfoAipService.getAllProAttClassificByPage(params).then((res) => {
        console.log(res, 'res结果');
        if (res.status === 200) {
          let temp = {
            data: res.data.records,
            pageNo: pagination.pageNo,
            totalCount: res.data.total
          };
          return temp;
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 添加类型
    addAttCate() {
      this.$refs.addAttrCateRef.validate((valid) => {
        if (valid) {
          let spProductAttributeCategoryReq = {
            name: this.addAttrCate.name
          };
          commerceInfoAipService.getNewAddAttClassific(spProductAttributeCategoryReq).then((res) => {
            if (res.status === 200) {
              this.$message.success('添加属性类型成功！');
              this.visibleAttCateRest = false;
              this.$refs.table.refresh();
            }
          });
        }
      });
      this.visibleAttCateRest = false;
    },
    // 编辑类型
    editHandle(record) {
      commerceInfoAipService.getProAttClassificToId({ id: record.id }).then((res) => {
        if (res.status === 200) {
          console.log(res, '信息');
          this.editAttrCate.id = res.data.id;
          this.editAttrCate.name = res.data.name;
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
      this.visibleEditCateRest = true;
    },
    // 修改保存类型
    saveAttCate() {
      let spProductAttributeCategoryReq = {
        ...this.editAttrCate
      };
      commerceInfoAipService.getModifyProAttClassific(spProductAttributeCategoryReq).then((res) => {
        if (res.status === 200) {
          console.log(res, '修改结果');
          this.visibleEditCateRest = false;
          this.$message.success('编辑成功！');
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 点击删除
    deleteHandle(record) {
      commerceInfoAipService.getDeleteAttById({ id: record.id }).then((res) => {
        if (res.status === 200) {
          this.$message.success('删除成功！');
          this.$refs.table.refresh(true);
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 批量删除
    showDeleteConfirm() {
      if (this.batchInfo.length === 0) {
        this.$message.warning('请选择要批量删除的记录！');
        return;
      }
      let idList = [];
      this.batchInfo.forEach((item) => {
        idList.push(item.id);
      });
      let self = this;
      this.$confirm({
        title: '批量删除',
        content: () => <div style="color:red;">是否进行批量删除操作?</div>,
        onOk() {
          commerceInfoAipService.getBatchDeleteAttClassific(idList).then((res) => {
            if (res.status === 200) {
              self.$message.success(`已批量删除${idList.length}条记录`);
              self.batchStatus = self.batchInfo = [];
              self.$res.table.refresh(true);
            } else {
              this.$message.error('服务异常，请联系管理员！');
            }
          });
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    },
    // 复选框选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.batchInfo = selectedRows;
      this.batchStatus = selectedRowKeys;
    }
  }
};
</script>

<style></style>
