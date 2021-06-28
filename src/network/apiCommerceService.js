/*
 * @Description: 商品中心接口请求
 * @Author: zhangweigang
 * @Date: 2021-05-28 21:29:07
 * @LastEditTime: 2021-06-28 23:45:15
 * @LastEditors: zhangweigang
 */
import { request } from './index.js';
// import qs from 'qs';
// 代理跟路径
const api = '/api';

const commerceInfoAipService = {
  // -----商品分类------ 添加分类
  getAddCateData(spProductCategoryReq) {
    return request({
      url: api + '/rest/product/category/create',
      method: 'POST',
      data: spProductCategoryReq
    });
  },
  // 获取分类树
  getClassificTree() {
    return request({
      url: api + '/rest/product/category/tree',
      method: 'GET'
    });
  },
  // 分页查询商分类
  getPagQueryProSubCate(params) {
    return request({
      url: api + '/rest/product/category/list',
      method: 'GET',
      params: params
    });
  },
  // 导航栏显示状态
  getChangeNavBarStatus(params) {
    return request({
      url: api + '/rest/product/category/update/isNav?isNav=' + params.isNav,
      method: 'PUT',
      data: params.idList
    });
  },
  // 商品类目是否启用
  getChangeProCateIsEnable(params) {
    return request({
      url: api + '/rest/product/category/update/enable?enable=' + params.enable,
      method: 'PUT',
      data: params.idList
    });
  },
  // 删除商品分类
  getDeleteProCateById(params) {
    return request({
      url: api + '/rest/product/category/deleteById?id=' + params.id,
      method: 'DELETE',
      data: params
    });
  },
  // 批量删除商品分类
  getBatchDeleteProCate(params) {
    return request({
      url: api + '/rest/product/category/deleteBatch',
      method: 'DELETE',
      data: params
    });
  },
  // 根据id获取商品分类
  getAddroCommClassById(params) {
    return request({
      url: api + '/rest/product/category/getById',
      method: 'GET',
      params: params
    });
  },
  //
  // 修改商品分类
  modifyProductCategory(spProductCategoryReq) {
    return request({
      url: api + '/rest/product/category/update',
      method: 'PUT',
      data: spProductCategoryReq
    });
  },

  // -----商品类型-----新增属性分类
  getNewAddAttClassific(params) {
    return request({
      url: api + '/rest/productAttributeCategory/create',
      method: 'POST',
      data: params
    });
  },
  // 批量删除删除商品属性分类
  getBatchDeleteAttClassific(params) {
    return request({
      url: api + '/rest/productAttributeCategory/deleteBatch',
      method: 'DELETE',
      data: params
    });
  },
  // 删除商品属性分类
  getDeleteAttById(params) {
    return request({
      url: api + '/rest/productAttributeCategory/deleteById?id=' + params.id,
      method: 'DELETE',
      data: params
    });
  },
  // 根据ID获取商品属性分类信息
  getProAttClassificToId(params) {
    return request({
      url: api + '/rest/productAttributeCategory/getById',
      method: 'GET',
      params: params
    });
  },
  // 分页获取所有商品属性分类
  getAllProAttClassificByPage(params) {
    return request({
      url: api + '/rest/productAttributeCategory/page',
      method: 'GET',
      params: params
    });
  },
  // 修改商品属性分类
  getModifyProAttClassific(params) {
    return request({
      url: api + '/rest/productAttributeCategory/updateById',
      method: 'PUT',
      data: params
    });
  },
  // http://localhost:8888/rest/product/category/list?current=1&parentId=1&size=15

  // ----- 商品属性 ----- 新增商品属性
  newAddCommodityAttribute(params) {
    return request({
      url: api + '/rest/productAttribute/create',
      method: 'POST',
      data: params
    });
  },
  // 批量删除商品属性
  batchDeleteProductAttById(params) {
    return request({
      url: api + '/rest/productAttribute/deleteBatch',
      method: 'DELETE',
      data: params
    });
  },
  // 查询单个商品属性
  querySingleProductAttById(params) {
    return request({
      url: api + '/rest/productAttribute/getById',
      method: 'GET',
      params: params
    });
  },
  // 根据分类查询属性列表或参数列表
  accordingToQueryAttListOrParamList(params) {
    return request({
      url: api + '/rest/productAttribute/page',
      method: 'GET',
      params: params
    });
  },
  // 修改商品属性
  modifyProductAttribute(params) {
    return request({
      url: api + '/rest/productAttribute/updateById',
      method: 'PUT',
      data: params
    });
  },

  // ----- 商品品牌 ----- 新增品牌
  newProductBand(params) {
    return request({
      url: api + '/rest/brand/create',
      method: 'POST',
      data: params
    });
  },
  // 根据ID批量删除品牌
  batchDeteteBandById(params) {
    return request({
      url: api + '/rest/brand/deleteBatch',
      method: 'DELETE',
      data: params
    });
  },
  // 根据ID删除品牌
  deleteBandAccordingToId(params) {
    return request({
      url: api + '/rest/brand/deleteById',
      method: 'DELETE',
      data: params
    });
  },
  // 根据ID查询品牌信息
  getBandInfoById(params) {
    return request({
      url: api + '/rest/brand/getById',
      method: 'GET',
      params: params
    });
  },
  // 获取全部品牌数据
  getAllBandData(params) {
    return request({
      url: api + '/rest/brand/listAll',
      method: 'GET',
      params: params
    });
  },
  // 根据品牌名称模糊分页获取品牌列表
  getBandListPageByFuzzy(params) {
    return request({
      url: api + '/rest/brand/page',
      method: 'GET',
      params: params
    });
  },
  // 批量更新厂家制造商状态
  batchUpdateManufacturerStatus(params) {
    return request({
      url: api + '/rest/brand/update/isBrandManufacturer',
      method: 'PUT',
      data: params
    });
  },
  // 批量启用禁用
  batchEnableAndDisable(params) {
    return request({
      url: api + '/rest/brand/updateBatchEnable',
      method: 'PUT',
      data: params
    });
  },
  // 根据ID更新品牌
  accordUpdateBandById(params) {
    return request({
      url: '/rest/brand/updateById',
      method: 'PUT',
      data: params
    });
  }
};

export default commerceInfoAipService;
