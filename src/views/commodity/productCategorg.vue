<!--
 * @Description: 商品分类
 * @Author: zhangweigang
 * @Date: 2021-06-14 23:20:38
 * @LastEditTime: 2021-06-23 23:02:49
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
    <div class="cs_card add_cate">
      <a-button type="primary" icon="plus" @click="visibleRecInfo = true"> 添加分类 </a-button>
      <a-button class="batch-btn cs_ml" type="primary" icon="delete" @click="showDeleteConfirm">批量删除</a-button>
    </div>
    <a-card class="cs_card">
      <!-- 商品分类表格 -->
      <d-table
        :row-key="(record, index) => index"
        :data="loadData"
        :columns="columns"
        show-pagination="auto"
        bordered
        size="small"
        ref="table"
        :row-selection="{
          columnWidth: '60px',
          selectedRowKeys: batchStatus,
          onChange: onSelectChange
        }"
      >
        <!-- 序号 -->
        <span slot="rowIndex" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- 级别 -->
        <span slot="rowLevel" slot-scope="text">
          <a-tag color="orange" v-if="text == '0'"> 一级 </a-tag>
          <span v-else>-</span>
        </span>
        <!-- 单位 -->
        <span slot="rowProductUnit" slot-scope="text">
          <span>{{ text ? text : '-' }}</span>
        </span>
        <!-- 导航栏-->
        <span slot="rowIsNav" slot-scope="text, record">
          <a-switch :checked="text" @change="selectNavHandle(record)" />
        </span>
        <!-- 是否显示 -->
        <span slot="rowEnable" slot-scope="text, record">
          <a-switch :checked="text" @change="selectShowHandle(record)" />
        </span>
        <!-- 设置 -->
        <!-- <span slot="rowSet" slot-scope="text, record, index">
          <a-button type="primary" @click="viewSubCate(index)"> 查看下级 </a-button>
          <a-button class="cs_ml_btn" type="default"> 转移商品 </a-button>
        </span> -->
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
          <a class="cs_ml" @click="viewSubCate(record)"><a-icon type="file-search" /> 查看下级 </a>
        </span>
      </d-table>
    </a-card>
    <!-- 添加分类 弹出框  search查询 undo重置 -->
    <a-modal v-model="visibleRecInfo" title="添加商品分类" :destroy-on-close="true" :footer="null" width="1000px">
      <a-form-model ref="addCateRef" :model="addCateForm" :rules="addCateRules" :layout="formLayout" v-bind="formItemLayout">
        <a-row align="middle" type="flex">
          <a-col class="cs_space mf">分类图标 :</a-col>
          <a-col :md="7" :sm="24">
            <a-form-model-item label="">
              <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload" @change="handleChange">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传分类图标</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-model-item ref="name" label="分类名称" prop="name">
              <a-input v-model="addCateForm.name" placeholder="请输入分类名称" />
            </a-form-model-item>
            <a-form-model-item label="上级分类">
              <a-select default-value="请选择" style="width: 120px" @change="handleProvinceChange">
                <a-select-option v-for="(province, index) in parentCategoryData" :key="index">
                  {{ province }}
                </a-select-option>
              </a-select>
              <!-- v-model="subCategoriesData"  -->
              <!-- 从数据库中看只能是两层关系 <a-select default-value="请选择" class="cs_ml" style="width: 169px">
                <a-select-option v-for="item in subCategoriesData" :key="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select> -->
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex">
          <a-col :md="10" :sm="24">
            <a-form-model-item label="是否显示在导航栏">
              <a-radio-group v-model="addCateForm.isNav">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-model-item label="是否显示">
              <a-radio-group v-model="addCateForm.enable">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex">
          <a-col :md="10" :sm="24">
            <a-form-model-item label="数量单位">
              <a-select placeholder="请选择单位" @change="changeNumUnit" class="cs_w">
                <a-select-option value="件"> 件 </a-select-option>
                <a-select-option value="台"> 台 </a-select-option>
                <a-select-option value="个"> 个 </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="排序">
              <a-select placeholder="请选择排序" @change="changeSort" class="cs_w">
                <a-select-option value="0"> 升序 </a-select-option>
                <a-select-option value="1"> 降序 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex">
          <a-col class="cs_space"> 关键词 :</a-col>
          <a-col :span="20">
            <a-input v-model="addCateForm.keywords" placeholder="请输入关键字" class="cs_b" />
          </a-col>
        </a-row>
        <a-row class="cs_mt" align="middle" type="flex">
          <a-col class="cs_space"> 分类描述 :</a-col>
          <a-col :span="17">
            <a-input v-model="addCateForm.desc" type="textarea" :auto-size="autoSize" :max-length="contentText" placeholder="请输入分类描述" allow-clear />
          </a-col>
        </a-row>
      </a-form-model>
      <a-row>
        <a-col class="cs_mt" :span="24" align="right">
          <a-button type="default" class="rui-gray-btn rui-right" @click="visibleRecInfo = false">取消</a-button>
          <a-button type="primary" class="rui-btn cs_ml" @click="onSubmit">确定</a-button>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 编辑商品分类 -->
    <a-modal v-model="visibleEditRecInfo" title="编辑商品分类" :destroy-on-close="true" :footer="null" width="1000px">
      <a-form-model ref="editCateRef" :model="editCateForm" :rules="editCateRules" :layout="formLayout" v-bind="formItemLayout">
        <a-row align="middle" type="flex">
          <a-col class="cs_space mf">分类图标 :</a-col>
          <a-col :md="7" :sm="24">
            <a-form-model-item label="">
              <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload" @change="handleChange">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传分类图标</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-model-item ref="name" label="分类名称" prop="name">
              <a-input v-model="editCateForm.name" placeholder="请输入分类名称" />
            </a-form-model-item>
            <a-form-model-item label="上级分类">
              <a-select default-value="请选择" style="width: 120px" @change="handleProvinceChange">
                <a-select-option v-for="(province, index) in parentCategoryData" :key="index">
                  {{ province }}
                </a-select-option>
              </a-select>
              <!-- v-model="subCategoriesData"  -->
              <!-- 从数据库中看只能是两层关系 <a-select default-value="请选择" class="cs_ml" style="width: 169px">
                <a-select-option v-for="item in subCategoriesData" :key="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select> -->
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex">
          <a-col :md="10" :sm="24">
            <a-form-model-item label="是否显示在导航栏">
              <a-radio-group v-model="editCateForm.isNav">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-model-item label="是否显示">
              <a-radio-group v-model="editCateForm.enable">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex">
          <a-col :md="10" :sm="24">
            <a-form-model-item label="数量单位">
              <a-select defaule-value="请选择" v-model="editCateForm.productUnit" @change="changeNumUnit" class="cs_w">
                <a-select-option value=""> 请选择 </a-select-option>
                <a-select-option value="件"> 件 </a-select-option>
                <a-select-option value="台"> 台 </a-select-option>
                <a-select-option value="个"> 个 </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="排序">
              <a-select v-model="editCateForm.sort" @change="changeSort" class="cs_w">
                <a-select-option value="0"> 升序 </a-select-option>
                <a-select-option value="1"> 降序 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row align="middle" type="flex">
          <a-col class="cs_space"> 关键词 :</a-col>
          <a-col :span="20">
            <a-input v-model="editCateForm.keywords" placeholder="请输入关键字" class="cs_b" />
          </a-col>
        </a-row>
        <a-row class="cs_mt" align="middle" type="flex">
          <a-col class="cs_space"> 分类描述 :</a-col>
          <a-col :span="17">
            <a-input v-model="editCateForm.desc" type="textarea" :auto-size="autoSize" :max-length="contentText" placeholder="请输入分类描述" allow-clear />
          </a-col>
        </a-row>
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
    width: 80,
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
    title: '是否显示',
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
  // {
  //   title: '设置',
  //   width: 220,
  //   align: 'center',
  //   scopedSlots: { customRender: 'rowSet' }
  // },
  {
    title: '操作',
    width: 230,
    align: 'center',
    scopedSlots: { customRender: 'rowAction' }
  }
];
export default {
  components: { DTable },
  data() {
    return {
      cateList: [],
      parentCategoryData: [],
      subCategoriesData: [],
      columns,
      contentText: 1000,
      autoSize: { minRows: 4, maxRows: 6 },
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      },
      formLayout: 'horizontal',
      addCateForm: {
        icon: 'string', // 图标    上传图标链接
        name: '', // 类目名称
        parentId: 0, // 上级分类的编号  0表示一级分类
        isNav: 2, // 是否显示在导航栏：0否；1是
        enable: 2, // 是否启用
        productUnit: '', // 商品单位
        sort: 0, // 排序字段 无
        keywords: '', // 搜索关键字
        desc: '', // 描述
        level: 0, // 分类层级：0是root  不选择上层分类就是 0 root，选择为 1
        productNum: 0 // 商品数量
      },
      addCateRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      batchStatus: [],
      batchInfo: [], // 保存选择当前的item
      parentId: '',
      visibleRecInfo: false,
      visibleEditRecInfo: false,
      loading: false,
      imageUrl: '',
      isNavShow: true, // 是否在导航显示
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
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    };
  },
  created() {
    // 获取上级分类
    commerceInfoAipService.getClassificTree().then((res) => {
      let self = this;
      if (res.status === 200) {
        res.data.map((item) => {
          self.parentCategoryData.push(item.name);
        });
        this.cateList = res.data;
      } else {
        this.$message.error('服务异常，请联系管理员！');
      }
      console.log(res, '请求结果');
    });
  },
  methods: {
    // 根据上级分类获取父级ID和层级
    handleProvinceChange(index) {
      this.subCategoriesData = this.cateList[index].childNode;
      console.log(this.cateList, index);
      this.addCateForm.level = 1;
      this.addCateForm.parentId = this.cateList[index].id;
    },
    // 数据加载
    loadData(pagination) {
      let params = {
        size: pagination.pageSize,
        current: pagination.pageNo
      };
      return commerceInfoAipService.getClassificTree(params).then((res) => {
        if (res.status === 200) {
          let temp = {
            data: res.data,
            pageNo: pagination.pageNo,
            totalCount: res.data.length
          };
          return temp;
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 编辑商品分类
    editHandle(record) {
      this.editCateForm = {
        id: record.id,
        icon: record.icon, // 图标    上传图标链接
        name: record.name,
        parentId: record.parentId, // 上级分类的编号  0表示一级分类
        isNav: record.isNav ? 1 : 2, // 是否显示在导航栏：0否1；1是2
        enable: record.enable ? 1 : 2, // 是否启用
        productUnit: record.productUnit || '',
        sort: record.sort ? '升序' : '降序',
        keywords: record.keywords,
        desc: record.desc,
        level: 0, // 分类层级：0是root 不选择上层分类就是 0 root，选择为 1
        productNum: record.productNum
      };
      this.visibleEditRecInfo = true;
    },
    // 保存修改商品信息
    saveEditData() {
      // 处理是否显示
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
        sort: this.editCateForm.sort === '降序' ? 1 : 0, // 排序字段 0: 升序，1：降序
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
    },
    // 删除商品分类
    deleteHandle(record) {
      console.log(record.id, '查看ID');
      commerceInfoAipService.getDeleteProCateById({ id: record.id }).then((res) => {
        if (res.status === 200) {
          this.$message.success('删除成功！');
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 批量删除
    showDeleteConfirm() {
      console.log(this.batchInfo, 'ITem', this.batchInfo.length < 0);
      if (this.batchInfo.length === 0) {
        this.$message.warning('请选择要批量删除的记录！');
        return;
      }
      let idList = [];
      for (const item of this.batchInfo) {
        idList.push(item.id);
      }
      let self = this;
      // 如果有选中的值
      this.$confirm({
        title: '批量删除',
        content: () => <div style="color:red;">是否进行批量删除操作?</div>,
        onOk() {
          commerceInfoAipService.getBatchDeleteProCate(idList).then((res) => {
            if (res.status) {
              self.$message.success(`已批量删除${idList.length}条数据！`);
              self.batchStatus = self.batchInfo = [];
              self.$refs.table.refresh(true);
            } else {
              self.$message.error('服务异常，请联系管理员！');
            }
          });
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
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
          this.$message.success(!item.isNav ? '已显示改导航栏目' : '已隐藏改导航栏目');
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 是否显示生改变触发
    selectShowHandle(item) {
      let ids = [];
      ids.push(item.id);
      let params = {
        idList: ids,
        enable: !item.enable
      };
      commerceInfoAipService.getChangeProCateIsEnable(params).then((res) => {
        if (res.status === 200) {
          this.$message.success(!item.enable ? '已显示' : '已隐藏');
          this.$refs.table.refresh();
        } else {
          this.$message.error('服务异常，请联系管理员！');
        }
      });
    },
    // 添加分类表单提交
    onSubmit() {
      this.$refs.addCateRef.validate((valid) => {
        if (valid) {
          let is_Nav = this.addCateForm.isNav === 2 ? 0 : this.addCateForm.isNav;
          let is_Eable = this.addCateForm.enable === 2 ? 0 : this.addCateForm.enable;
          let spProductCategoryReq = {
            icon: this.addCateForm.icon,
            name: this.addCateForm.name,
            parentId: this.addCateForm.parentId,
            isNav: is_Nav ? true : false,
            enable: is_Eable ? true : false,
            productUnit: this.addCateForm.productUnit,
            sort: Number(this.addCateForm.sort), // 0: 升序，1：降序
            keywords: this.addCateForm.keywords,
            desc: this.addCateForm.desc, // 描述
            level: this.addCateForm.level,
            productNum: this.addCateForm.productNum // 商品数量
          };
          console.log(this.addCateForm, '表单提交', spProductCategoryReq);
          commerceInfoAipService.getAddCateData(spProductCategoryReq).then((res) => {
            if (res.status === 200) {
              this.visibleRecInfo = false;
              this.$message.success('添加成功！');
              this.addCateForm = {
                icon: '', // 图标    上传图标链接
                name: '', // 类目名称
                parentId: 0, // 上级分类的编号  0表示一级分类
                isNav: 2, // 是否显示在导航栏：0否；1是
                enable: 2, // 是否启用
                productUnit: '', // 商品单位
                sort: 0, // 排序字段 无
                keywords: '', // 搜索关键字
                desc: '', // 描述
                level: 0, // 分类层级：0是root  不选择上层分类就是 0 root，选择为 1
                productNum: 0 // 商品数量
              };
              this.$refs.table.refresh();
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
    // 查看下级商品分类
    viewSubCate(record) {
      console.log(record, 'record');
      this.$router.push({
        name: 'subCategorg',
        params: {
          parentId: record.id
        }
      });
    },
    // 保存商品分类
    saveProCate() {
      this.visibleRecInfo = false;
    },
    // 复选框选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.batchInfo = selectedRows;
      this.batchStatus = selectedRowKeys;
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
      console.log(value);
      this.addCateForm.productUnit = value;
    },
    // 排序改变时触发
    changeSort(value) {
      console.log(value);
      this.addCateForm.sort = value;
    }
  }
};
</script>

<style lang="less" scoped>
.cs_w {
  width: 265px;
}
.cs_b {
  width: 665px;
}
.mf {
  margin-top: -45px;
}
</style>
