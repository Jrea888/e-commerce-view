<!--
 * @Description:下级分类
 * @Author: zhangweigang
 * @Date: 2021-06-17 23:26:29
 * @LastEditTime: 2021-06-27 00:05:18
 * @LastEditors: zhangweigang
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <a-breadcrumb>
      <span slot="separator" style="color: white">></span>
      <a-breadcrumb-item href="/index" class="c-white">首页</a-breadcrumb-item>
      <a-breadcrumb-item href="/productCategorg" class="c-white">商品分类</a-breadcrumb-item>
      <a-breadcrumb-item class="c-white">下级分类</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="cs_card add_cate">
      <a-row>
        <a-col :span="24" align="right">
          <a-button type="primary" @click="goBack" class="rui-gray-btn rui-right"> 返回 </a-button>
        </a-col>
      </a-row>
    </div>
    <a-card class="cs_card">
      <!-- 下级商品分类表格 -->
      <d-table :row-key="(record, index) => index" :data="loadData" :columns="columns" show-pagination="auto" bordered size="small" ref="table">
        <!-- 序号 -->
        <span slot="rowIndex" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- 级别 -->
        <span slot="rowLevel">
          <a-tag color="orange"> 二级 </a-tag>
        </span>
        <!-- 单位 -->
        <span slot="rowProductUnit" slot-scope="text">
          <span>{{ text ? text : '-' }}</span>
        </span>
        <!-- 导航栏-->
        <span slot="rowIsNav" slot-scope="text, record">
          <a-switch :checked="text" @change="selectNavHandle(record)" />
        </span>
        <!-- 是否启用 -->
        <span slot="rowEnable" slot-scope="text, record">
          <a-switch :checked="text" @change="selectShowHandle(record)" />
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
    <!-- 编辑商品分类 -->
    <a-modal v-model="visibleEditRecInfo" title="编辑商品分类" :destroy-on-close="true" :footer="null" width="1000px">
      <a-form-model ref="editCateRef" :model="editCateForm" :rules="editCateRules" :layout="formLayout" v-bind="formItemLayout" class="form-model">
        <a-form-model-item label="上传分类图标" prop="icon">
          <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload" @change="handleChange">
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传分类图标</div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item ref="name" label="分类名称" prop="name">
          <a-input v-model="editCateForm.name" placeholder="请输入分类名称" />
        </a-form-model-item>
        <a-form-model-item label="上级分类" prop="level">
          <a-cascader :options="cateList" :field-names="fieldNames" :popup-style="popupStyle" @change="onChangeLevel" placeholder="请选择上级分类" class="casc cs_w" />
          <!-- <a-select default-value="请选择" style="width: 120px" @change="handleProvinceChange">
            <a-select-option v-for="(province, index) in parentCategoryData" :key="index">
              {{ province }}
            </a-select-option>
          </a-select> -->
        </a-form-model-item>
        <a-form-model-item label="是否显示在导航栏">
          <a-radio-group v-model="editCateForm.isNav">
            <a-radio :value="1"> 是 </a-radio>
            <a-radio :value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="是否启用">
          <a-radio-group v-model="editCateForm.enable">
            <a-radio :value="1"> 是 </a-radio>
            <a-radio :value="2"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="数量单位" prop="productUnit">
          <a-select defaule-value="请选择" v-model="editCateForm.productUnit" @change="changeNumUnit" class="cs_w">
            <a-select-option value=""> 请选择 </a-select-option>
            <a-select-option value="件"> 件 </a-select-option>
            <a-select-option value="台"> 台 </a-select-option>
            <a-select-option value="个"> 个 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="排序" prop="sort">
          <a-select v-model="editCateForm.sort" @change="changeSort" class="cs_w">
            <a-select-option value="0"> 升序 </a-select-option>
            <a-select-option value="1"> 降序 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="关键词" prop="keywords">
          <a-input v-model="editCateForm.keywords" placeholder="请输入关键字" class="cs_b" />
        </a-form-model-item>
        <a-form-model-item label="分类描述" prop="desc">
          <a-input v-model="editCateForm.desc" type="textarea" :auto-size="autoSize" :max-length="contentText" placeholder="请输入分类描述" allow-clear />
        </a-form-model-item>
      </a-form-model>
      <a-row>
        <a-col class="cs_mt" :span="24" align="right">
          <a-button type="default" class="rui-gray-btn rui-right" @click="visibleEditRecInfo = false">取消</a-button>
          <a-button type="primary" class="rui-btn cs_ml" @click="saveEditData">保存</a-button>
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
    width: 60,
    align: 'center',
    scopedSlots: { customRender: 'rowIndex' }
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    width: 80,
    align: 'center',
    scopedSlots: { customRender: 'rowLevel' }
  },
  {
    title: '商品数量',
    dataIndex: 'productNum',
    key: 'productNum',
    width: 100,
    align: 'center'
  },
  {
    title: '数量单位',
    dataIndex: 'productUnit',
    key: 'productUnit',
    width: 80,
    align: 'center',
    scopedSlots: { customRender: 'rowProductUnit' }
  },
  {
    title: '导航栏',
    dataIndex: 'isNav',
    key: 'isNav',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'rowIsNav' }
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    key: 'enable',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'rowEnable' }
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 80,
    align: 'center'
  },
  {
    title: '操作',
    width: 170,
    align: 'center',
    scopedSlots: { customRender: 'rowAction' }
  }
];
export default {
  components: { DTable },
  data() {
    return {
      columns,
      loading: false,
      imageUrl: '',
      visibleEditRecInfo: false,
      parentCategoryData: [],
      cateList: [],
      parentId: '',
      contentText: 1000,
      autoSize: { minRows: 4, maxRows: 6 },
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
      },
      formLayout: 'horizontal',
      editCateForm: {
        icon: 'string', // 图标    上传图标链接
        name: '', // 类目名称
        parentId: 0, // 上级分类的编号  0表示一级分类
        isNav: 0, // 是否显示在导航栏：0否；1是
        enable: 0, // 是否启用
        productUnit: '', // 商品单位
        sort: 0, // 排序字段 无
        keywords: '', // 搜索关键字
        desc: '', // 描述
        level: 0, // 分类层级：0是root  不选择上层分类就是 0 root，选择为 1
        productNum: 0 // 商品数量
      },
      editCateRules: {
        icon: [{ required: true, message: '请上传分类图标', trigger: 'blur' }],
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        productUnit: [{ required: true, message: '请选择商品单位', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序序号', trigger: 'blur' }],
        keywords: [{ required: true, message: '请输入搜索关键字', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入分类描述', trigger: 'blur' }],
        level: [{ required: true, message: '请选择上级分类', trigger: 'blur' }]
      },
      // 级联选择器
      fieldNames: {
        value: 'id',
        label: 'name',
        children: 'childNode'
      },
      // 自定义浮层样式
      popupStyle: {
        width: '300px'
      }
    };
  },
  created() {
    // 获取父级ID
    this.parentId = this.$route.params.parentId;
    // 获取上级分类
    commerceInfoAipService.getClassificTree().then((res) => {
      if (res.status === 200) {
        this.cateList = res.data;
      } else {
        this.$message.error('服务异常，请联系管理员！');
      }
    });
  },
  methods: {
    // 根据上级分类获取父级ID和层级
    handleProvinceChange(index) {
      this.subCategoriesData = this.cateList[index].childNode;
      console.log(this.cateList, index);
      this.editCateForm.level = 1;
      this.editCateForm.parentId = this.cateList[index].id;
    },
    // 级联选择器
    onChangeLevel(valueArr) {
      console.log(valueArr);
      console.log(this.cateList);
      this.editCateForm.level = 1;
      this.editCateForm.parentId = valueArr[0];
    },
    // 数据加载
    loadData(pagination) {
      let params = {
        parentId: this.parentId,
        size: pagination.pageSize,
        current: pagination.pageNo
      };
      return commerceInfoAipService.getPagQueryProSubCate(params).then((res) => {
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
    // 单条删除
    deleteHandle(record) {
      commerceInfoAipService.getDeleteProCateById({ id: record.id }).then((res) => {
        if (res.status === 200) {
          this.$message.success('删除成功！');
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 导航栏发生改变触发
    selectNavHandle(item) {
      let ids = [];
      ids.push(item.id);
      let params = {
        idList: ids,
        isNav: !item.isNav
      };
      commerceInfoAipService.getChangeNavBarStatus(params).then((res) => {
        if (res.status === 200) {
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 是否启用生改变触发
    selectShowHandle(item) {
      console.log(item);
      let ids = [];
      ids.push(item.id);
      let params = {
        idList: ids,
        enable: !item.enable
      };
      commerceInfoAipService.getChangeProCateIsEnable(params).then((res) => {
        if (res.status === 200) {
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    handleChange(info) {},
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    // 数量单位改变时触发
    changeNumUnit(value) {
      this.editCateForm.productUnit = value;
    },
    // 排序改变时触发
    changeSort(value) {
      this.editCateForm.sort = value;
    },
    // 编辑商品分类-将信息重新填入输入框
    editHandle(record) {
      this.editCateForm = {
        id: record.id,
        icon: record.icon, // 图标    上传图标链接
        name: record.name,
        parentId: record.parentId, // 上级分类的编号  0表示一级分类
        isNav: record.isNav ? 1 : 2, // 是否显示在导航栏：0否1；1是2
        enable: record.enable ? 1 : 2, // 是否启用
        productUnit: record.productUnit || '',
        sort: record.sort,
        keywords: record.keywords,
        desc: record.desc,
        level: 0, // 分类层级：0是root 不选择上层分类就是 0 root，选择为 1
        productNum: record.productNum
      };
      this.visibleEditRecInfo = true;
    },
    // 保存修改商品信息
    saveEditData() {
      this.$refs.editCateRef.validate((valid) => {
        if (valid) {
          // 处理是否启用
          let is_Nav = this.editCateForm.isNav === 2 ? 0 : this.editCateForm.isNav;
          let is_Eable = this.editCateForm.enable === 2 ? 0 : this.editCateForm.enable;
          let spProductCategoryReq = {
            id: this.editCateForm.id,
            icon: this.editCateForm.icon || 'string',
            name: this.editCateForm.name,
            parentId: this.editCateForm.parentId,
            isNav: is_Nav ? true : false, // 是否显示在导航栏：0否1；1是2
            enable: is_Eable ? true : false, // 是否启用
            productUnit: this.editCateForm.productUnit,
            sort: this.editCateForm.sort, // 排序
            keywords: this.editCateForm.keywords,
            desc: this.editCateForm.desc,
            level: this.editCateForm.level, // 分类层级：0是root 不选择上层分类是 0 root，选择为 1
            productNum: this.editCateForm.productNum
          };
          commerceInfoAipService.modifyProductCategory(spProductCategoryReq).then((res) => {
            if (res.status === 200) {
              this.$message.success('修改成功!');
              this.$refs.table.refresh(true);
              this.visibleEditRecInfo = false;
            } else {
              this.$message.error('服务异常，请联系管理员！');
            }
          });
        } else {
          this.$message.warning('请先完善信息！');
          return false;
        }
      });
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.form-model {
  padding: 20px 0;
  background-color: whitesmoke;
  border-radius: 3px;
}
.casc .ant-cascader-menu {
  width: 150px;
}
.cs_w {
  width: 360px;
}
</style>
